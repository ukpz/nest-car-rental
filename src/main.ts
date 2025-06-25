import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressLayouts from 'ejs-locals';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Enable CORS for all origins (wildcard)
  app.enableCors({
    origin: '*', // allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

  app.engine('ejs', expressLayouts); // <-- use ejs-locals here
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/asset/', // URL prefix for accessing static files
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
