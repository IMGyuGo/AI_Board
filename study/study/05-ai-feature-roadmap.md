# 05. AI 기능 개발 로드맵

## 이 단계의 목표

현재 AI 코드를 이해한 뒤, 학습 효과가 큰 다음 기능을 스스로 선택해 개발할 수 있도록 로드맵을 정리합니다.

## 현재 기준으로 가장 좋은 다음 기능

추천 기능은 **RAG 검색 실험 패널**입니다.

이 기능은 사용자가 검색어를 입력하면 다음 정보를 화면에 보여줍니다.

- 검색어
- 검색된 RAG chunk 목록
- source type
- source URL
- snippet
- score
- Agent evidence로 쓸 수 있는지 여부

## 왜 이 기능이 좋은가

이 프로젝트의 AI 핵심은 "답변 생성"보다 "근거 있는 답변 생성"입니다.
RAG 검색 실험 패널을 만들면 AI 답변 전에 어떤 근거가 검색되는지 직접 볼 수 있습니다.

학습 효과가 큰 이유는 다음과 같습니다.

- 프론트엔드에서 검색어 입력과 결과 표시를 배웁니다.
- 백엔드에서 내부 RAG 검색 API를 안전하게 노출하는 방법을 배웁니다.
- RAG result와 evidence item의 차이를 이해합니다.
- embedding과 keyword fallback의 차이를 체감합니다.
- Agent가 왜 어떤 답변을 할 수 있고 어떤 답변은 거절해야 하는지 이해합니다.

## 알아야 할 IT 개념

- React state
- API client 함수
- Spring REST Controller
- Service와 DTO
- 인증된 사용자용 API와 내부 worker용 API의 차이
- RAG
- embedding
- pgvector
- source citation
- guardrail
- test coverage

## 예상 구현 방향

### 1단계: 백엔드 공개 학습용 RAG endpoint 추가

현재 `/api/internal/agent-tools/rag-search`는 agent-worker token이 있어야 호출할 수 있습니다.
학습용 화면에서는 로그인 사용자만 호출할 수 있는 별도 endpoint를 만드는 것이 좋습니다.

예상 endpoint:

```text
GET /api/agents/rag-lab/search?query={query}&limit=5
```

이 endpoint는 내부 token을 요구하지 않고, 로그인한 사용자에게만 허용합니다.
응답은 `RagSearchResponse`를 재사용하거나 학습용 DTO로 감쌉니다.

### 2단계: 프론트 API 함수 추가

예상 파일:

```text
front/src/features/agents/api/agents.ts
```

추가할 함수:

```text
searchAgentRagLab(query, limit)
```

이 함수는 RAG 실험 패널에서 사용합니다.

### 3단계: Agent Workbench에 RAG Lab 섹션 추가

예상 파일:

```text
front/src/features/agents/pages/AgentWorkbench.tsx
front/src/features/agents/pages/AgentWorkbench.css
```

처음에는 작은 섹션으로 충분합니다.

- input
- search button
- result list
- score 표시
- source link

### 4단계: 검증 추가

백엔드 테스트:

```powershell
cd backend
.\mvnw.cmd -Dtest=ApiIntegrationTests test
```

프론트엔드 검증:

```powershell
cd front
npm.cmd run lint
npm.cmd run build
```

agent-worker 검증:

```powershell
cd agent-worker
python -m pytest tests/test_agent_worker.py
```

## 이 기능을 만들 때 주의할 점

- 내부 worker token이 필요한 API를 브라우저에서 직접 호출하게 만들지 않습니다.
- source URL 없는 결과는 evidence처럼 보이게 하지 않습니다.
- score는 절대적인 정답률이 아니라 검색 유사도라고 설명해야 합니다.
- RAG 게시글은 공식 경제 데이터가 아니라 사용자 토론 자료로 표시해야 합니다.
- 검색 결과가 없을 때도 실패가 아니라 "근거 부족" 상태로 보여줘야 합니다.

## 이후 확장 후보

RAG 검색 실험 패널 다음에는 이런 기능이 좋습니다.

1. **Agent Tool Trace Viewer**
   - AI 답변마다 어떤 MCP tool을 호출했는지 보여줍니다.

2. **Evidence Detail Drawer**
   - evidence ID를 클릭하면 원본 metric, event, news, RAG chunk를 자세히 보여줍니다.

3. **Prompt And Instruction Viewer**
   - 실제 user prompt 원문은 저장하지 않고, Agent instruction과 tool policy만 학습용으로 보여줍니다.

4. **RAG Chunking 개선**
   - 긴 게시글을 문단 단위 chunk로 나누고 검색 품질을 비교합니다.

5. **Evaluation Set**
   - 자주 묻는 질문과 기대 evidence를 모아 Agent 답변 품질을 반복 검증합니다.

## 최종 학습 목표

이 로드맵의 목표는 "AI API 한 번 호출하기"가 아닙니다.
목표는 다음 질문에 스스로 답할 수 있게 되는 것입니다.

```text
이 AI 답변은 어떤 데이터에서 왔고,
어떤 도구를 거쳤고,
어떤 근거로 검증되었고,
근거가 부족할 때 왜 답변을 거절하는가?
```

이 질문에 답할 수 있으면 이 프로젝트의 AI 구조를 제대로 이해한 것입니다.

