# 03. MCP 도구와 RAG 검색

## 이 단계의 목표

Agent가 직접 DB를 만지는 것이 아니라 MCP 도구를 통해 필요한 정보만 조회하는 구조를 이해합니다.

## 먼저 알아야 할 IT 개념

- **Tool**: AI가 답변을 만들기 위해 호출할 수 있는 함수입니다.
- **MCP**: Model Context Protocol입니다. 모델이 외부 도구를 일관된 방식으로 사용할 수 있게 해 주는 경계입니다.
- **Internal API**: 외부 사용자가 아니라 내부 서비스끼리 호출하는 API입니다.
- **RAG search**: 질문과 관련 있는 문서 조각을 찾아 AI 답변의 근거로 쓰는 검색입니다.

## 이 프로젝트의 관련 코드

- MCP server: `agent-worker/app/mcp_server.py`
- MCP tool 구현: `agent-worker/app/mcp_tools.py`
- Spring 내부 도구 API: `backend/src/main/java/com/junglecamp/backend/agent/controller/AgentToolController.java`
- RAG 검색 서비스: `backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java`
- LangChain 호환 retriever: `agent-worker/app/discussion_retriever.py`

## 제공되는 MCP 도구

현재 agent-worker는 다음 도구를 제공합니다.

```text
economic_indicator_search
latest_fred_snapshot
related_news_search
rag_search
```

각 도구의 역할은 다릅니다.

- `economic_indicator_search`: dashboard에 있는 지표, 이벤트, 리포트 메타데이터를 검색합니다.
- `latest_fred_snapshot`: FRED 기반 최신 경제 지표 snapshot을 가져옵니다.
- `related_news_search`: GDELT에서 관련 뉴스를 검색하고 source URL이 있는 news evidence를 만듭니다.
- `rag_search`: Spring RAG index를 검색하고 RAG evidence item을 만듭니다.

## Spring 내부 도구 API

`AgentToolController.java`는 `/api/internal/agent-tools` 아래 API를 제공합니다.

```text
GET /api/internal/agent-tools/indicators
GET /api/internal/agent-tools/fred-snapshot
GET /api/internal/agent-tools/dashboard-catalog
GET /api/internal/agent-tools/rag-search
```

이 API들은 `X-Agent-Worker-Token`이 맞아야 호출할 수 있습니다.
즉, 일반 브라우저 사용자가 마음대로 호출하는 공개 API가 아니라 agent-worker가 쓰는 내부 API입니다.

## RAG 검색 흐름

`rag_search`의 흐름은 다음과 같습니다.

```text
Agent
-> MCP rag_search tool
-> agent-worker/app/mcp_tools.py
-> Spring /api/internal/agent-tools/rag-search
-> RagIndexService.search()
-> rag_chunks 검색
-> evidence item으로 변환
-> Agent 답변에 근거로 포함
```

`DiscussionRetriever`는 Spring에서 받은 RAG 결과를 LangChain `Document`처럼 다룰 수 있게 감쌉니다.
이 덕분에 Python 쪽 Agent 도구는 Spring의 DB 구조를 직접 몰라도 됩니다.

## 코드가 이렇게 구성된 이유

AI Agent에게 모든 권한을 주면 위험합니다.
그래서 이 프로젝트는 Agent가 정해진 읽기 도구만 호출하도록 제한합니다.

이 구조의 장점은 다음과 같습니다.

- Agent가 DB에 직접 쓰지 않습니다.
- Spring이 데이터 접근 권한과 필터링을 유지합니다.
- Python worker는 AI orchestration에 집중합니다.
- evidence item 형태가 일정하게 유지됩니다.

## 다음에 개발할 수 있는 것

학습용으로 가장 좋은 다음 기능은 **MCP 도구 호출 관찰 화면**입니다.
사용자가 질문했을 때 Agent가 어떤 tool을 호출했고, 어떤 결과를 받았는지 볼 수 있으면 AI workflow가 훨씬 잘 보입니다.

다만 첫 개발 후보로는 더 작은 기능인 **RAG 검색 실험 패널**을 추천합니다.

## 직접 확인하는 방법

백엔드가 실행 중이고 agent-worker token이 맞다면 내부 RAG endpoint를 확인할 수 있습니다.

```text
GET /api/internal/agent-tools/rag-search?query=CPI&sourceTypes=BOARD_POST&limit=3
```

브라우저에서 바로 호출하면 token이 없어서 실패하는 것이 정상입니다.
agent-worker나 테스트 코드를 통해 token을 넣고 호출해야 합니다.

