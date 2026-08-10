# AI_w15-16

AI 적용 기술을 활용한 게시판 서비스 과제 저장소입니다. 현재는 Spring Boot 백엔드와 Ionic React 프론트엔드의 기본 구조, 백엔드 API 연동, Swagger 문서, GitHub Actions 기반 CI/CD 자동화, AWS ECS 배포 설계까지 정리되어 있습니다.

![프로젝트 개요](img.png)

## 프로젝트 개요

- 기본 게시판 서비스에 AI 기능을 단계적으로 결합하는 것을 목표로 합니다.
- 백엔드는 Spring Boot 기반 로그인 화면, 보안 설정, JSON API, Swagger UI를 제공합니다.
- 프론트엔드는 React, TypeScript, Vite, Ionic React, Capacitor 기반으로 구성했습니다.
- 배포 자동화는 GitHub Actions, GitHub OIDC, Amazon ECR, Amazon ECS Fargate를 기준으로 설계했습니다.
- 과제 요구사항, 회의 기록, 작업 로그, 개념 문서는 `docs/`와 `myself/` 아래에 관리합니다.

## 기술 스택

### Backend

- Java 21
- Spring Boot 4
- Spring Security
- Thymeleaf
- Springdoc OpenAPI
- Maven
- Docker

### Frontend

- React 18
- TypeScript
- Vite
- Ionic React
- Capacitor
- ESLint

### Automation And AWS

- GitHub Actions
- GitHub Projects 자동화
- Slack webhook 알림
- GitHub OIDC 기반 AWS 인증
- Amazon ECR
- Amazon ECS Fargate
- Application Load Balancer 기반 접속 구조
- CloudWatch Logs 기반 운영 로그 구조

## 디렉터리 구조

```text
.
+-- .github/
|   +-- workflows/                  # CI, 백엔드/프론트 배포, AWS OIDC 검증, 프로젝트 자동화
+-- agent-worker/                   # Python 기반 AI Agent worker와 MCP 도구 서버
|   +-- app/                        # Agent 실행 진입점, guardrail, MCP tool, RAG 검색 보조 로직
|   +-- tests/                      # Agent worker 단위 테스트
|   +-- requirements.txt            # Python 의존성 목록
+-- backend/                        # Spring Boot 백엔드 API 서버
|   +-- src/main/java/com/junglecamp/backend/
|   |   +-- admin/                  # 관리자 콘솔 API, 숨김 콘텐츠/감사 로그 관리
|   |   +-- agent/                  # Agent run 저장, 조회, 백엔드 연동 API
|   |   +-- auth/                   # JWT 쿠키 인증, 이메일 인증, OAuth, MFA, CAPTCHA, rate limit
|   |   +-- board/                  # 토론 게시글, 댓글, 태그, 좋아요, 신고, 알림, RAG 연동
|   |   +-- config/                 # Spring Security, CORS, OpenAPI, 공통 설정
|   |   +-- economy/                # 경제 지표, 일정, 리포트, AI 브리프, 동기화 서비스
|   |   +-- i18n/                   # 서버 메시지 국제화 보조
|   |   +-- rag/                    # pgvector 기반 문서/청크 인덱싱 서비스
|   |   +-- search/                 # 홈 통합 검색 API
|   |   +-- system/                 # 상태 확인, 시스템성 API
|   |   +-- user/                   # 사용자, 대시보드 선호 설정, 프로필 관리
|   |   +-- web/                    # 웹 페이지/리다이렉트 보조 컨트롤러
|   +-- src/main/resources/
|   |   +-- db/migration/           # Flyway SQL migration, PostgreSQL/pgvector 스키마
|   |   +-- static/                 # 백엔드 정적 리소스
|   |   +-- templates/              # Thymeleaf 템플릿
|   |   +-- application.properties  # 서버 기본 설정
|   +-- src/test/java/              # 백엔드 통합/서비스/인증 테스트
|   +-- Dockerfile                  # 백엔드 컨테이너 이미지 빌드
|   +-- pom.xml                     # Java/Maven 의존성 정의
+-- common/
|   +-- workflows/                  # 대화형 작업 트리거와 공통 작업 절차
+-- docs/                           # 프로젝트 문서 허브
|   +-- concepts/                   # 주요 구현 개념, 패턴, 검증 방법
|   +-- prompt-history/             # 사용자 동의가 있을 때만 저장하는 프롬프트 이력
|   +-- superpowers/                # 설계/구현 계획 문서
|   +-- work-logs/                  # 날짜별 작업 로그와 검증 결과
+-- front/                          # Ionic React + Vite 프론트엔드
|   +-- src/
|   |   +-- api/                    # 공통 백엔드 요청 유틸과 현재 사용자 타입
|   |   +-- app/                    # Ionic 앱 셸, 라우터, 보호 라우트
|   |   +-- features/
|   |   |   +-- admin/              # 관리자 콘솔 화면/API
|   |   |   +-- agents/             # Agent workbench 화면/API
|   |   |   +-- auth/               # 로그인/회원가입, 이메일 코드 인증, MFA, CAPTCHA UI
|   |   |   +-- board/              # 토론 게시판, 댓글, 관리자 숨김/삭제 UI
|   |   |   +-- economy/            # 홈 대시보드, 경제 일정/리포트/알림 모달
|   |   |   +-- profile/            # My Page와 대시보드 표시 설정
|   |   |   +-- search/             # 홈 통합 검색 결과 화면
|   |   +-- i18n/                   # 다국어 문구와 언어 컨트롤
|   |   +-- pages/                  # 공통 페이지 진입점
|   |   +-- theme/                  # 테마, 다크모드, 표시 설정 UI
|   +-- package.json                # 프론트엔드 npm 스크립트와 의존성
|   +-- vite.config.ts              # Vite 개발 서버와 proxy 설정
|   +-- capacitor.config.ts         # Capacitor 앱 설정
+-- scripts/                        # 로컬 PostgreSQL, 백엔드, Agent worker 실행 스크립트
+-- study/                          # 학습 노트, 기술 조사, 마이크로서비스 개발 절차 정리
+-- myself/                         # 회의록과 개인 정리 노트
+-- AGENTS.md                       # Codex 작업 규칙과 문서화 규칙
+-- README.md                       # 프로젝트 소개와 실행/검증 가이드
+-- 과제내용.md                     # 과제 요구사항 정리
+-- *.drawio                        # AWS/CI/CD 아키텍처 다이어그램
```

