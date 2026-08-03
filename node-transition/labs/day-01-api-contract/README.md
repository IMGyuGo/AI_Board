# D01 완성형 표본: Spring과 NestJS의 API 약속 맞추기

## 오늘 완성할 것

기존 Spring의 `GET /api/status`와 새 NestJS의 `GET /api/status`가 다음 네 가지 약속을 똑같이 지키는지 자동으로 확인한다.

1. 질문 방법이 `GET`인가?
2. 주소가 `/api/status`인가?
3. 성공 번호가 `200`인가?
4. JSON의 필드 이름·값·자료형이 같은가?

API 계약은 식당 주문표와 비슷하다. 손님이 같은 메뉴를 주문했는데 새 식당이 다른 음식이나 다른 영수증을 주면 안 된다.

## 실제 Spring 정답

확인할 파일:

- `backend/src/main/java/com/junglecamp/backend/system/controller/StatusController.java`
- `backend/src/test/java/com/junglecamp/backend/ApiIntegrationTests.java`

실제 응답:

```json
{
  "service": "Jungle AI Backend",
  "status": "running",
  "message": "Backend API is connected."
}
```

JSON은 줄 순서가 달라도 된다. 하지만 `status`를 `state`라고 쓰거나 문자열 `"running"`을 숫자로 바꾸면 다른 계약이다.

## 0단계: 준비하기

PowerShell을 열고 다음 명령을 한 줄씩 실행한다.

```powershell
cd D:\jungleCamp\Projects\AI\node-transition
pnpm install
```

설치가 끝나면 `node_modules` 폴더와 `pnpm-lock.yaml`이 생긴다. 이것은 필요한 도구 상자를 내려받은 결과다.

## 1단계: 실패를 먼저 보기 — RED

```powershell
pnpm test:starter
```

처음에는 다음 차이를 보여 주며 실패해야 한다.

```text
- "status": "running"
+ "state": "running"
```

빨간색은 “내가 개발을 못한다”는 뜻이 아니다. 자동 채점기가 실제 문제를 발견했다는 뜻이다.

### 직접 할 일

1. `starter/status-response.ts`를 연다.
2. Spring 응답과 한 글자씩 비교한다.
3. 잘못된 필드 이름 하나만 고친다.
4. `pnpm test:starter`를 다시 실행한다.

성공하면 `1 passed`가 나온다.

<details>
<summary>힌트 1</summary>

테스트가 원하는 필드는 `state`가 아니라 `status`다.

</details>

<details>
<summary>힌트 2: 그래도 모르겠을 때 볼 파일</summary>

`packages/contracts/src/status-contract.ts`의 `SPRING_STATUS_RESPONSE`를 확인한다.

</details>

## 2단계: 비교기가 차이를 찾는 방법 보기 — GREEN

```powershell
pnpm test:solution
```

다음 여섯 가지 자동 검사가 모두 성공한다.

- 키 순서만 다르면 같은 응답으로 판단한다.
- `status`를 `state`로 바꾸면 차이를 찾는다.
- 같은 필드의 값이 다르면 두 값을 보여 준다.
- 명시한 동적 필드는 제외한다.
- HTTP 상태와 JSON이 모두 같으면 성공한다.
- HTTP 상태가 다르면 실패한다.

읽을 순서:

1. `packages/contracts/test/status-contract.spec.ts`
2. `packages/contracts/src/status-contract.ts`
3. `test/solution.spec.ts`
4. `solution/compare-live.ts`

테스트를 먼저 읽으면 “이 코드가 무엇을 해야 하는지”를 알 수 있다. 구현을 먼저 읽으면 작은 문법에 길을 잃기 쉽다.

## 3단계: NestJS 통합 결과 확인하기

```powershell
pnpm test:app
pnpm build
```

확인할 파일:

- `apps/api-nest/src/status.controller.ts`
- `apps/api-nest/src/app.module.ts`
- `apps/api-nest/src/main.ts`
- `apps/api-nest/test/status.e2e.spec.ts`

Spring과 NestJS의 모양은 다음처럼 대응한다.

