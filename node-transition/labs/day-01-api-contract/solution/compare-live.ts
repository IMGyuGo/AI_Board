import {
  compareStatusResponses,
  type ContractDifference,
  ContractComparison,
} from '../../../packages/contracts/src/status-contract.js';

import { pathToFileURL } from 'node:url';

export interface FetchedStatusResponse {
  httpStatus: number;
  body: Record<string, unknown>;
}

export function compareFetchedResponses(
  springResponse: FetchedStatusResponse,
  nestResponse: FetchedStatusResponse,
  ignoredKeys: string[] = [],
): ContractComparison {
  const differences: ContractDifference[] = [];

  if (springResponse.httpStatus !== nestResponse.httpStatus) {
    differences.push({
      path: '$httpStatus',
      spring: springResponse.httpStatus,
      nest: nestResponse.httpStatus,
    });
  }

  differences.push(
    ...compareStatusResponses(
      springResponse.body,
      nestResponse.body,
      ignoredKeys,
    ).differences,
  );

  return {
    matches: differences.length === 0,
    differences,
  };
}

export async function fetchStatus(baseUrl: string): Promise<FetchedStatusResponse> {
  const url = new URL('/api/status', withTrailingSlash(baseUrl));
  const response = await fetch(url);
  const body: unknown = await response.json();

  if (!isRecord(body)) {
    throw new Error(`${url.toString()}의 응답이 JSON 객체가 아닙니다.`);
  }

  return {
    httpStatus: response.status,
    body,
  };
}

export async function runComparison(argv: string[]): Promise<number> {
  const options = parseOptions(argv);

  try {
    const [springResponse, nestResponse] = await Promise.all([
      fetchStatus(options.springUrl),
      fetchStatus(options.nestUrl),
    ]);
    const result = compareFetchedResponses(
      springResponse,
      nestResponse,
      options.ignoredKeys,
    );

    if (result.matches) {
      console.log('✅ Spring과 NestJS의 /api/status 계약이 같습니다.');
      return 0;
    }

    console.error('❌ 두 서버의 계약이 다릅니다.');
    for (const difference of result.differences) {
      console.error(
        `- ${difference.path}: Spring=${format(difference.spring)}, Nest=${format(difference.nest)}`,
      );
    }
    return 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ 서버 응답을 비교하지 못했습니다: ${message}`);
    return 1;
  }
}

interface ComparisonOptions {
  springUrl: string;
  nestUrl: string;
  ignoredKeys: string[];
}

function parseOptions(argv: string[]): ComparisonOptions {
  const values = new Map(
    argv
      .filter((argument) => argument.startsWith('--') && argument.includes('='))
      .map((argument) => {
        const separator = argument.indexOf('=');
        return [argument.slice(2, separator), argument.slice(separator + 1)];
      }),
  );

  return {
    springUrl: values.get('spring') ?? 'http://localhost:8080',
    nestUrl: values.get('nest') ?? 'http://localhost:3001',
    ignoredKeys: (values.get('ignore') ?? '')
      .split(',')
      .map((key) => key.trim())
      .filter(Boolean),
  };
}

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function format(value: unknown): string {
  return typeof value === 'string' ? JSON.stringify(value) : JSON.stringify(value);
}

const entryFile = process.argv[1];
if (entryFile && import.meta.url === pathToFileURL(entryFile).href) {
  process.exitCode = await runComparison(process.argv.slice(2));
}