### 구조를 보는 기준

- `backend/`, `front/`, `agent-worker/`는 실행 가능한 애플리케이션 단위입니다. 현재는 하나의 저장소에 함께 두고 있지만, 책임은 백엔드 API, 프론트 UI, AI Agent worker로 나뉩니다.
- `backend/src/main/java/com/junglecamp/backend/*`는 기능 도메인 중심으로 나뉩니다. 인증, 경제 데이터, 토론, RAG, Agent, 관리자 기능을 각각 독립 패키지로 관리합니다.
- `front/src/features/*`는 화면 기능 기준으로 나뉩니다. 각 feature 안에 API 호출 모듈, 페이지 컴포넌트, CSS를 함께 배치해 화면 단위 변경 범위를 좁힙니다.
- `docs/concepts/`는 코드에 적용한 개념을 설명하고, `docs/work-logs/`는 실제 작업 기록과 검증 결과를 남깁니다.
- `study/`는 구현 산출물이 아니라 학습과 의사결정 정리 공간입니다. ERD, 아키텍처, MSA 진행 절차 같은 발표/회고 자료가 들어갑니다.
- `node_modules/`, `backend/target/`, 로그 파일, 로컬 `.env.*` 값은 실행 중 생성되거나 개인 환경에 속하므로 구조 설명에서는 제외합니다.

## 현재 구현 내용

### Backend

- 커스텀 로그인 페이지(`/login`)와 인증 후 프론트 게시판 화면 이동을 제공합니다.
- 로그인 성공 후 이동할 프론트 URL은 `FRONTEND_BOARD_URL` 환경 변수로 변경할 수 있으며 기본값은 `http://localhost:5173/home`입니다.
- 테스트용 인메모리 계정을 사용합니다.
- Spring Security 보안 체인을 웹 페이지용과 API용으로 분리했습니다.
- `/api/status`는 공개 상태 확인 API입니다.
- `/api/me`는 인증된 사용자 이름을 반환합니다.
- API 인증 실패는 HTML 로그인 리다이렉트가 아니라 `401 Unauthorized`로 응답합니다.
- Swagger UI(`/swagger-ui.html`)와 OpenAPI JSON(`/v3/api-docs`)을 제공합니다.

테스트 계정:

```text
ID: user
PW: password
```

### Frontend

