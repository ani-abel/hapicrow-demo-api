import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { JsonMaskInterceptor } from './interceptors/json-mask.interceptor';
import { HideObjectPropertyInterceptor } from './interceptors/hide-object-property.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const apiDescription = `HAPICROW API`;

  //Enable swagger documentation for this API
  const swaggerConfig = new DocumentBuilder()
    .setTitle('HAPICROW API')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, doc);

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);

  //?- Ask Nest to use hemet and csurf middleware to regulate the number requests it takes/15 minutes
  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  //? Remove any unwanted fields from any reponse sent back to the frontend
  app.useGlobalInterceptors(new HideObjectPropertyInterceptor());
  //?- Trigger partial response inteceptor(Runs Json-Mask) before sending back each request
  app.useGlobalInterceptors(new JsonMaskInterceptor());
  app.enableCors();
}
bootstrap();
