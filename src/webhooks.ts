import * as bodyParser from 'body-parser';
import { Webhook } from 'svix';

import prisma from './database/prisma/prisma.client';

function getValidBase64Secret(secret: string): string {
  try {
    Buffer.from(secret, 'base64');
    return secret;
  } catch {
    return Buffer.from(secret, 'utf8').toString('base64');
  }
}

export const createWebooks = (app) => {
  app.post(
    '/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
      const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

      if (!SIGNING_SECRET) {
        throw new Error(
          'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env',
        );
      }
      const validSigningSecret = getValidBase64Secret(SIGNING_SECRET);

      const wh = new Webhook(validSigningSecret);

      const headers = req.headers;
      const payload = req.body;

      const svix_id = headers['svix-id'];
      const svix_timestamp = headers['svix-timestamp'];
      const svix_signature = headers['svix-signature'];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({
          success: false,
          message: 'Error: Missing svix headers',
        });
      }

      let evt;

      try {
        evt = wh.verify(payload.toString('utf8'), {
          'svix-id': svix_id as string,
          'svix-timestamp': svix_timestamp as string,
          'svix-signature': svix_signature as string,
        });
      } catch (err: any) {
        console.log('Error: Could not verify webhook:', err.message);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const eventType = evt.type;

      try {
        switch (eventType) {
          case 'user.created':
            await prisma.user.create({
              data: {
                name: evt.data.first_name + ' ' + evt.data.last_name,
                email: evt.data.email_addresses[0].email_address,
                clerkId: evt.data.id,
              },
            });
            break;
          case 'user.updated':
            await prisma.user.upsert({
              where: {
                clerkId: evt.data.id,
              },
              update: {
                name: evt.data.first_name + ' ' + evt.data.last_name,
                email: evt.data.email_addresses[0].email_address,
              },
              create: {
                name: evt.data.first_name + ' ' + evt.data.last_name,
                email: evt.data.email_addresses[0].email_address,
                clerkId: evt.data.id,
              },
            });
            break;
          case 'user.deleted':
            await prisma.user.delete({
              where: {
                clerkId: evt.data.id,
              },
            });
            break;
          default:
            console.log('Unhandled event', eventType);
        }
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    },
  );
};
