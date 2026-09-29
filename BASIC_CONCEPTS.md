# 프로젝트로 배우는 아주 쉬운 기초 개념 5가지

작성일: 2026-09-29

미국 경제 대시보드를 읽기 전에 알아두면 좋은 개념을 정리했습니다. 먼저 쉬운 설명을 읽고, 궁금할 때 연결된 코드를 열어보세요. 아래 확인 방법은 학습용 안내이며, 이번 문서 작성 중 앱을 실행하거나 기능 테스트를 수행했다는 뜻은 아닙니다.

## 1. HTTP와 API: 화면이 서버에 부탁하는 방법

**한 줄 개념:** HTTP는 요청과 응답을 주고받는 통신 규칙이고, API는 프로그램이 다른 프로그램의 기능을 사용하는 약속입니다. 이 프로젝트는 HTTP를 사용하는 웹 API로 데이터를 주고받습니다.

식당에서 손님이 메뉴를 주문하면 주방이 음식을 내줍니다. 비슷하게 브라우저는 서버에 데이터를 요청하고, 서버는 결과를 응답합니다. API에는 어떤 주소로 무엇을 요청하며 어떤 모양의 결과를 받을지 정해져 있습니다.

이 프로젝트에서 경제지표를 가져오는 요청은 다음과 같습니다.

```text
화면 → GET /api/us-economy/dashboard → 서버 → JSON 응답 → 화면에 표시
```

`GET`은 조회를 뜻하는 HTTP 메서드입니다. JSON은 데이터를 전달하는 텍스트 형식입니다. 예를 들어 `{"name":"예시 지표","value":100}`처럼 이름과 값을 짝지어 표현합니다. 이 예시는 형식 설명용이며 실제 API 응답 전체가 아닙니다.

- 프로젝트 코드: [프론트 API 함수](front/src/features/economy/api/economy.ts)의 `fetchEconomyDashboard`, [서버 Controller](backend/src/main/java/com/junglecamp/backend/economy/controller/UsEconomyDashboardController.java)의 `dashboard`.
- 직접 확인: 앱이 실행된 상태에서 개발자 도구의 Network를 열고 대시보드를 새로고침합니다. `dashboard` 요청의 주소, 상태 코드, 응답 내용을 확인합니다.
- 기억할 점: 화면이 열려도 데이터 요청은 실패할 수 있습니다. 요청 실패와 화면 표시 문제를 나눠 살펴보세요.
- 확인 질문: 화면에 보이는 숫자는 HTML에 고정되어 있을까요, API 응답으로 전달됐을까요?