- Vite 기반 React TypeScript 프로젝트를 구성했습니다.
- Ionic React 앱 셸, 라우터, 홈 화면, 테마 파일을 추가했습니다.
- `front/src/api/backend.ts`에서 백엔드 API 호출을 모듈화했습니다.
- 개발 서버에서 `/api/*` 요청은 Vite proxy를 통해 `http://localhost:8080`으로 전달됩니다.
- 홈 화면은 백엔드 연결 상태와 인증 상태를 표시하고, 인증이 없으면 백엔드 로그인 화면으로 이동할 수 있게 구성했습니다.
- Capacitor 설정과 `cap:sync`, `cap:copy` 스크립트를 준비했습니다.

### Documentation

- `docs/work-logs/`에는 실제 수행 작업, 변경 파일, 검증 결과를 기록합니다.
- `docs/concepts/`에는 보안 체인, Swagger, AWS IAM, CI/CD 배포 패턴 같은 주요 개념을 정리합니다.
- `docs/prompt-history/`는 사용자가 프롬프트 원문 저장을 명확히 승인한 경우에만 사용합니다.
- `docs/ecs-deployment-testing-guide.md`에는 ECS 실행 상태에서 서버 업데이트가 배포되는 흐름과 테스트 방법을 별도로 정리했습니다.

## 로컬 실행 방법

### Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

브라우저 접속:

```text
http://localhost:8080
http://localhost:8080/swagger-ui.html
http://localhost:8080/api/status
```

### Frontend

```powershell
cd front
npm install
npm run dev
```

기본 Vite 개발 서버 주소:

```text
http://localhost:5173
```

## AI Agent 환경 변수 준비

Agent 기능을 붙일 때는 루트 `.env.agents.example`을 기준으로 로컬은 `.env.agents.local`, 배포는 GitHub Secrets/ECS/Secrets Manager에 같은 키를 등록합니다. 실제 값은 커밋하지 않습니다.

사람이 직접 입력할 값은 `OPENAI_API_KEY`, `OPENAI_AGENT_MODEL`, 그리고 실데이터 연결 시 `BLS_API_KEY`, `FRED_API_KEY`, `NEWS_SEARCH_API_KEY`입니다. Agent 관련 키가 늘어나면 `.env.agents.example`과 이 짧은 절차를 함께 갱신합니다.

## 검증 명령

### Backend

```powershell
cd backend
.\mvnw.cmd test
```

### Frontend

```powershell
cd front
npm run lint
npm run build
```

### Git Ignore 확인

로컬 Maven 저장소 캐시가 Git에 올라가지 않도록 루트 `.gitignore`에 `.m2/`, `**/.m2/` 패턴을 추가했습니다.

```powershell
git check-ignore -v backend/.m2/repository/ch/qos/logback/logback-classic/1.5.32/logback-classic-1.5.32.jar
```

## CI/CD 자동화

현재 자동화는 `gyugo` 브랜치를 기준으로 동작합니다.

### CI: `.github/workflows/ci.yml`

- 트리거: `gyugo` 브랜치 push, `gyugo` 대상 pull request
- 백엔드: Java 21 설정 후 `./mvnw test` 실행
- 프론트엔드: Node 20 설정, `npm ci`, `npm run build` 실행

### Backend ECS Deploy: `.github/workflows/deploy.yml`

- 트리거: `gyugo` 브랜치 push, 수동 `workflow_dispatch`
- GitHub OIDC로 AWS 역할을 Assume합니다.
- Amazon ECR에 로그인합니다.
- `backend/Dockerfile`로 백엔드 이미지를 빌드합니다.
- 이미지를 `489535778783.dkr.ecr.ap-northeast-2.amazonaws.com/nammanmu/gyugo/backend:${GITHUB_SHA}` 태그로 푸시합니다.
- 현재 ECS task definition을 내려받습니다.
- 새 이미지 URI를 task definition의 `backend` 컨테이너에 반영합니다.
- ECS 서비스 `nammanmu-gyugo-backend`를 클러스터 `nammanmu-dev`에서 새 task definition으로 배포합니다.
- `wait-for-service-stability: true`로 ECS 서비스 안정화까지 대기합니다.
- `HEALTH_CHECK_URL` 값이 있으면 curl 기반 smoke test를 실행하고, 비어 있으면 smoke test를 건너뜁니다.

### AWS Role Check: `.github/workflows/aws-role.yml`

- 트리거: `gyugo` 브랜치 push, 수동 `workflow_dispatch`
- GitHub OIDC 역할 인증이 정상인지 `aws sts get-caller-identity`로 확인합니다.

### Project Automation: `.github/workflows/automation.yml`

