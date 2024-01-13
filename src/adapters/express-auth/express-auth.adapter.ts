import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { loadFirestoreAdapter } from 'src/loader/auth-adapter.loader';
import {
  loadExpressAuth,
  loadExpressEmailProvider,
} from 'src/loader/auth-express.loader';

export const createExpressAuthAdapter = async () => {
  const app = express();
  const [expressAuth, emailProvider, firestoreAdapter] = await Promise.all([
    loadExpressAuth(),
    loadExpressEmailProvider(),
    loadFirestoreAdapter(),
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
      adapter: firestoreAdapter(),
    }),
  );

  return new ExpressAdapter(app);
};
