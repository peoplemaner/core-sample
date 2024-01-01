import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 3000;
  const logger = new Logger('MainBootstrap');
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/customshop', method: RequestMethod.GET },
      { path: '/code-admin', method: RequestMethod.GET },
      { path: '/health-check', method: RequestMethod.GET },
    ],
  });

  app.use(
    ['/swagger'],
    expressBasicAuth({
      challenge: true,
      users: {
        ['admin']: '1234',
      },
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('CoreTest Swagger API Documentation')
    .setDescription('CoreTest Swagger API Documentation')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  logger.log(`Server Running on ${port}`);
  await app.listen(port);
}

bootstrap();
