# AI 프로젝트 Node.js 전환 연습장

이 폴더는 기존 Spring 서버를 지우거나 바꾸는 곳이 아니다. Spring을 **정답지**로 두고, 작은 Node.js 실험을 한 뒤 NestJS 서버에 다시 만드는 곳이다.

## 가장 먼저 할 일

`labs/day-01-api-contract/README.md`를 열고 D01부터 시작한다.

```powershell
cd D:\jungleCamp\Projects\AI\node-transition
pnpm install
pnpm test:starter
```

첫 `test:starter`는 **실패하는 것이 정상**이다. 자동 채점기가 `state`와 `status`의 차이를 찾아 주는 실습이기 때문이다.

## 폴더 역할

```text
node-transition/
├─ apps/api-nest/                  매일 조금씩 완성할 NestJS 서버
├─ packages/contracts/             Spring과 NestJS가 함께 지킬 API 약속
├─ labs/day-01-api-contract/
│  ├─ starter/                     내가 고칠 반제품
│  ├─ solution/                    막혔을 때 확인할 정답 도구
│  └─ test/                        자동 채점기
└─ evidence/day-01/                실행 결과와 회고를 남기는 곳
```

## 명령어 지도

| 명령 | 의미 | 정상 결과 |
|---|---|---|
| `pnpm test:starter` | 내가 고칠 D01 반제품 검사 | 처음에는 1개 실패 |
| `pnpm test:solution` | 계약 비교기 정답 검사 | 6개 성공 |
| `pnpm test:app` | 실제 NestJS API 검사 | 1개 성공 |
| `pnpm build` | TypeScript 문법과 타입 검사 | 오류 없이 종료 |
| `pnpm dev:api` | NestJS 연습 서버 실행 | 3001번 포트에서 대기 |
| `pnpm d01:compare` | 실행 중인 Spring과 NestJS 비교 | 같으면 성공 메시지 |

## 중요한 규칙

1. `labs`에서 마음껏 실패한다.
2. Starter를 최종 앱에서 import하지 않는다.
3. 테스트 메시지를 읽고 한 번에 한 곳만 고친다.
4. 30분 동안 직접 시도한 뒤 Solution을 본다.
5. 성공 화면뿐 아니라 실패 화면도 증거로 남긴다.

