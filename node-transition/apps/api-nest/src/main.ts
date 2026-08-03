import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.NODE_PORT ?? 3001);

  await app.listen(port);
  console.log(`NestJS 연습 서버: http://localhost:${port}/api/status`);
}

await bootstrap();
