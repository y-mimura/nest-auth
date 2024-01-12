import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import {
  loadExpressAuth,
  loadExpressEmailProvider,
} from 'src/loader/auth-express.loader';

export const createExpressAuthAdapter = async () => {
  const app = express();
  const [expressAuth, emailProvider] = await Promise.all([
    loadExpressAuth(),
    loadExpressEmailProvider(),
  ]);

  // Make sure to use these body parsers so Auth.js can receive data from the client
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    '/api/auth/*',
    expressAuth({
      providers: [
        emailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM,
        }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
    }),
  );

  return new ExpressAdapter(app);
};
