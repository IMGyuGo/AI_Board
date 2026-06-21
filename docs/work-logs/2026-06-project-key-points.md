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