참고: [MDN HTTP 개요](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

## 2. 데이터베이스와 트랜잭션: 함께 끝나야 하는 일을 묶기

**한 줄 개념:** 데이터베이스는 데이터를 저장하고 찾아 쓰는 곳이고, 트랜잭션은 여러 변경을 하나의 작업으로 묶는 방법입니다.

친구에게 돈을 보내는 상황을 생각해 보세요. 내 잔액은 줄었는데 친구 잔액은 늘지 않으면 문제가 됩니다. 두 변경이 함께 반영되거나, 실패하면 둘 다 반영되지 않아야 합니다. 이처럼 중간 결과만 남지 않게 하는 성질을 원자성이라고 합니다.

트랜잭션에서 `COMMIT`은 변경을 확정하고, `ROLLBACK`은 해당 트랜잭션의 변경을 취소합니다. 여기서 COMMIT은 Git 커밋이 아니라 데이터베이스 용어입니다.

이 프로젝트의 게시글 삭제는 게시글을 삭제 상태로 바꾸거나 숨긴 뒤, AI 검색용 자료에서도 제거합니다. `deletePost`의 `@Transactional`은 이런 데이터 변경을 하나의 트랜잭션으로 다루기 위한 선언입니다.

- 프로젝트 코드: [게시글 서비스](backend/src/main/java/com/junglecamp/backend/board/service/BoardPostService.java)의 `deletePost`, [검색 자료 관리](backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java)의 `deleteBoardPost`.
- 직접 확인: 두 메서드를 열어 게시글 상태 변경과 검색 자료 삭제가 어떤 순서로 호출되는지 따라갑니다.
- 기억할 점: 트랜잭션은 외부 API 호출이나 이미 발송된 이메일까지 되돌려 주지 않습니다. 예외 처리 방식과 트랜잭션 설정도 실제 취소 여부에 영향을 줍니다.
- 확인 질문: 게시글만 숨기고 검색 자료를 남기면 어떤 문제가 생길까요?

참고: [PostgreSQL 16 트랜잭션 설명](https://www.postgresql.org/docs/16/tutorial-transactions.html)

## 3. 캐시: 매번 다시 구하지 않고 저장한 결과 쓰기

**한 줄 개념:** 캐시는 다시 필요할 데이터를 저장해 두었다가 재사용하는 방법입니다.

친구의 전화번호가 필요할 때마다 물어보지 않고 연락처에 저장해 두는 것과 비슷합니다. 다시 물어보는 수고는 줄지만, 번호가 바뀌면 저장된 내용도 고쳐야 합니다.

이 프로젝트는 외부에서 수집한 경제지표와 생성한 브리프를 DB에 저장하고, 대시보드 조회에서 저장된 결과를 읽습니다. 같은 자료를 반복 요청하는 비용을 줄일 수 있지만, 데이터가 얼마나 오래됐는지와 언제 갱신할지도 중요합니다.

- 프로젝트 코드: [대시보드 서비스](backend/src/main/java/com/junglecamp/backend/economy/service/EconomyDashboardService.java)의 `findLatestMetrics`, `findLatestBrief` 호출.
- 직접 확인: 같은 파일에서 `refreshInBackground`와 `refreshIfStale`도 찾습니다. 오류 상태인 브리프와 오래된 환율의 갱신을 요청하는 예외 경로입니다.
- 기억할 점: 캐시는 반드시 메모리에만 두는 것이 아닙니다. 이 프로젝트는 DB의 저장 결과도 재사용합니다. 브라우저의 HTTP 캐시와 서버가 DB에 저장하는 캐시는 서로 다른 계층의 기능입니다.
- 확인 질문: 화면을 빨리 보여주는 것과 가장 최신 데이터를 보여주는 것 사이에는 어떤 선택이 필요할까요?

참고: [MDN HTTP 캐시](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching). 캐시의 재사용과 갱신 개념을 읽기 위한 자료이며, 프로젝트의 DB 저장 로직은 위 코드에서 확인합니다.

## 4. 인증과 권한: 누구인지와 무엇을 해도 되는지

**한 줄 개념:** 인증은 사용자가 누구인지 확인하는 것이고, 인가는 그 사용자가 해당 작업을 해도 되는지 판단하는 것입니다. 인가를 권한 확인이라고 생각하면 쉽습니다.

회사 출입증으로 본인을 확인하는 것이 인증이라면, 그 출입증으로 서버실에 들어갈 수 있는지 확인하는 것이 인가입니다. 출입증이 있다고 모든 방에 들어갈 수 있는 것은 아닙니다.

이 프로젝트는 공개 대시보드 조회를 로그인 없이 허용하지만, 관리자 API는 관리자 역할을 요구합니다. 게시글 수정과 삭제에서는 작성자 등 허용된 사용자에 해당하는지도 따로 확인합니다.

- 프로젝트 코드: [보안 설정](backend/src/main/java/com/junglecamp/backend/config/SecurityConfig.java)의 `permitAll`, `authenticated`, `hasRole("ADMIN")`, [게시글 서비스](backend/src/main/java/com/junglecamp/backend/board/service/BoardPostService.java)의 `requireOwner` 호출.
- 직접 확인: 보안 설정에서 공개 대시보드 주소와 `/api/admin/**`에 적용된 규칙을 비교합니다.
- 기억할 점: 화면에서 버튼을 숨기는 것만으로 권한이 보호되지는 않습니다. 서버도 요청을 받을 때 권한을 검사해야 합니다.
- 확인 질문: 로그인한 사용자가 다른 사람의 게시글을 마음대로 지워도 될까요?

참고: [Spring Security 인증](https://docs.spring.io/spring-security/reference/features/authentication/index.html), [Spring Security 인가](https://docs.spring.io/spring-security/reference/features/authorization/index.html)

## 5. RAG: AI가 자료를 찾아보고 답하게 하기

**한 줄 개념:** RAG는 질문과 관련된 자료를 검색하고, 그 자료를 AI에게 함께 전달해 답변을 만들게 하는 방식입니다.

책을 덮고 기억만으로 답하는 대신, 관련 페이지를 찾아 펼쳐 놓고 답하는 오픈북 시험을 떠올리면 쉽습니다. 다만 엉뚱한 페이지를 찾거나 내용을 잘못 읽으면 답은 여전히 틀릴 수 있습니다.

```text
질문 → 관련 자료 검색 → 질문과 자료를 AI에 전달 → 답변과 근거 확인
```

이 프로젝트는 경제 토론 게시글을 검색 자료로 저장합니다. 문장을 숫자 목록으로 표현한 임베딩을 이용해 관련 자료를 찾고, 임베딩이 없거나 벡터 검색 결과가 비면 키워드 검색으로 이어집니다. 임베딩은 문장을 의미에 따라 비교하기 위한 표현이라고 이해하면 됩니다.

- 프로젝트 코드: [검색 서비스](backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java)의 `indexBoardPost`, `search`.
- 직접 확인: `search`에서 `vectorSearch` 결과를 반환하는 조건과 `keywordSearch`로 넘어가는 조건을 읽습니다.
- 기억할 점: 검색 점수는 정답률이 아닙니다. 사용자 토론과 공식 경제 통계도 구분해야 합니다. RAG를 쓴다고 답변이 자동으로 사실이 되지는 않습니다.
- 확인 질문: 관련된 글을 찾았다는 것과 답변을 뒷받침할 근거를 찾았다는 것은 어떻게 다를까요?

참고: [Microsoft Learn RAG 개요](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview). 일반 개념 참고 자료이며 이 프로젝트가 Azure AI Search를 사용한다는 뜻은 아닙니다.

## 다섯 문장으로 복습하기

1. API는 화면과 서버가 무엇을 주고받을지 정한 약속이다.
2. 트랜잭션은 함께 처리해야 할 데이터 변경을 하나로 묶는다.
3. 캐시는 저장한 결과를 재사용하되 언제 갱신할지 정해야 한다.
4. 인증은 누구인지, 인가는 무엇을 해도 되는지 확인한다.
5. RAG는 자료를 검색해 AI에 전달하는 방식이며 근거 검증은 여전히 필요하다.