- 이슈 생성 시 Slack 알림을 보냅니다.
- 이슈 할당 시 GitHub Project 상태를 `In Progress`로 이동합니다.
- PR 생성 시 Slack 알림을 보냅니다.
- PR merge 또는 이슈 close 시 GitHub Project 상태를 `Done`으로 이동합니다.
- 필요한 시크릿: `SLACK_WEBHOOK_URL`, `PROJECT_TOKEN`

## AWS 배포 구조 요약

배포 설계는 `nammanmu-relaxed-cicd-aws-architecture.drawio`에 정리되어 있습니다.

- GitHub Actions가 OIDC로 AWS 배포 역할을 Assume합니다.
- 백엔드 Docker 이미지는 ECR 저장소 `nammanmu/gyugo/backend`에 저장됩니다.
- ECS Fargate 서비스는 ECR 이미지를 pull해 컨테이너를 실행합니다.
- Application Load Balancer가 외부 HTTP/HTTPS 요청을 ECS task target group으로 전달합니다.
- CloudWatch Logs가 ECS task 로그를 수집합니다.
- 비용 폭탄 방지를 위해 IAM guardrail, Budgets, 태그 기반 비용 추적 설계를 함께 문서화했습니다.

ECS 실행 중 서버 업데이트 후 자동 배포와 사용자 테스트 방법은 [ECS Deployment And Testing Guide](docs/ecs-deployment-testing-guide.md)를 참고하세요.

## 관련 문서

- [Docs Overview](docs/README.md)
- [ECS Deployment And Testing Guide](docs/ecs-deployment-testing-guide.md)
- [Documentation CI/CD ECS Work Log](docs/work-logs/2026-06-11-documentation-cicd-ecs.md)
- [Backend Frontend Integration Work Log](docs/work-logs/2026-06-05-backend-frontend-integration.md)
- [CI/CD ECS Deployment Concept](docs/concepts/cicd-ecs-deployment.md)
- [IAM Cost-Bomb Guardrail Policies](docs/concepts/iam-cost-bomb-guardrail-policies.md)
- [IAM Tag-Based Sandbox Policies](docs/concepts/iam-tag-based-sandbox-policies.md)
- [Prompt Workflow Hook](docs/prompt-workflow-hook.md)

## 경제지표 학습 기록

### 2026-07-12 - 미국 물가 지표: CPI, Core CPI, PCE

- 학습 목표: CPI와 PCE가 측정하는 범위와 가중치의 차이를 이해하고, 헤드라인·근원 물가를 함께 읽습니다.
- 핵심 질문: 전월 대비와 전년 대비는 언제 구분해야 하는가? 계절조정 여부와 데이터 개정은 해석을 어떻게 바꾸는가? Fed가 PCE 물가를 중시하는 이유는 무엇인가?
- 대시보드 적용: 지표 값과 함께 단위, 기준월, 이전치, 출처, 계절조정 여부를 확인하고 AI 요약이 인용한 근거 지표로 연결합니다.
- 상세 학습 노트: [미국 물가 지표 학습 노트](study/us-economic-indicators-inflation.md)

### 2026-07-26 - 미국 고용 지표: 비농업고용, 실업률, 임금

- 학습 목표: 사업체 조사와 가계 조사의 차이를 이해하고, 비농업고용·실업률·경제활동참가율·임금을 한 묶음으로 읽습니다.
- 핵심 질문: 고용 증가와 실업률 상승이 동시에 나타날 수 있는가? 이전 두 달의 개정치는 현재 판단을 어떻게 바꾸는가? 임금과 근로시간은 물가 및 소비와 어떻게 연결되는가?
- 대시보드 적용: 조사 출처와 단위, 기준월, 개정 상태를 구분하고 단일 월 수치보다 3개월 흐름과 지표 간 일관성을 확인합니다.
- 상세 학습 노트: [미국 고용 지표 학습 노트](study/us-economic-indicators-labor-market.md)

### 2026-07-27 - 미국 GDP와 성장률

- 학습 목표: 명목·실질 GDP와 전기 대비 연율을 구분하고 소비·투자·정부지출·순수출의 성장 기여도를 읽습니다.
- 핵심 질문: 분기 성장률의 연율 표시는 무엇을 가정하는가? 수입 증가는 왜 GDP 계산에서 차감되는가? 속보치 이후 개정은 판단을 어떻게 바꾸는가?
- 대시보드 적용: 발표 차수와 데이터 빈티지를 보존하고 성장률, 수준, 기여도를 서로 다른 단위로 표시합니다.
- 상세 학습 노트: [미국 GDP 성장률 학습 노트](study/us-economic-indicators-gdp-growth.md)

