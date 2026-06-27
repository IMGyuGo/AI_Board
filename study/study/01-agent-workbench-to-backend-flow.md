# 01. Agent Workbench에서 백엔드까지

## 이 단계의 목표

사용자가 Agent Workbench 화면에서 브리핑을 만들거나 질문을 보낼 때, 프론트엔드와 백엔드가 어떻게 연결되는지 이해합니다.

## 먼저 알아야 할 IT 개념

- **컴포넌트**: React에서 화면의 한 조각을 담당하는 함수입니다.
- **state**: 화면이 기억하는 값입니다. 예를 들어 현재 선택된 Agent, 입력 중인 메시지, 로딩 상태가 있습니다.
- **API client**: 프론트엔드에서 백엔드 API를 호출하는 함수 모음입니다.
- **Controller**: Spring Boot에서 HTTP 요청을 받는 클래스입니다.
- **Service**: 실제 업무 흐름을 처리하는 클래스입니다.
- **Repository**: DB를 읽고 쓰는 클래스입니다.

## 이 프로젝트의 관련 코드

- 화면: `front/src/features/agents/pages/AgentWorkbench.tsx`
- 프론트 API: `front/src/features/agents/api/agents.ts`
- 백엔드 Controller: `backend/src/main/java/com/junglecamp/backend/agent/controller/AgentController.java`
- 백엔드 Service: `backend/src/main/java/com/junglecamp/backend/agent/service/AgentService.java`
- 저장소: `backend/src/main/java/com/junglecamp/backend/agent/repository/AgentRunRepository.java`

## 화면에서 하는 일

`AgentWorkbench.tsx`는 Agent 기능의 첫 화면입니다.
이 파일은 다음 정보를 화면에 표시합니다.

- 저장된 Agent run 목록
- 현재 선택된 run의 요약
- Agent catalog
- 사용자가 보낸 메시지
- AI가 답한 메시지
- evidence ID
- evidence source link
- trace step

버튼을 눌러 새 브리핑을 만들면 `createAgentBriefingRun(locale)`을 호출합니다.
채팅을 보내면 `sendCatalogAgentMessage(agentId, message, runId, locale)`을 호출합니다.

## 프론트 API 함수

`front/src/features/agents/api/agents.ts`는 백엔드 호출을 한 곳에 모아 둔 파일입니다.
예를 들어 채팅은 다음 API로 갑니다.

```text
POST /api/agents/chat
```

브리핑 생성은 다음 API로 갑니다.

```text
POST /api/agents/runs/briefing
```

이 파일이 있으면 화면 컴포넌트는 fetch 세부사항을 몰라도 됩니다.
화면은 "채팅 보내기", "브리핑 만들기", "run 목록 가져오기" 같은 의도만 알면 됩니다.

## 백엔드 Controller

`AgentController.java`는 `/api/agents` 아래 요청을 받습니다.

주요 endpoint는 다음과 같습니다.

- `GET /api/agents/runs`
- `GET /api/agents/runs/{runId}`
- `POST /api/agents/runs/briefing`
- `POST /api/agents/chat`
- `GET /api/agents/catalog`
- `DELETE /api/agents/runs/{runId}`

Controller는 직접 AI를 실행하지 않습니다.
요청을 받은 뒤 `AgentService`에 넘깁니다.

## 백엔드 Service

`AgentService.java`는 Agent 기능의 중심입니다.

이 클래스가 하는 일은 다음과 같습니다.

- 현재 로그인 사용자를 확인합니다.
- 경제 dashboard 데이터를 가져옵니다.
- Agent run을 DB에 생성합니다.
- Python agent-worker에 브리핑이나 채팅 요청을 보냅니다.
- AI 응답의 evidence를 검증합니다.
- 메시지, 근거, trace step을 DB에 저장합니다.
- 저장된 결과를 프론트엔드에 돌려줍니다.

## 저장소

`AgentRunRepository.java`는 DB 테이블을 직접 읽고 씁니다.
여기서 다루는 대표 테이블은 다음과 같습니다.

- `agent_runs`
- `agent_messages`
- `agent_steps`
- `agent_evidence_items`

AI 답변을 단순 문자열로만 저장하지 않고, 메시지와 근거와 trace를 따로 저장하는 것이 중요합니다.
그래야 나중에 "AI가 왜 이렇게 답했는지"를 다시 확인할 수 있습니다.

## 코드가 이렇게 구성된 이유

프론트엔드는 화면 상태에 집중하고, Controller는 HTTP 요청을 받고, Service는 업무 흐름을 관리하고, Repository는 DB 저장을 담당합니다.
이 구조를 나누면 한 파일이 모든 일을 하지 않아도 됩니다.

특히 AI 기능에서는 저장이 중요합니다.
AI 응답만 보여주고 버리면 나중에 검증할 수 없습니다.
이 프로젝트는 run, message, evidence, step을 저장해서 AI 답변을 다시 추적할 수 있게 만들었습니다.

## 다음에 개발할 수 있는 것

학습용으로 다음 기능을 추가하면 좋습니다.

- Agent run 상세 화면에서 trace step을 더 읽기 쉽게 펼쳐 보기
- evidence ID를 클릭하면 어떤 데이터가 근거였는지 설명하는 패널 표시
- 채팅 메시지별로 사용된 MCP tool 목록 표시

## 직접 확인하는 방법

백엔드와 프론트엔드를 실행한 뒤 Agent 탭에서 브리핑을 새로 만들고 질문을 보내면 됩니다.

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

```powershell
cd front
npm.cmd run dev
```

