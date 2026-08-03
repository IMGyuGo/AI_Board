# D01 API 계약 실습 표본 설계

## 목표

기존 Spring Boot의 `GET /api/status`를 정답지로 삼아, Node.js 초보자가 실행·실패·수정·비교·통합을 한 번에 경험할 수 있는 D01 완성형 실습을 만든다.

## 학습 대상

- Spring 기반 개발 경험은 있지만 Node.js, TypeScript, NestJS는 처음인 학습자
- 어려운 용어보다 실행 결과와 작은 실험으로 이해하는 학습자
- 하루 12시간 동안 격리 실험과 실제 프로젝트 통합을 모두 수행하려는 학습자

## 실제 Spring 계약

- 기준 파일: `backend/src/main/java/com/junglecamp/backend/system/controller/StatusController.java`
- 요청: `GET /api/status`
- 성공 상태: `200 OK`
- JSON 본문:

```json
{
  "service": "Jungle AI Backend",
  "status": "running",
  "message": "Backend API is connected."
}
```

현재 Notion의 `{ "status": "UP" }` 예시는 실제 구현과 다르므로 위 계약으로 수정한다.

## 학습 구조

`node-transition`은 pnpm workspace로 구성한다.

- `labs/day-01-api-contract/starter`: 일부러 계약을 어긴 반제품이다. 학습자는 실패 테스트를 보고 직접 고친다.
- `labs/day-01-api-contract/solution`: 비교기와 실시간 서버 비교 명령을 포함한 정답 예시다.
- `packages/contracts`: 최종 NestJS 앱과 테스트가 함께 사용하는 `/api/status` 타입과 기준값이다.
- `apps/api-nest`: 실험에서 배운 계약을 NestJS Controller에 다시 구현한 통합 결과다.
- `evidence/day-01`: 성공·실패 결과와 회고를 남기는 템플릿이다.

Starter는 최종 앱에서 import하지 않는다. 최종 앱은 `packages/contracts`만 사용한다.

## 학습 흐름

1. Spring의 Controller와 MockMvc 테스트를 읽는다.
2. Starter 테스트를 실행해 예상한 이유로 실패하는 것을 본다.
3. Starter의 필드 이름과 값을 직접 수정해 통과시킨다.
4. Solution 테스트로 정답 예시와 비교기의 동작을 확인한다.
5. NestJS 통합 앱의 E2E 테스트와 `/api/status`를 실행한다.
6. Spring과 NestJS를 동시에 켜고 실시간 비교 명령을 실행한다.
7. Starter를 다시 망가뜨려 자동 채점기가 차이를 잡는 모습을 저장한다.

## 비교 규칙

- 객체의 키 순서는 무시한다.
- 필드 이름, 값, 값의 자료형은 정확히 비교한다.
- `--ignore=checkedAt,requestId`처럼 명시한 최상위 동적 필드만 제외할 수 있다.
- 두 서버 중 하나에 연결할 수 없으면 원인을 포함한 오류와 실패 종료 코드를 반환한다.
- 차이가 있으면 `필드 경로`, `Spring 값`, `Nest 값`을 출력한다.

## 테스트

- Starter 테스트는 최초 상태에서 의도적으로 실패해야 한다.
- Solution 단위 테스트는 동일 응답, 다른 필드명, 다른 값, 무시 필드를 검증한다.
- NestJS E2E 테스트는 상태 코드와 세 필드를 검증한다.
- TypeScript 빌드가 성공해야 한다.

## Notion 변경

D01 페이지를 코드 중심 실습서로 교체한다. 다음을 포함한다.

- 실제 Spring 기준 파일과 실제 응답
- 생성된 로컬 폴더 경로
- 설치·RED·GREEN·통합·실시간 비교 명령
- 각 명령의 예상 결과
- 힌트와 정답 확인 규칙
- 12시간 시간표
- 증거 파일과 완료 판정 기준

## 범위 제외

- 기존 Spring 코드 수정
- D02 이후 코드 생성
- 데이터베이스, 인증, Docker 연결
- Git 커밋 및 원격 저장소 푸시