### 2026-07-28 - 미국 소비지출과 소매판매

- 학습 목표: BEA 개인소비지출과 Census 소매판매의 범위·발표 속도·물가 반영 차이를 이해합니다.
- 핵심 질문: 명목 소매판매 증가는 실제 판매량 증가인가? 서비스 소비는 어디에서 확인하는가? 속보 소매판매 개정은 어떻게 관리하는가?
- 대시보드 적용: 명목·실질, 재화·서비스, 속보·개정 상태를 구분하고 소득·저축률과 함께 소비 지속성을 판단합니다.
- 상세 학습 노트: [미국 소비지표 학습 노트](study/us-economic-indicators-consumer-spending-retail-sales.md)

### 2026-07-29 - 미국 산업생산과 설비가동률

- 학습 목표: 제조업·광업·유틸리티 생산과 설비가동률을 구분하고 산업 경기의 폭과 공급 여력을 읽습니다.
- 핵심 질문: 산업생산 지수와 GDP는 범위가 어떻게 다른가? 가동률 상승은 수요 증가인가 공급 축소인가? 날씨와 자동차 생산은 월간 수치를 어떻게 흔드는가?
- 대시보드 적용: 전체·제조업·업종별 생산을 분리하고 예비치, 월간 개정과 연례 벤치마크를 데이터 빈티지로 관리합니다.
- 상세 학습 노트: [미국 생산지표 학습 노트](study/us-economic-indicators-industrial-production-capacity.md)

### 2026-07-30 - 미국 정책금리와 국채 수익률곡선

- 학습 목표: FOMC 목표범위, 실효 연방기금금리, 명목·실질 국채금리와 장단기 금리차를 구분합니다.
- 핵심 질문: 장기금리는 기준금리 외에 무엇을 반영하는가? 실질금리와 기대인플레이션은 어떻게 나누는가? 역전된 수익률곡선은 경기침체 시점을 확정하는가?
- 대시보드 적용: 금리 종류와 만기, 관측 시각, 단위와 출처를 저장하고 금리차를 동일 시점 자료로 계산합니다.
- 상세 학습 노트: [미국 금리지표 학습 노트](study/us-economic-indicators-interest-rates-yield-curve.md)

### 2026-07-31 - 미국 무역수지와 경상수지

- 학습 목표: 상품·서비스 무역수지와 소득·이전까지 포함한 경상수지를 구분하고 수출입의 가격·물량 효과를 읽습니다.
- 핵심 질문: 무역적자 확대는 항상 성장 악화인가? 달러와 미국 내수는 수출입에 어떻게 작용하는가? 관세 전 선구매와 재고는 월간 수치를 어떻게 왜곡하는가?
- 대시보드 적용: 수출·수입·수지를 각각 저장하고 상품·서비스, 명목·실질, 월간·분기 자료를 구분합니다.
- 상세 학습 노트: [미국 대외거래지표 학습 노트](study/us-economic-indicators-trade-balance-current-account.md)

### 2026-08-01 - 미국 경기순환 종합 읽기

- 학습 목표: 성장·고용·물가·소비·생산·금리·무역의 상태와 모멘텀을 결합해 근거가 추적되는 경기판단을 만듭니다.
- 핵심 질문: 지표가 엇갈릴 때 무엇을 우선하는가? 침체는 실질 GDP 두 분기 감소만으로 정의되는가? 최신 개정치와 발표 당시 판단을 어떻게 함께 보존하는가?
- 대시보드 적용: 깊이·확산·지속기간, 최신성·신뢰도를 분리 평가하고 AI 요약에 반대 근거와 불확실성을 포함합니다.
- 상세 학습 노트: [미국 경기순환 종합 학습 노트](study/us-economic-indicators-business-cycle-synthesis.md)

### 2026-08-08 - 미국 주택시장 지표

- 학습 목표: 건축허가·주택착공·완공·신규주택판매를 공급 파이프라인으로 연결하고 SAAR와 실제 월간 건수를 구분합니다.
- 핵심 질문: 허가 증가는 언제 실제 착공으로 이어지는가? 단독주택과 다세대주택의 방향이 다를 때 전체 수치를 어떻게 설명하는가? 속보치 개정과 표본오차를 어떻게 다루는가?
- 대시보드 적용: 발표일·대상월·단위·계절조정·연율화·주택 유형·개정 상태를 저장하고 모기지금리와 재고를 반대 근거로 함께 제시합니다.
- 상세 학습 노트: [미국 주택시장 지표 학습 노트](study/us-economic-indicators-housing-market.md)

