import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  CLERK_SIGNING_SECRET: z.string(),
  CLERK_SECRET_KEY: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_REGION: z.string(),
  AWS_PUBLIC_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
