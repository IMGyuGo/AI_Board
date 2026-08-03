export interface StatusResponse extends Record<string, unknown> {
  service: string;
  status: string;
  message: string;
}

export interface ContractDifference {
  path: string;
  spring: unknown;
  nest: unknown;
}

export interface ContractComparison {
  matches: boolean;
  differences: ContractDifference[];
}

export const SPRING_STATUS_RESPONSE: StatusResponse = {
  service: 'Jungle AI Backend',
  status: 'running',
  message: 'Backend API is connected.',
};

export function compareStatusResponses(
  springResponse: Record<string, unknown>,
  nestResponse: Record<string, unknown>,
  ignoredKeys: string[] = [],
): ContractComparison {
  const differences: ContractDifference[] = [];
  const ignored = new Set(ignoredKeys);
  compareObjects(springResponse, nestResponse, '', ignored, differences);

  return {
    matches: differences.length === 0,
    differences,
  };
}

function compareObjects(
  springObject: Record<string, unknown>,
  nestObject: Record<string, unknown>,
  parentPath: string,
  ignoredRootKeys: Set<string>,
  differences: ContractDifference[],
): void {
  const keys = [...new Set([
    ...Object.keys(springObject),
    ...Object.keys(nestObject),
  ])].sort();

  for (const key of keys) {
    if (parentPath === '' && ignoredRootKeys.has(key)) {
      continue;
    }

    const path = parentPath === '' ? key : `${parentPath}.${key}`;
    const springHasKey = Object.hasOwn(springObject, key);
    const nestHasKey = Object.hasOwn(nestObject, key);

    if (!springHasKey || !nestHasKey) {
      differences.push({
        path,
        spring: springHasKey ? springObject[key] : '<missing>',
        nest: nestHasKey ? nestObject[key] : '<missing>',
      });
      continue;
    }

    compareValues(
      springObject[key],
      nestObject[key],
      path,
      ignoredRootKeys,
      differences,
    );
  }
}

function compareValues(
  springValue: unknown,
  nestValue: unknown,
  path: string,
  ignoredRootKeys: Set<string>,
  differences: ContractDifference[],
): void {
  if (isPlainObject(springValue) && isPlainObject(nestValue)) {
    compareObjects(
      springValue,
      nestValue,
      path,
      ignoredRootKeys,
      differences,
    );
    return;
  }

  if (
    Array.isArray(springValue)
    && Array.isArray(nestValue)
    && JSON.stringify(springValue) === JSON.stringify(nestValue)
  ) {
    return;
  }

  if (!Object.is(springValue, nestValue)) {
    differences.push({ path, spring: springValue, nest: nestValue });
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
