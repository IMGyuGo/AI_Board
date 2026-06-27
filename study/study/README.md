# AI 학습 로드맵

이 폴더는 현재 프로젝트의 AI 기능을 배우기 위한 전용 학습 공간입니다.
목표는 코드를 추상적으로 설명하는 것이 아니라, 실제 파일을 열어 보면서 "이 기능이 왜 이렇게 만들어졌는지"를 하나씩 이해하는 것입니다.

프롬프트 원문은 저장하지 않았습니다. 이 프로젝트 규칙상 사용자가 명확히 승인한 경우에만 `docs/prompt-history/`에 프롬프트 원문을 저장합니다.

## 먼저 보는 순서

1. [현재 AI 시스템 지도](00-current-ai-system-map.md)
2. [Agent Workbench에서 백엔드까지](01-agent-workbench-to-backend-flow.md)
3. [Python Agent Worker와 OpenAI Agents 흐름](02-agent-worker-openai-agents-flow.md)
4. [MCP 도구와 RAG 검색](03-mcp-tools-and-rag-search.md)
5. [임베딩, pgvector, 근거 검증](04-embeddings-pgvector-and-evidence.md)
6. [AI 기능 개발 로드맵](05-ai-feature-roadmap.md)

## 이 학습의 큰 그림

현재 프로젝트의 AI 기능은 다음 흐름으로 움직입니다.

```text
사용자 화면
-> React Agent Workbench
-> Spring Boot Agent API
-> Agent run/message/evidence 저장
-> Python FastAPI agent-worker
-> OpenAI Agents SDK
-> MCP 도구 호출
-> Spring 내부 경제 데이터/RAG 검색
-> 근거가 있는 답변만 저장하고 화면에 표시
```

처음에는 "AI가 답변한다" 정도로 보이지만, 실제 코드는 여러 안전장치를 둡니다.
AI가 아무 숫자나 말하지 않도록 dashboard 데이터, RAG 검색 결과, source URL, evidence ID를 확인합니다.

## 앞으로 만들면 좋은 학습용 기능

다음 개발 후보는 **RAG 검색 실험 패널**입니다.
사용자가 검색어를 입력하면 어떤 게시글 chunk가 검색되는지, score가 얼마인지, Agent 답변의 evidence로 쓸 수 있는지 화면에서 직접 확인하는 기능입니다.

이 기능을 만들면 다음 개념을 한 번에 배울 수 있습니다.

- REST API 계약
- 프론트엔드 상태 관리
- RAG
- embedding
- pgvector similarity
- source citation
- guardrail
- Agent evidence

