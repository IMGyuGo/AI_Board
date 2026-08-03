import { describe, expect, it } from 'vitest';

import { makeStatusResponse } from '../starter/status-response.js';

describe('D01 starter', () => {
  it('Spring /api/status와 완전히 같은 JSON을 만든다', () => {
    expect(makeStatusResponse()).toEqual({
      service: 'Jungle AI Backend',
      status: 'running',
      message: 'Backend API is connected.',
    });
  });
});
