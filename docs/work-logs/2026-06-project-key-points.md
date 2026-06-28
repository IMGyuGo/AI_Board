# 2026-06 Project Key Points

이 문서는 프로젝트의 중요한 결정과 구현 축을 날짜별로 압축 정리한다.
목표는 "AI가 읽는 미국경제 대시보드" 프로젝트의 흐름을 나중에 빠르게 복기할 수 있게 만드는 것이다.

프롬프트 원문은 저장하지 않았다. 이 문서는 프로젝트 상태와 구현 개념만 요약한다.

## 2026-06-19 - API 계약과 앱 구조

- 프로젝트의 중심 구조는 Spring Boot 백엔드, Ionic React 프론트엔드, Python agent-worker가 역할을 나눠 갖는 방식이다.
- 백엔드는 인증, 경제 데이터, 게시판, Agent run 저장, RAG 검색, 관리자 기능의 기준 API를 제공한다.
- 프론트엔드는 `front/src/features/*` 단위로 화면과 API 호출을 묶어 기능별 변경 범위를 좁힌다.
- API 계약은 문서와 테스트로 같이 고정한다. `/api/status`, `/api/me`, `/api/us-economy/dashboard`, `/api/agents/*` 같은 경계가 앱 전체의 연결 지점이다.
- 중요한 포인트는 "화면이 직접 외부 API나 AI 키를 다루지 않는다"는 점이다. 브라우저는 백엔드 계약을 읽고, 백엔드가 데이터 출처와 인증 경계를 책임진다.

## 2026-06-20 - 경제 데이터 캐시와 출처 관리

- 미국경제 대시보드는 FRED, Korea Eximbank, OpenAI brief를 한 화면에서 다루지만, 숫자와 설명의 책임을 분리한다.
- FRED 계열 지표는 백엔드 sync 서비스가 가져와 PostgreSQL/Flyway cache table에 저장하고, 프론트는 `/api/us-economy/dashboard`만 읽는다.
- OpenAI는 metric 값을 만들지 않고, 이미 저장된 지표와 이벤트를 근거로 brief 문장을 생성하는 역할만 맡는다.
- API 응답은 metric마다 source name, source URL, base date, previous value, change, change percent를 포함해 사용자가 숫자의 출처를 추적할 수 있게 한다.
- 이 구조의 핵심은 cache-first 읽기다. 외부 API나 OpenAI가 잠시 실패해도 대시보드가 완전히 멈추지 않고, fallback 상태를 명확히 보여준다.

## 2026-06-21 - AI 브리프 근거 정책

- AI 브리프는 대시보드의 해석층이며, 원천 데이터층이 아니다.
- `OpenAiBriefService`는 저장된 metric과 이벤트를 기반으로 요약, 위험 요인, 한국 영향, 근거 ID를 생성한다.
- OpenAI 호출 실패 또는 키 누락 상황에서는 `RuleBasedBriefFactory`가 안전한 fallback 문장을 반환하고, 실패 fallback을 generated brief처럼 영구 저장하지 않는다.
- 다국어 brief도 locale별로 직접 생성하고, 특정 locale 생성이 실패하면 기존의 generated brief를 덮어쓰지 않는다.
- 중요한 원칙은 "AI 문장은 반드시 검증 가능한 metric/event와 연결되어야 한다"는 것이다. 이 원칙 덕분에 대시보드가 설명형 UI가 되면서도 출처 추적 가능성을 잃지 않는다.

## 2026-06-22 - Agent 워크벤치 경계

- Agent 기능은 프론트 화면, Spring Agent API, Python worker, OpenAI Agents SDK가 순서대로 이어지는 구조다.
- Spring은 사용자, 세션, run/message/evidence 저장의 기준 시스템이고, Python worker는 실제 Agent 실행과 MCP 도구 연결을 맡는다.
- 프론트의 Agent 탭은 열리는 순간 자동 생성하지 않고, 사용자가 명시적으로 Agent 생성이나 chat을 실행할 때만 worker 호출로 이어진다.
- Agent 답변은 `agent_runs`, `agent_messages`, `agent_steps`, `agent_evidence_items`에 저장되어 나중에 어떤 근거와 도구 호출로 답했는지 추적할 수 있다.
- 이 경계는 프로젝트가 AI 기능을 붙이면서도 운영 데이터와 사용자 권한을 Java 백엔드 안에서 일관되게 관리하게 해준다.

