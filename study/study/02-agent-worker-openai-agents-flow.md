# 02. Python Agent Worker와 OpenAI Agents 흐름

## 이 단계의 목표

Spring Boot가 Python agent-worker를 호출한 뒤, Python 쪽에서 OpenAI Agents SDK를 어떻게 사용하는지 이해합니다.

## 먼저 알아야 할 IT 개념

- **FastAPI**: Python으로 HTTP API 서버를 만드는 프레임워크입니다.
- **Pydantic schema**: 요청과 응답의 데이터 형태를 검증하는 Python 모델입니다.
- **OpenAI Agents SDK**: Agent, tool, MCP server, structured output을 조합해 AI workflow를 실행하는 도구입니다.
- **structured output**: AI가 자유 문장이 아니라 정해진 JSON 구조로 답하게 만드는 방식입니다.
- **fallback**: 외부 API 키가 없거나 패키지가 없을 때 서비스가 완전히 멈추지 않도록 대체 응답을 주는 방식입니다.

## 이 프로젝트의 관련 코드

- FastAPI 진입점: `agent-worker/app/main.py`
- 요청/응답 schema: `agent-worker/app/schemas.py`
- Agent 실행 로직: `agent-worker/app/service.py`
- evidence 검증: `agent-worker/app/guardrails.py`
- MCP 도구: `agent-worker/app/mcp_server.py`, `agent-worker/app/mcp_tools.py`

## FastAPI 진입점

`agent-worker/app/main.py`는 두 가지 주요 API를 제공합니다.

```text
POST /agent/briefing
POST /agent/chat
```

Spring Boot의 `HttpAgentWorkerClient.java`가 이 endpoint를 호출합니다.
요청에는 `X-Agent-Worker-Token` header가 들어갑니다.
worker는 이 token이 맞는지 확인한 뒤 요청을 처리합니다.

## 요청과 응답 구조

`agent-worker/app/schemas.py`에는 `BriefingRequest`, `BriefingResponse`, `ChatRequest`, `ChatResponse`가 정의되어 있습니다.

중요한 점은 AI 답변에 다음 값들이 포함된다는 것입니다.

- `summary` 또는 `answer`
- `answerStatus`
- `evidenceMetricIds`
- `evidenceEventIds`
- `evidenceNewsIds`
- `evidenceRagChunkIds`
- `evidenceItems`
- `traceSteps`

즉, AI 답변은 그냥 문장 하나가 아니라 "답변 + 근거 + 실행 기록"입니다.

## OpenAI Agents 실행

`agent-worker/app/service.py`에는 두 흐름이 있습니다.

- `run_briefing_agent`
- `run_chat_agent`

브리핑은 dashboard 데이터를 바탕으로 요약을 만듭니다.
채팅은 저장된 run, dashboard, 사용자의 질문을 함께 보고 답합니다.

Agent instructions에는 중요한 규칙이 들어 있습니다.

- 검증된 dashboard와 MCP evidence만 사용합니다.
- 숫자를 지어내지 않습니다.
- RAG의 board post는 공식 데이터가 아니라 사용자 토론 참고자료로 취급합니다.
- 투자 조언은 하지 않습니다.
- 근거가 없으면 `insufficient_evidence` 상태를 반환합니다.

## fallback 흐름

`OPENAI_API_KEY`가 없으면 실제 OpenAI 호출을 하지 않습니다.
이때 worker는 fallback 응답을 반환합니다.

또 `openai-agents` 패키지가 설치되어 있지 않아도 fallback을 반환합니다.
이 설계 덕분에 로컬 개발 환경에서 API 키가 없어도 전체 앱 구조를 테스트할 수 있습니다.

## 코드가 이렇게 구성된 이유

AI workflow는 실패 가능성이 높습니다.
API 키가 없을 수 있고, 네트워크가 끊길 수 있고, 모델 응답이 기대한 schema와 다를 수 있습니다.

그래서 이 프로젝트는 다음 방식으로 안정성을 확보합니다.

- 요청/응답 schema로 데이터 구조를 고정합니다.
- evidence ID를 검증합니다.
- 실패하면 fallback 응답을 저장합니다.
- trace step을 남겨 어떤 guardrail이 작동했는지 보여줍니다.

## 다음에 개발할 수 있는 것

학습용으로 다음 기능을 추가하면 좋습니다.

- Agent 응답에 사용된 MCP tool call을 trace step에 더 자세히 저장
- fallback 사유를 화면에서 더 친절하게 설명
- locale별 Agent instruction을 별도 파일로 분리해 읽기 쉽게 정리

## 직접 확인하는 방법

Python worker 테스트를 실행합니다.

```powershell
cd agent-worker
python -m pytest tests/test_agent_worker.py
```

OpenAI API 키 없이도 fallback 관련 테스트와 도구 변환 테스트를 확인할 수 있습니다.

