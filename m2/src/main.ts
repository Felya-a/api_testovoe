import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  Logger.log(`🚀 Application M2 is running`)
}
bootstrap();