| Spring | NestJS | 쉬운 뜻 |
|---|---|---|
| `@RestController` | `@Controller` | 질문을 받는 안내 데스크 |
| `@RequestMapping("/api")` | `@Controller("api")` | 공통 주소 |
| `@GetMapping("/status")` | `@Get("status")` | GET 질문의 세부 주소 |
| Java `record` | TypeScript `interface` | 답의 모양을 적은 설계도 |
| MockMvc 테스트 | Supertest + Vitest | 실제 HTTP 자동 채점기 |

## 4단계: 두 서버를 실제로 켜기

터미널을 세 개 사용한다.

### 터미널 A — 기존 Spring

로컬 PostgreSQL이 이미 있다면 첫 명령은 건너뛴다.

```powershell
cd D:\jungleCamp\Projects\AI
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-postgres.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-backend.ps1
```

Spring 응답 확인:

```powershell
Invoke-RestMethod http://localhost:8080/api/status
```

### 터미널 B — 새 NestJS

```powershell
cd D:\jungleCamp\Projects\AI\node-transition
pnpm dev:api
```

NestJS 응답 확인:

```powershell
Invoke-RestMethod http://localhost:3001/api/status
```

### 터미널 C — 자동 비교

```powershell
cd D:\jungleCamp\Projects\AI\node-transition
pnpm d01:compare
```

예상 성공 메시지:

```text
✅ Spring과 NestJS의 /api/status 계약이 같습니다.
```

주소가 다를 때는 직접 지정할 수 있다.

```powershell
pnpm d01:compare --spring=http://localhost:8080 --nest=http://localhost:3001
```

현재 시각처럼 서버마다 달라도 되는 최상위 필드는 명시적으로 제외한다.

```powershell
pnpm d01:compare --ignore=checkedAt,requestId
```

아무 필드나 제외하면 실제 문제를 숨길 수 있으므로 이유를 `evidence/day-01/README.md`에 반드시 적는다.

## 5단계: 일부러 고장 내기

`apps/api-nest/src/status.controller.ts`에서 하나씩만 바꾸고 매번 `pnpm test:app`을 실행한다.

- `status`를 `state`로 바꾼다.
- `running`을 `stopped`로 바꾼다.
- `message`를 숫자 `123`으로 바꾼다.
- `@Get('status')`를 `@Get('health')`로 바꾼다.

각 실패에서 다음 세 가지를 말로 설명한다.

1. 무엇을 바꿨는가?
2. 테스트는 어떤 차이를 보여 줬는가?
3. 사용자는 어떤 문제를 겪게 되는가?

실험 후 파일을 원래 내용으로 돌리고 `pnpm test:app`을 다시 통과시킨다.

## 6단계: 증거 저장하기

```powershell
Invoke-RestMethod http://localhost:8080/api/status | ConvertTo-Json | Set-Content .\evidence\day-01\spring-response.json
Invoke-RestMethod http://localhost:3001/api/status | ConvertTo-Json | Set-Content .\evidence\day-01\nest-response.json
pnpm test:solution
pnpm test:app
```

`evidence/day-01/README.md`의 빈칸도 채운다.

## 12시간 시간표

| 시간 | 할 일 | 결과물 |
|---|---|---|
| 1시간 | 비유·용어·실제 Spring 응답 이해 | API 계약을 자기 말로 설명 |
| 2시간 | Spring Controller와 테스트 추적 | 질문 → 처리 → 응답 그림 |
| 2시간 | Starter RED 확인과 직접 수정 | 실패·성공 화면 |
| 2시간 | Solution 테스트와 비교기 추적 | 네 가지 비교 규칙 설명 |
| 3시간 | NestJS Controller·Module·E2E 이해 | 통합 테스트 성공 |
| 1시간 | 두 서버 실시간 비교와 고장 실험 | 차이 출력 기록 |
| 1시간 | 증거와 다섯 문장 회고 작성 | D01 제출물 |

## 완료 판정

- [ ] 처음 Starter 테스트가 `state`와 `status` 차이로 실패했다.
- [ ] Starter를 직접 고쳐 통과시켰다.
- [ ] Solution 테스트 6개가 통과했다.
- [ ] NestJS E2E 테스트 1개가 통과했다.
- [ ] TypeScript 빌드가 통과했다.
- [ ] Spring과 NestJS의 실제 응답을 저장했다.
- [ ] 필드를 일부러 바꿔 실패하는 장면을 확인했다.
- [ ] API 계약을 코드 없이 2분 동안 설명할 수 있다.

