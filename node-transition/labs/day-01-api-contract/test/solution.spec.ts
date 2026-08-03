import { describe, expect, it } from 'vitest';

import { compareFetchedResponses } from '../solution/compare-live.js';

describe('compareFetchedResponses', () => {
  it('두 서버의 상태 코드와 JSON이 모두 같으면 성공한다', () => {
    expect(
      compareFetchedResponses(
        {
          httpStatus: 200,
          body: {
            service: 'Jungle AI Backend',
            status: 'running',
            message: 'Backend API is connected.',
          },
        },
        {
          httpStatus: 200,
          body: {
            service: 'Jungle AI Backend',
            status: 'running',
            message: 'Backend API is connected.',
          },
        },
      ),
    ).toEqual({ matches: true, differences: [] });
  });

  it('HTTP 상태 코드가 다르면 본문이 같아도 실패한다', () => {
    const body = {
      service: 'Jungle AI Backend',
      status: 'running',
      message: 'Backend API is connected.',
    };

    expect(
      compareFetchedResponses(
        { httpStatus: 200, body },
        { httpStatus: 201, body },
      ),
    ).toEqual({
      matches: false,
      differences: [
        { path: '$httpStatus', spring: 200, nest: 201 },
      ],
    });
  });
});
