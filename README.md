# AI가 읽는 미국경제

**미국 경제 지표를 읽고, AI의 해석을 확인하고, 그 답변의 근거까지 따라가는 대시보드.**

CPI·고용·금리처럼 흩어진 지표를 한 화면에 모으고, AI 브리핑과 후속 질문을 통해 한국 경제와의 연결을 살펴보는 프로젝트입니다. 경제 토론 게시판은 관련 맥락을 검색하는 RAG 데이터로도 사용합니다.

이 프로젝트에서 집중한 질문은 **“AI가 이렇게 답한 이유를 사용자가 확인할 수 있는가?”**입니다. 수치의 출처와 기준일, 답변이 인용한 근거, 실행 단계와 실패 상태를 함께 다룹니다.

[실제 화면](#실제-화면) · [설계와 문제 해결](#설계와-문제-해결) · [코드 탐색](#코드-탐색) · [로컬 실행](#로컬-실행) · [검증](#검증) · [현재 범위와 다음 과제](#현재-범위와-다음-과제)

## 실제 화면

로컬에서 **React → Spring Boot → PostgreSQL·pgvector**를 연결해 실행한 화면입니다. 아래 이미지를 클릭하면 원본 크기로 볼 수 있습니다.

### 경제 대시보드 — 지표의 숫자와 맥락을 한 화면에서

![실제 경제 대시보드: 요약, 한국수출입은행 환율, 물가·고용·성장·금리 등 12개 지표](docs/images/screenshots/dashboard.png)

상단 요약 → 통화별 기준 환율 → 지표 카드 순서로 읽습니다. 각 카드에는 수치뿐 아니라 단위·기준월·변화량·출처를 함께 배치했습니다. **FRED 지표 12개와 환율 23개를 실제 수집한 상태**입니다.

<details>
<summary><strong>경제 토론 — 주제별 탐색, 게시글 상세와 댓글을 함께 보기</strong></summary>

![실제 토론 화면: 왼쪽 주제별 목록과 작성 폼, 오른쪽 선택한 게시글과 댓글](docs/images/screenshots/discussion.png)

왼쪽에서 주제·태그로 글을 탐색하고, 오른쪽에서 본문과 댓글을 이어 읽습니다. 캡처의 글과 댓글은 저장소 migration에 포함된 **AI 생성 샘플 데이터**이며, 화면에서도 샘플임을 표시합니다.

</details>

<details>
<summary><strong>Agent 작업공간 — 요약의 근거, 역할별 Agent, 실행 이력 확인</strong></summary>

![실제 Agent 작업공간: 브리핑에 연결된 지표 근거 5개, 역할별 Agent 4개, 질문 입력창과 History](docs/images/screenshots/agent-workbench.png)

저장된 브리핑의 근거 지표 5개, 역할별 Agent 4개와 실행 이력을 한 화면에서 확인합니다. 캡처는 **기존 지표 기반 요약을 재사용한 fallback 실행**입니다. 화면의 `completed`는 실행 기록의 저장 상태이며 새 LLM 답변의 생성 성공을 뜻하지 않습니다.

</details>

> **캡처 환경:** 2026-09-16, 로컬 데모 계정, Chrome, 라이트 테마. 홈의 AI 요약은 API 크레딧 부족으로 fallback 상태입니다. 실제 수집·저장·화면 표시와 AI 생성 성공 여부를 구분해 기록했습니다. [캡처 조건·검증 결과](docs/images/screenshots/README.md)

## 사용자는 무엇을 할 수 있나요?

| 흐름 | 확인할 수 있는 것 |
| --- | --- |
| **경제 읽기** | 핵심 지표의 값·이전치·변화량·기준일·출처, 지표 이력, AI 브리프, 한국수출입은행 기준 환율 |
| **AI에게 질문하기** | 저장한 브리핑을 기준으로 초보자 설명·한국 영향·지표 심화·근거 확인 Agent와 대화, 메시지별 근거와 실행 기록 조회 |
| **토론 이어가기** | 경제 주제별 게시글·댓글·태그·좋아요·신고·알림, 관련 토론을 찾아 답변 근거로 연결 |
| **개인 공간 관리하기** | 로그인, 대시보드 표시 설정, 관리자 콘텐츠 숨김·감사 로그·MFA |

공개 대시보드는 로그인 없이 조회할 수 있습니다. Agent 실행과 개인화, 토론 API는 인증 경계 안에 있습니다. 한국어·영어·중국어 간체/번체·일본어를 지원합니다.

## 전체 구조

```mermaid
flowchart LR
    U[사용자] --> F["React · Ionic<br/>대시보드 / 토론 / Agent"]
    F -->|REST API| B["Spring Boot<br/>인증 · 데이터 · 근거 검증"]
    S["FRED · 한국수출입은행 등"] -->|수집·동기화| B
    B <-->|캐시 · 사용자 · 실행 기록| D[(PostgreSQL + pgvector)]
    B -->|브리핑·대화 요청| W["Python FastAPI Worker<br/>OpenAI Agents SDK"]
    W <-->|생성| L[OpenAI]
    W -->|도구 호출| M["MCP 도구<br/>지표 조회 · 토론 검색"]
    M -->|내부 API| B
```

**Spring은 데이터와 권한을 관리하고, Python은 Agent 실행을 담당합니다.** Worker가 반환한 결과는 Spring에서 근거를 검증한 뒤 실행 기록·메시지·근거 항목으로 저장합니다. 토론 검색도 Spring 내부 API를 통해 접근합니다.

대시보드의 **AI 브리프**는 경제 데이터 동기화 과정에서 생성하는 요약입니다. **Agent 작업공간**은 사용자가 브리핑을 실행하고, 해당 실행 기록에 이어 질문하는 별도 흐름입니다.

```text
AI/
├── front/                React + TypeScript + Ionic 사용자 화면
│   └── src/features/     economy · agents · board · auth · admin · profile · search
├── backend/              Spring Boot API, 인증, 데이터 수집·저장
│   └── src/main/
│       ├── java/com/junglecamp/backend/
│       │   ├── economy/  지표·환율 수집, 캐시, AI 브리프
│       │   ├── agent/    Worker 호출, 근거 검증, 실행 기록
│       │   ├── board/    토론과 댓글, 삭제 정책
│       │   ├── rag/      토론 인덱싱, 임베딩·검색
│       │   └── auth/    JWT·이메일 인증·OAuth·관리자 MFA
│       └── resources/db/migration/  Flyway 스키마 변경 이력
├── agent-worker/         FastAPI, Agents SDK, MCP, LangChain 호환 Retriever
├── scripts/              로컬 DB·서버 실행 보조
├── .github/workflows/    테스트·lint·build, AWS OIDC 확인, 협업 자동화
├── docs/                 설계 개념·작업 기록·배포 가이드
├── study/                경제 지표와 AI 구현 학습 기록
└── node-transition/      Spring API 계약을 기준으로 한 NestJS 전환 실습
```

백엔드는 도메인별 패키지 안에 controller/service/repository 등을 두고, 프론트는 기능별로 API와 화면을 묶었습니다. `node-transition/`은 학습용 실험이며 현재 서비스의 백엔드는 Spring입니다.

## 설계와 문제 해결

### 1. 근거 없는 AI 답변을 어떻게 다룰 것인가?

Agent 응답에 지표·이벤트·뉴스·RAG 근거 ID와 출처를 담고, Python과 Spring에서 검증합니다. 모르는 지표 ID나 출처 없는 근거는 거부하며, 근거 없이 확정한 채팅 응답은 `insufficient_evidence`로 전환합니다. Worker 호출에 실패하면 fallback 상태와 실행 단계를 기록합니다.

- **코드:** [Worker guardrail](agent-worker/app/guardrails.py), [AgentService](backend/src/main/java/com/junglecamp/backend/agent/service/AgentService.java), [Agent 실행 저장소](backend/src/main/java/com/junglecamp/backend/agent/repository/AgentRunRepository.java)
- **검증 근거:** [Worker 테스트](agent-worker/tests/test_agent_worker.py)의 `test_strict_chat_evidence_downgrades_answered_response_without_evidence`, [API 통합 테스트](backend/src/test/java/com/junglecamp/backend/ApiIntegrationTests.java)의 `rejectsUnsourcedAgentEvidenceAndStoresFailedRun`
- **남은 질문:** 출처 URL과 ID가 있다는 것만으로 내용의 사실성까지 보장되지는 않습니다. 인용 내용과 답변의 일치도를 어떻게 평가할 것인가?

### 2. 새로고침할 때마다 외부 API와 LLM을 호출해야 할까?

경제 지표와 생성된 브리프를 DB에 저장하고, 일반 조회는 저장된 결과를 사용합니다. 동기화는 기본 4시간 간격이며 한국 시간 기준 일일 실행 제한을 둡니다. OpenAI 생성 실패 시 fallback 브리프를 새 정상 결과처럼 저장하지 않습니다.

현재 구현에는 예외가 있습니다. 저장된 브리프가 `fallback:openai-error`이면 백그라운드 갱신을 요청하고, 환율도 오래된 캐시를 감지하면 별도로 갱신합니다. 따라서 “조회에서는 외부 호출이 전혀 없다”는 구조는 아닙니다.

- **코드:** [EconomySyncService](backend/src/main/java/com/junglecamp/backend/economy/service/EconomySyncService.java), [EconomyDashboardService](backend/src/main/java/com/junglecamp/backend/economy/service/EconomyDashboardService.java)
- **검증 근거:** [대시보드 서비스 테스트](backend/src/test/java/com/junglecamp/backend/economy/service/EconomyDashboardServiceTests.java)는 일반 조회와 오류 브리프의 백그라운드 갱신을 각각 검사합니다.
- **남은 질문:** 갱신이 실패했을 때 오래된 데이터임을 어떻게 알릴 것인가? 서버가 여러 대가 되면 프로세스 내부의 중복 실행 방지는 충분한가?

### 3. 사용자가 삭제한 글을 AI가 다시 인용해도 될까?

댓글이 있는 게시글은 본문을 `삭제된 게시글입니다.`로 가리는 tombstone 방식으로 처리해 대화 맥락을 보존합니다. 동시에 해당 글의 RAG 인덱스를 삭제합니다. 관리자 숨김 처리된 글은 RAG 검색에서 제외합니다.

검색은 쿼리 임베딩이 있으면 pgvector 유사도 검색을 우선하고, 상황에 따라 메모리 벡터 점수 계산 또는 키워드 검색으로 이어집니다. 공식 경제 지표와 사용자 작성 토론은 서로 다른 종류의 근거로 다룹니다.

- **코드:** [게시글 삭제 처리](backend/src/main/java/com/junglecamp/backend/board/service/BoardPostService.java), [RagIndexService](backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java), [DiscussionRetriever](agent-worker/app/discussion_retriever.py)
- **검증 근거:** [API 통합 테스트](backend/src/test/java/com/junglecamp/backend/ApiIntegrationTests.java)의 `deletingPostWithVisibleCommentsKeepsThreadAsDeletedPostTombstone`, `agentRagSearchPrefersVectorSimilarDiscussionPosts`
- **남은 질문:** 신규 검색에서 제외한 뒤에도 과거에 저장된 답변과 근거는 어떻게 관리해야 할까?

### 4. 댓글 중복은 화면 문제일까, 조회 문제일까?

게시글 상세에서 태그와 댓글 컬렉션을 함께 fetch join하면 태그 3개 × 댓글 2개가 6개 행으로 늘어날 수 있습니다. 상세 조회는 태그만 entity graph로 가져오고 댓글은 서비스 트랜잭션 안에서 별도 로딩하도록 구성했습니다.

- **코드:** [BoardPostRepository](backend/src/main/java/com/junglecamp/backend/board/repository/BoardPostRepository.java)
- **검증 근거:** [API 통합 테스트](backend/src/test/java/com/junglecamp/backend/ApiIntegrationTests.java)의 `postDetailDoesNotDuplicateCommentsWhenPostHasMultipleTags`
- **설계 기록:** [원인과 조회 방식의 선택](docs/concepts/board-comment-fetch-join-duplication.md)

## 코드 탐색

| 보고 싶은 판단 | 시작할 파일 |
| --- | --- |
| 화면에서 실제 API까지의 연결 | [HomePage](front/src/features/economy/pages/HomePage.tsx) → [경제 API·타입](front/src/features/economy/api/economy.ts) → [Controller](backend/src/main/java/com/junglecamp/backend/economy/controller/UsEconomyDashboardController.java) |
| Agent 실행과 근거를 보여주는 방법 | [AgentWorkbench](front/src/features/agents/pages/AgentWorkbench.tsx) → [Agent API](front/src/features/agents/api/agents.ts) → [Worker 실행](agent-worker/app/service.py) |
| 쿠키 인증과 CSRF, 관리자 보호 | [SecurityConfig](backend/src/main/java/com/junglecamp/backend/config/SecurityConfig.java), [JwtCsrfFilter](backend/src/main/java/com/junglecamp/backend/auth/filter/JwtCsrfFilter.java), [인증 설계](docs/concepts/jwt-local-auth-and-protected-workspaces.md) |
| 데이터 모델이 발전한 과정 | [Flyway migration](backend/src/main/resources/db/migration), [개념 문서](docs/concepts/README.md) |
| 도메인을 이해하고 구현으로 연결한 과정 | [경제 지표 종합 학습](study/us-economic-indicators-business-cycle-synthesis.md), [AI 시스템 학습 지도](study/study/00-current-ai-system-map.md) |

### 기술 선택

| 영역 | 기술 | 맡긴 책임 |
| --- | --- | --- |
| 화면 | React 18, TypeScript, Ionic 8, Vite 6 | 기능별 화면과 API 타입, 앱 셸 |
| API | Java 21, Spring Boot 4, Security, JPA·JDBC | 인증·권한, 도메인 로직, 수집·저장 |
| AI | Python, FastAPI, OpenAI Agents SDK, MCP, LangChain Core | Agent 실행, 도구 호출, Retriever 연결 |
| 데이터 | PostgreSQL 16, pgvector, Flyway | 지표 캐시, 실행·근거 기록, 벡터 검색, 스키마 이력 |
| 검증 | JUnit, Spring Boot Test, pytest, ESLint, TypeScript | API 계약·실패 경로·근거 검증·정적 검사 |
| 자동화 | GitHub Actions, Docker, AWS OIDC | CI, 컨테이너 빌드 정의, AWS 역할 인증 확인 |

## 로컬 실행

Windows PowerShell 기준입니다. Java 21, Node.js 20, Python 3.12, Docker를 준비합니다. 아래 명령은 저장소 루트에서 시작합니다.

### 1. 환경 설정과 PostgreSQL

```powershell
# 기존 .env.local이 없을 때만 예제를 복사합니다.
if (-not (Test-Path .env.local)) { Copy-Item .env.local.example .env.local }
.\scripts\start-local-postgres.ps1
```

DB 준비 확인이 실패하면 컨테이너 기동 후 같은 스크립트를 다시 실행합니다. [환경 변수 예제](.env.local.example)를 기준으로 필요한 값을 채웁니다.

| 사용 범위 | 필요한 설정 |
| --- | --- |
| 로컬 DB 연결 | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` — 예제와 DB 스크립트의 기본값이 일치 |
| FRED 지표·AI 생성·임베딩 | `FRED_API_KEY`, `OPENAI_API_KEY` 및 각 `OPENAI_*_MODEL` |
| 기준 환율 | `KOREAEXIM_API_KEY` |
| 이메일 가입·인증 | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM` |
| Google 로그인 | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, 필요 시 `GOOGLE_REDIRECT_URI` |
| Agent 연결 | Spring과 Worker의 `AGENT_WORKER_TOKEN` 일치, `AGENT_WORKER_URL`, `AGENT_MCP_URL` |

Google 로그인을 사용하지 않으면 예제의 빈 `GOOGLE_CLIENT_ID=`, `GOOGLE_CLIENT_SECRET=`, `GOOGLE_REDIRECT_URI=` 행을 제거해 서버 기본 설정을 사용합니다. 빈 값은 Spring OAuth 설정 초기화에 영향을 줄 수 있습니다. 실제 Google 로그인에는 등록한 클라이언트와 콜백 설정이 필요합니다.

API 키가 없으면 실제 경제 데이터나 AI 답변이 채워지지 않으며, 빈 데이터·fallback 상태가 나타날 수 있습니다. 외부 수집 없이 화면과 API를 확인하려면 `ECON_SYNC_ENABLED=false`, `KOREAEXIM_EXCHANGE_ENABLED=false`로 설정합니다. 로컬 기본 비밀값은 배포 전에 교체하고 실제 `.env.local`은 커밋하지 않습니다.

### 2. 백엔드·프론트엔드 실행

각각 별도 터미널에서 실행합니다.

```powershell
# 터미널 A — 저장소 루트에서
cd backend
.\mvnw.cmd spring-boot:run
```

```powershell
# 터미널 B — 저장소 루트에서
cd front
npm ci
npm run dev
```

[홈 대시보드](http://localhost:5173/home) · [API 상태](http://localhost:8080/api/status) · [Swagger UI](http://localhost:8080/swagger-ui.html)

프론트의 `/api/*` 요청은 개발 중 Vite proxy를 통해 `localhost:8080`으로 전달됩니다. 현재 인증은 이메일 가입·인증 또는 Google OAuth를 사용합니다.

### 3. Agent Worker 실행

Agent 기능을 사용할 때 별도 터미널에서 실행합니다. 가상환경의 Python을 활성화한 뒤 스크립트가 루트 `.env.local`을 읽도록 합니다.

```powershell
# 터미널 C — 저장소 루트에서
python -m venv agent-worker/.venv
.\agent-worker\.venv\Scripts\Activate.ps1
python -m pip install -r agent-worker/requirements.txt
.\scripts\start-local-agent-worker.ps1
```

Worker는 `localhost:8090`, MCP는 `/mcp/`에서 동작합니다. 로그인 후 Agent 작업공간에서 브리핑을 생성하고 질문하면 실행 기록과 근거를 확인할 수 있습니다.

<details>
<summary>주요 API와 응답의 확인 지점</summary>

| API | 역할 | 확인할 항목 |
| --- | --- | --- |
| `GET /api/us-economy/dashboard` | 공개 경제 대시보드 | `metrics`, `brief.generationStatus`, `exchangeRates`, 지표별 `sourceUrl`·`baseDate` |
| `GET /api/us-economy/metrics/{metricId}/history` | 공개 지표 이력 | 기간별 관측치와 출처 비교 |
| `POST /api/agents/runs/briefing` | 인증 사용자 브리핑 생성 | 실행 ID, 단계, 근거 |
| `POST /api/agents/runs/{runId}/chat` | 소유한 실행 기록에 질문 | `answerStatus`, 근거 ID·항목 |
| `GET /api/agents/runs/{runId}` | 실행 상세 조회 | 저장된 메시지·근거·실행 단계 |

변경 API는 인증 쿠키와 `X-XSRF-TOKEN`을 사용합니다. 프론트의 [공통 API 유틸](front/src/api/backend.ts)과 [Agent Controller](backend/src/main/java/com/junglecamp/backend/agent/controller/AgentController.java)에서 호출 계약을 확인할 수 있습니다.

</details>

## 검증

각 블록을 저장소 루트의 별도 터미널에서 실행합니다. 설계 사례별 핵심 회귀 테스트는 위의 코드·검증 근거 링크에서 확인할 수 있습니다.

```powershell
cd backend
.\mvnw.cmd test
```

```powershell
cd front
npm ci
npm run lint
npm run build
```

```powershell
.\agent-worker\.venv\Scripts\Activate.ps1
cd agent-worker
python -m pytest tests
```

[CI 정의](.github/workflows/ci.yml)는 `gyugo` 브랜치 push와 해당 브랜치 대상 PR에서 백엔드 테스트, 프론트 lint/build, Worker 테스트를 실행합니다. 백엔드 테스트는 H2를 사용하므로 PostgreSQL migration과 pgvector 동작은 실제 PostgreSQL에서도 별도 확인해야 합니다.

## 현재 범위와 다음 과제

- **현재 구현:** 경제 데이터 수집·캐시, AI 브리프, 근거를 저장하는 Agent 작업공간, 토론 RAG, 인증·관리자 기능. 외부 서비스 연결에는 각 키와 실행 환경이 필요합니다.
- **배포:** Dockerfile과 [AWS OIDC 확인 workflow](.github/workflows/aws-role.yml), [ECS 배포 가이드](docs/ecs-deployment-testing-guide.md)가 있습니다. 현재 저장소에는 ECS 자동 배포 workflow가 없으며, 가이드의 배포 완료 여부는 운영 환경에서 따로 확인해야 합니다.
- **AI 품질:** 근거 ID·출처·응답 상태 검증을 넘어, 인용 정확도·검색 품질을 평가하는 데이터셋과 반복 평가가 다음 과제입니다.
- **확장성:** pgvector 인덱스와 검색 품질·지연 측정, 여러 서버에서의 동기화 중복 방지, 삭제된 원문을 인용한 과거 답변의 보존 정책을 더 다뤄야 합니다.
- **전환 실험:** [NestJS API 계약 실습](node-transition/README.md)은 기존 Spring 응답을 기준으로 호환성을 확인하는 학습 공간입니다. 전체 서비스 전환을 완료한 상태는 아닙니다.

더 깊게 살펴보려면 [문서 허브](docs/README.md), [구현 개념](docs/concepts/README.md), [작업 기록](docs/work-logs), [AI 학습 경로](study/study/README.md)를 참고하세요. 개편 전 README와 구조는 [백업 안내](docs/backups/2026-09-16-readme/BACKUP.md)에 보존했습니다.
