import { describe, expect, it } from 'vitest';

import {
  SPRING_STATUS_RESPONSE,
  compareStatusResponses,
} from '../src/status-contract.js';

describe('compareStatusResponses', () => {
  it('키 순서만 다른 같은 응답은 일치한다고 알려 준다', () => {
    const nestResponse = {
      message: 'Backend API is connected.',
      service: 'Jungle AI Backend',
      status: 'running',
    };

    expect(compareStatusResponses(SPRING_STATUS_RESPONSE, nestResponse)).toEqual({
      matches: true,
      differences: [],
    });
  });

  it('status를 state로 잘못 쓰면 두 필드의 차이를 알려 준다', () => {
    const nestResponse = {
      service: 'Jungle AI Backend',
      state: 'running',
      message: 'Backend API is connected.',
    };

    expect(compareStatusResponses(SPRING_STATUS_RESPONSE, nestResponse)).toEqual({
      matches: false,
      differences: [
        { path: 'state', spring: '<missing>', nest: 'running' },
        { path: 'status', spring: 'running', nest: '<missing>' },
      ],
    });
  });

  it('같은 필드에 다른 값이 있으면 값을 나란히 보여 준다', () => {
    const nestResponse = {
      service: 'Jungle AI Backend',
      status: 'stopped',
      message: 'Backend API is connected.',
    };

    expect(compareStatusResponses(SPRING_STATUS_RESPONSE, nestResponse)).toEqual({
      matches: false,
      differences: [
        { path: 'status', spring: 'running', nest: 'stopped' },
      ],
    });
  });

  it('명시적으로 적은 동적 필드는 비교에서 제외한다', () => {
    const springResponse = {
      ...SPRING_STATUS_RESPONSE,
      checkedAt: '2026-08-07T01:00:00.000Z',
    };
    const nestResponse = {
      ...SPRING_STATUS_RESPONSE,
      checkedAt: '2026-08-07T02:00:00.000Z',
    };

    expect(
      compareStatusResponses(springResponse, nestResponse, ['checkedAt']),
    ).toEqual({
      matches: true,
      differences: [],
    });
  });
});
