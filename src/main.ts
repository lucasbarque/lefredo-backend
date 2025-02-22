// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();

  // Registra a rota de webhook utilizando o Express e o bodyParser.raw
  expressApp.post(
    '/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    async (req, res) => {
      // Secret original (não em Base64)
      const rawSecret = 'sk_test_JoSuxfYEVblsvpaNlAFsnQQ9OLnMAs5lw03wz4lkOg';
      // Converte o secret para Base64 (se o serviço esperar esse formato)
      const signingSecret = Buffer.from(rawSecret).toString('base64');

      // Importa o Webhook do svix e instancia com o secret convertido
      const { Webhook } = require('svix');
      const wh = new Webhook(signingSecret);

      const headers = req.headers;
      const payload = req.body;

      // Extrai os headers do Svix
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
        evt = wh.verify(payload, {
          'svix-id': svix_id as string,
          'svix-timestamp': svix_timestamp as string,
          'svix-signature': svix_signature as string,
        });
      } catch (err: any) {
        console.error('Error: Could not verify webhook:', err.message);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      console.log(evt);
      const { id } = evt.data;
      const eventType = evt.type;
      console.log(
        `Received webhook with ID ${id} and event type of ${eventType}`,
      );
      console.log('Webhook payload:', evt.data);

      return res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    },
  );

  await app.listen(3333);
}
bootstrap();