### 2026-08-09 - 미국 ISM 제조업·서비스업 PMI

- 학습 목표: PMI가 실제 생산 증가율이 아닌 확산지수임을 이해하고 제조업·서비스업의 기준선 위치와 변화 속도를 구분합니다.
- 핵심 질문: 50 위에서 하락하거나 50 아래에서 상승하면 어떻게 표현하는가? 신규주문은 현재 활동보다 먼저 움직이는가? 공급자배송 지연은 수요 강세인가 공급 충격인가?
- 대시보드 적용: 부문·기준선·방향·모멘텀·하위지수를 저장하고 산업생산·고용·물가 자료로 설문 신호를 교차검증합니다.
- 상세 학습 노트: [미국 ISM PMI 학습 노트](study/us-economic-indicators-ism-pmi.md)

### 2026-08-10 - 미국 소비자신뢰·소비자심리 지표

- 학습 목표: Conference Board의 소비자신뢰지수와 Michigan 소비자심리지수의 질문·구성·기준 차이를 이해하고 각 계열 내부의 방향을 읽습니다.
- 핵심 질문: 현재상황과 기대는 왜 엇갈리는가? 심리가 약한데 실제 소비가 강할 수 있는가? 기대인플레이션은 실제 물가와 어떻게 다른가?
- 대시보드 적용: 발표기관·하위지수·기준기간·조사 마감일·발표 단계를 저장하고 서로 다른 지수의 절대 수준을 직접 비교하지 않습니다.
- 상세 학습 노트: [미국 소비자신뢰·소비자심리 지표 학습 노트](study/us-economic-indicators-consumer-sentiment.md)

## 앞으로의 작업

- 운영용 ALB DNS가 확정되면 `HEALTH_CHECK_URL`에 `/api/status` 같은 확인 URL을 설정합니다.
- ECS cluster/service/task definition/container 이름이 변경되면 `deploy.yml`과 문서 값을 함께 갱신합니다.
- 운영용 인증 저장소를 추가합니다.
- RAG embedding 생성, chunking job, semantic search API를 구현합니다.
- MCP, AI Agent 기능의 상세 설계를 추가합니다.

## 게시판, PostgreSQL, RAG 구성

- 게시글 CRUD, 댓글 작성/수정/삭제, 태그 필터, 키워드 검색 API를 추가했습니다.
- 프론트엔드 홈 화면은 검색, 태그 필터, 목록, 상세, 작성/수정, 댓글을 한 화면에서 다루는 게시판 작업 화면으로 바뀌었습니다.
- PostgreSQL datasource는 `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` 환경 변수로 설정합니다.
- 로컬 PostgreSQL에서 RDS PostgreSQL로 전환할 때는 datasource endpoint와 자격 증명만 바꾸는 구조입니다.
- Flyway migration `V1__create_board_and_rag_schema.sql`에 게시판 테이블과 RAG 확장용 `rag_documents`, `rag_chunks`, `rag_index_jobs` 테이블을 포함했습니다.
- `rag_chunks.embedding`은 `pgvector`의 `vector(1536)` 타입을 기준으로 설계했습니다.
- 학습용 정리는 `study/postgresql-rds-rag.md`, `study/board-crud-api.md`에 있습니다.

## 2026-07-05 - Sanctions And Secondary Effects

- Study focus: Study how economic sanctions work as tools of statecraft and how secondary sanctions can influence firms and governments outside the direct dispute. This matters because sanctions connect finance, trade, security policy, and alliance coordination.
- Key questions: What makes sanctions effective or ineffective? How do secondary sanctions change incentives for third-party firms and banks? How do states balance coercion, humanitarian risk, and alliance unity?
- Terms to know: primary sanctions, secondary sanctions, export controls, correspondent banking, compliance risk, sanctions evasion

## 2026-07-07 - Maritime Chokepoints And Supply Chain Security

- Study focus: Study how narrow sea lanes and port networks shape the costs and risks of global trade. This matters because shipping disruptions can connect regional security disputes with inflation, energy prices, inventory planning, and alliance coordination.
- Key questions: Which chokepoints matter most for energy and manufactured goods? How do naval presence, insurance costs, and rerouting decisions affect trade flows? What tools can governments use to reduce supply-chain exposure without overcorrecting?
- Terms to know: chokepoints, sea lines of communication, rerouting, marine insurance, strategic reserves, supply-chain resilience
