/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HideObjectPropertyInterceptor } from './interceptors/hide-object-property.interceptor';
import { JsonMaskInterceptor } from './interceptors/json-mask.interceptor';
import { NODE_ENV, NODE_ENVIRONMENT } from './utils/types/app.constants';
import { TodoModule } from './todo/todo.module';

dotenv.config();

const {
  DATABASE_URL_DEV,
  DATABASE_URL_PROD
} = process.env;

const DATABASE_URL: string =
  NODE_ENV === NODE_ENVIRONMENT.DEVELOPMENT ?
    DATABASE_URL_DEV :
    DATABASE_URL_PROD;

@Module({
  imports: [
    MongooseModule.forRoot(
      DATABASE_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    ),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: JsonMaskInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HideObjectPropertyInterceptor,
    },
    AppService
  ],
})
export class AppModule { }
