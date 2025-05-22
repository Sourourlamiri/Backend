import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // Servir les fichiers statiques depuis le dossier "storage"
  app.useStaticAssets(join(__dirname, '..', 'storage'), { prefix: '/file' });
  app.useStaticAssets(join(__dirname, '..', 'cv'), { prefix: '/file' });

  await app.listen(process.env.PORT || 5002);
}

bootstrap();

