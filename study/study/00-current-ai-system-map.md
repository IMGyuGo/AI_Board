# 00. 현재 AI 시스템 지도

## 이 단계의 목표

현재 프로젝트에서 AI 기능이 어디까지 개발되어 있는지 전체 지도를 잡습니다.
처음부터 세부 코드를 외우려고 하기보다, 어떤 모듈이 어떤 책임을 갖는지 먼저 나눠 보는 것이 좋습니다.

## 먼저 알아야 할 IT 개념

- **Frontend**: 사용자가 보는 화면입니다. 이 프로젝트에서는 React와 Ionic을 사용합니다.
- **Backend**: 데이터를 저장하고 API를 제공하는 서버입니다. 이 프로젝트에서는 Spring Boot를 사용합니다.
- **Agent Worker**: AI 실행을 담당하는 별도 Python 서비스입니다.
- **RAG**: Retrieval-Augmented Generation의 줄임말입니다. AI가 답하기 전에 관련 문서를 검색해서 근거로 쓰는 방식입니다.
- **Evidence**: AI 답변의 근거입니다. 이 프로젝트에서는 metric, event, news, rag chunk ID로 저장됩니다.
- **Guardrail**: AI가 근거 없는 답을 하거나 위험한 출력을 하지 못하게 막는 규칙입니다.

## 현재 개발된 AI 기능

현재 구현된 AI 기능은 크게 네 가지입니다.

1. **Agent Workbench 화면**
   - 사용자가 AI 브리핑을 새로 만들고, Agent를 선택해 질문할 수 있습니다.
   - 관련 코드: `front/src/features/agents/pages/AgentWorkbench.tsx`

2. **Agent 실행 기록 저장**
   - AI 브리핑, 채팅 메시지, 근거, trace step을 DB에 저장합니다.
   - 관련 코드: `backend/src/main/java/com/junglecamp/backend/agent/repository/AgentRunRepository.java`

3. **Python Agent Worker**
   - OpenAI Agents SDK로 구조화된 브리핑과 채팅 답변을 생성합니다.
   - 관련 코드: `agent-worker/app/service.py`

4. **RAG와 MCP 도구**
   - Agent가 경제 지표, FRED snapshot, 뉴스, 게시글 RAG 검색을 도구처럼 호출합니다.
   - 관련 코드: `agent-worker/app/mcp_server.py`, `agent-worker/app/mcp_tools.py`

## 전체 흐름

```text
AgentWorkbench.tsx
-> agents.ts
-> AgentController.java
-> AgentService.java
-> AgentRunRepository.java
-> HttpAgentWorkerClient.java
-> agent-worker/app/main.py
-> agent-worker/app/service.py
-> agent-worker/app/mcp_server.py
-> AgentToolController.java
-> RagIndexService.java
```

이 흐름을 따라가면 "사용자가 버튼을 누른 순간부터 AI 답변이 화면에 다시 표시되기까지"의 전체 경로를 볼 수 있습니다.

## 코드가 이렇게 구성된 이유

AI 기능을 백엔드 안에 모두 넣지 않고 Python worker로 분리한 이유는 역할을 나누기 위해서입니다.

- Spring Boot는 사용자, 인증, DB 저장, 경제 데이터, RAG index를 소유합니다.
- Python worker는 OpenAI Agents 실행, MCP 도구 연결, AI 출력 구조화를 담당합니다.
- Frontend는 결과를 표시하고 사용자의 다음 질문을 받습니다.

이렇게 나누면 AI 실행 방식이 바뀌어도 DB와 사용자 인증 구조를 크게 흔들지 않아도 됩니다.

## 직접 열어 볼 파일

- `front/src/features/agents/pages/AgentWorkbench.tsx`
- `front/src/features/agents/api/agents.ts`
- `backend/src/main/java/com/junglecamp/backend/agent/controller/AgentController.java`
- `backend/src/main/java/com/junglecamp/backend/agent/service/AgentService.java`
- `backend/src/main/java/com/junglecamp/backend/agent/client/HttpAgentWorkerClient.java`
- `agent-worker/app/main.py`
- `agent-worker/app/service.py`
- `agent-worker/app/mcp_server.py`
- `backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java`

## 다음 단계

다음 문서에서는 화면에서 출발해 Spring Boot 백엔드까지 요청이 어떻게 이동하는지 봅니다.

