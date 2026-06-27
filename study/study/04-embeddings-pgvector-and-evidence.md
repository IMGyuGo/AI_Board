# 04. 임베딩, pgvector, 근거 검증

## 이 단계의 목표

게시글이 RAG 검색 가능한 데이터로 저장되고, Agent 답변의 근거로 검증되는 과정을 이해합니다.

## 먼저 알아야 할 IT 개념

- **Embedding**: 문장을 숫자 벡터로 바꾼 값입니다. 의미가 비슷한 문장은 벡터도 비슷해집니다.
- **Vector search**: 벡터 사이의 거리를 비교해서 의미가 비슷한 문서를 찾는 검색입니다.
- **pgvector**: PostgreSQL에서 vector 타입과 similarity 검색을 사용할 수 있게 하는 확장입니다.
- **Cosine similarity**: 두 벡터의 방향이 얼마나 비슷한지 계산하는 방식입니다.
- **Keyword fallback**: vector 검색이 불가능할 때 단어 포함 여부로 검색하는 대체 방식입니다.
- **Evidence validation**: AI가 사용한 근거 ID가 실제 source URL이 있는 데이터인지 확인하는 절차입니다.

## 이 프로젝트의 관련 코드

- RAG index: `backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java`
- OpenAI embedding: `backend/src/main/java/com/junglecamp/backend/rag/service/OpenAiEmbeddingService.java`
- RAG DTO: `backend/src/main/java/com/junglecamp/backend/rag/dto/RagDtos.java`
- DB schema: `backend/src/main/resources/db/migration/V1__create_board_and_rag_schema.sql`
- Agent evidence 검증: `backend/src/main/java/com/junglecamp/backend/agent/service/AgentService.java`
- Python guardrail: `agent-worker/app/guardrails.py`
- Tool evidence 검증: `agent-worker/app/mcp_tools.py`

## 게시글 indexing 흐름

게시글이 생성되거나 수정되면 `RagIndexService.indexBoardPost(post)`가 호출됩니다.

흐름은 다음과 같습니다.

```text
BoardPost
-> title + content 결합
-> rag_documents 저장
-> rag_chunks 저장
-> OpenAiEmbeddingService로 embedding 생성 시도
-> rag_chunks.embedding 업데이트
-> rag_index_jobs에 success 기록
```

현재 chunking은 단순합니다.
게시글 하나를 하나의 chunk로 저장합니다.
나중에 긴 글이 많아지면 문단 단위나 token 수 기준으로 나누는 기능을 개발할 수 있습니다.

## embedding 생성

`OpenAiEmbeddingService.java`는 OpenAI Embeddings API를 호출합니다.

기본 모델은 다음 설정을 사용합니다.

```text
app.rag.embedding-model=text-embedding-3-small
```

API key가 없거나 호출에 실패하면 embedding을 만들지 않습니다.
이때도 앱은 멈추지 않고 keyword fallback 검색을 사용할 수 있습니다.

## pgvector 검색

검색할 때 `RagIndexService.search(query, sourceTypes, limit)`는 먼저 query embedding을 만들려고 합니다.
embedding이 있으면 pgvector similarity 검색을 시도합니다.

핵심 아이디어는 다음과 같습니다.

```text
질문 embedding과 chunk embedding의 거리가 가까울수록 관련성이 높다.
```

PostgreSQL에서 pgvector가 지원되지 않거나 테스트 DB처럼 vector SQL을 사용할 수 없는 경우에는 Java 메모리에서 cosine similarity를 계산하는 fallback도 있습니다.

## keyword fallback

embedding이 없으면 keyword 검색을 사용합니다.
검색어의 단어들이 title과 content에 포함되는지 보고 score를 계산합니다.

이 방식은 semantic search보다 단순하지만, API key가 없는 로컬 환경에서도 기능을 확인할 수 있게 해 줍니다.

## evidence 검증

AI 답변은 근거 ID를 함께 반환합니다.
하지만 모델이 잘못된 ID를 만들어낼 수 있으므로 검증이 필요합니다.

Spring 쪽 `AgentService.java`는 다음을 확인합니다.

- metric ID가 실제 dashboard metric이고 source URL이 있는가
- event ID가 실제 dashboard event이고 source URL이 있는가
- news ID가 evidence item에 있고 source URL이 있는가
- rag chunk ID가 evidence item에 있고 source URL이 있는가

Python 쪽에서도 `guardrails.py`, `mcp_tools.py`가 비슷한 검증을 합니다.

## 코드가 이렇게 구성된 이유

AI 답변의 신뢰도는 "문장이 자연스러운가"보다 "근거가 검증 가능한가"가 더 중요합니다.
이 프로젝트는 답변과 근거를 분리해 저장하고, source URL이 없는 근거는 통과시키지 않습니다.

그래서 Agent는 다음 규칙을 갖습니다.

- 숫자를 지어내지 않습니다.
- 근거 ID가 없으면 확정 답변을 하지 않습니다.
- RAG 게시글은 공식 데이터가 아니라 관련 토론 자료로 표시합니다.

## 다음에 개발할 수 있는 것

학습용 개발 후보는 다음과 같습니다.

- RAG chunk를 문단 단위로 나누는 chunker
- pgvector HNSW 또는 IVFFlat index 추가
- RAG 검색 결과를 화면에서 직접 실험하는 패널
- evidence 검증 실패 사유를 사용자에게 설명하는 UI

## 직접 확인하는 방법

백엔드 테스트 중 RAG 관련 테스트를 확인합니다.

```powershell
cd backend
.\mvnw.cmd -Dtest=ApiIntegrationTests#indexesBoardPostsForInternalRagSearch test
```

```powershell
cd backend
.\mvnw.cmd -Dtest=ApiIntegrationTests#agentRagSearchPrefersVectorSimilarDiscussionPosts test
```

