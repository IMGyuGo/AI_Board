# Spring과 NestJS 사이의 API 계약 테스트

## Where It Appears

- `backend/src/main/java/com/junglecamp/backend/system/controller/StatusController.java`
- `node-transition/packages/contracts/src/status-contract.ts`
- `node-transition/labs/day-01-api-contract/solution/compare-live.ts`
- `node-transition/apps/api-nest/src/status.controller.ts`
- `node-transition/apps/api-nest/test/status.e2e.spec.ts`

## What Was Applied

API 계약을 HTTP 방법, 주소, 상태 코드, JSON 필드 이름, 값, 자료형의 묶음으로 정의했다. 기존 Spring `/api/status` 응답을 기준값으로 고정하고, NestJS 응답을 단위 테스트·E2E 테스트·실시간 비교기로 검사한다.

격리된 Starter는 `status`를 `state`로 잘못 작성해 첫 테스트가 의도적으로 실패한다. 학습자는 실패 메시지를 읽고 직접 수정한다. 최종 NestJS 앱은 Starter를 import하지 않고 공용 계약 패키지만 사용한다.

## Why It Matters

Spring을 Node.js로 바꿀 때 내부 코드 모양은 달라도 프론트엔드가 받는 답은 같아야 한다. 계약 테스트가 있으면 새 서버가 기존 사용자를 깨뜨리는지 기능을 전부 옮기기 전부터 확인할 수 있다.

명시한 동적 필드만 비교에서 제외한다. 이 규칙은 `checkedAt`이나 `requestId`처럼 매번 달라지는 값 때문에 거짓 실패가 생기는 것을 막으면서, 중요한 필드를 무심코 숨기는 것을 방지한다.

## Verification

- `pnpm test:starter`: 최초 상태에서 `state`와 `status` 차이로 1개 실패
- `pnpm test:solution`: 계약 비교 단위 테스트 6개 성공
- `pnpm test:app`: NestJS HTTP E2E 테스트 1개 성공
- `pnpm build`: TypeScript 타입 검사 성공

명령은 `node-transition` 폴더에서 실행한다.

## Pitfalls And Follow-Ups

- TypeScript 타입만으로는 실제 외부 서버의 JSON을 보장할 수 없다. 이후에는 런타임 스키마 검증을 추가할 수 있다.
- 동적 필드를 너무 많이 제외하면 실제 호환성 문제를 놓친다.
- 객체 키 순서는 계약이 아니지만 배열 순서는 의미가 있을 수 있다. 현재 비교기는 배열 순서를 비교한다.
- D01은 `/api/status` 하나만 다룬다. 인증, 오류 응답, 페이지네이션은 이후 과제에서 별도 계약으로 확장한다.