## 2026-06-23 - 토론 RAG 검색 구조

- 게시판은 단순 CRUD에서 경제 토론 피드와 RAG 원천 데이터로 확장되었다.
- 게시글은 `rag_documents`, `rag_chunks`로 인덱싱되고, embedding이 있으면 pgvector 유사도 검색을 우선 사용한다.
- Python worker의 `DiscussionRetriever`는 Spring 내부 RAG API를 LangChain 스타일 retriever로 감싸 Agent 도구에서 쓰기 쉽게 만든다.
- 숨김 처리된 게시글은 사용자 화면과 RAG 검색 모두에서 제외되어, Agent가 삭제/숨김 처리된 커뮤니티 콘텐츠를 근거로 삼지 않게 한다.
- 이 구조의 의미는 토론 데이터를 "공식 지표"가 아니라 "사용자 작성 맥락"으로 다루는 데 있다. Agent는 관련 토론을 참고할 수 있지만, 경제 지표의 공식 출처와는 구분해서 표시해야 한다.

## 2026-06-24 - 인증과 보호 workspace

- 공개 홈은 계정 없이 읽을 수 있지만, 토론 작성, 개인화, Agent 실행, 알림, 관리자 기능은 인증된 사용자 경계 안에 둔다.
- 로컬 JWT 인증은 access/refresh token을 HttpOnly cookie로 발급하고, refresh token은 DB에 hash 형태로 저장한 뒤 rotation한다.
- Google OAuth2 로그인도 같은 현재 사용자 모델로 이어지도록 맞춰 프론트가 인증 방식을 별도로 분기하지 않게 한다.
- mutating API는 `X-XSRF-TOKEN`을 요구해 cookie 기반 인증에서 생길 수 있는 CSRF 위험을 줄인다.
- 이 설계의 핵심은 공유 가능한 경제 대시보드와 개인 작업공간을 나누는 것이다. 정보 공개성과 사용자 데이터 보호를 동시에 만족시키는 기준선이다.

## 2026-06-26 - 배포와 운영 검증 포인트

- 배포 설계는 GitHub Actions, GitHub OIDC, Amazon ECR, Amazon ECS Fargate, CloudWatch Logs를 기준으로 잡았다.
- GitHub Actions는 AWS access key를 저장하기보다 OIDC로 배포 역할을 Assume하고, backend Docker image를 ECR에 push한 뒤 ECS service를 새 task definition으로 갱신한다.
- 운영 문서는 ALB smoke test, `HEALTH_CHECK_URL`, ECS service 안정화 대기, CloudWatch 로그 확인 지점을 함께 다룬다.
- 로컬 검증은 backend test, frontend lint/build, agent-worker pytest처럼 각 실행 단위별로 나눠 둔다.
- 이 프로젝트의 배포 핵심은 "자동화가 성공했는지"보다 "실패했을 때 어느 층을 보면 되는지"를 문서화하는 것이다. CI, image, task definition, service, health check를 분리해서 봐야 복구가 빠르다.

## 2026-06-28 - AI 학습 로드맵과 후속 과제

- `study/study/` 문서는 현재 AI 시스템을 초보자도 따라갈 수 있게 UI, Spring API, Python worker, MCP, RAG, evidence 순서로 풀어내는 학습 경로다.
- 첫 학습 목표는 "Agent가 답한다"가 아니라 "어떤 파일과 API가 어떤 책임을 갖는지"를 이해하는 것이다.
- 다음 학습용 기능 후보는 RAG 검색 실험 패널이다. 사용자가 검색어를 넣으면 어떤 chunk가 선택되고 score가 어떻게 보이는지 직접 확인할 수 있다.
- 이 기능은 REST API 계약, 프론트 상태 관리, embedding, pgvector similarity, source citation, guardrail을 한 번에 익히기 좋다.
- 장기적으로는 저장된 `agent_steps`와 evidence를 기반으로 Agent 답변 품질을 평가하는 eval 데이터셋을 만들 수 있다. 그러면 프로젝트가 단순 앱을 넘어 AI 기능을 실험하고 검증하는 작업대가 된다.
