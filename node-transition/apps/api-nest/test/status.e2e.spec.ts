import 'reflect-metadata';

import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, describe, it } from 'vitest';

import { AppModule } from '../src/app.module.js';

describe('GET /api/status', () => {
  let closeApp: (() => Promise<void>) | undefined;

  afterEach(async () => {
    await closeApp?.();
    closeApp = undefined;
  });

  it('기존 Spring 서버와 같은 상태 코드와 JSON을 돌려준다', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    closeApp = () => app.close();

    await request(app.getHttpServer())
      .get('/api/status')
      .expect(200)
      .expect({
        service: 'Jungle AI Backend',
        status: 'running',
        message: 'Backend API is connected.',
      });
  });
});
