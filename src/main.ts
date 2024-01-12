import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createExpressAuthAdapter } from './adapters/express-auth/express-auth.adapter';

async function bootstrap() {
  const expressAuthAdapter = await createExpressAuthAdapter();
  const app = await NestFactory.create(AppModule, expressAuthAdapter);
  await app.listen(3000);
}
bootstrap();
