import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  // Servir les fichiers statiques depuis le dossier "storage" et "cv"
  app.useStaticAssets(join(__dirname, '..', 'storage'), { prefix: '/file' });
  app.useStaticAssets(join(__dirname, '..', 'cv'), { prefix: '/file' });

  const port = configService.get<number>('PORT') || 5002;
  await app.listen(port);
}
bootstrap();
