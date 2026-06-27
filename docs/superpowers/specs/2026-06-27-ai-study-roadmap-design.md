# AI Study Roadmap Design

## Goal

Create a beginner-friendly AI learning path for this project under `study/study/`.
The material should combine tutorial-style explanations with a feature roadmap so the user can learn the current AI code and understand what to build next.

## Context

This project already has a real AI surface:

- `front/src/features/agents/pages/AgentWorkbench.tsx` renders the Agent Workbench.
- `front/src/features/agents/api/agents.ts` calls the backend Agent APIs.
- `backend/src/main/java/com/junglecamp/backend/agent/controller/AgentController.java` exposes Agent run and chat endpoints.
- `backend/src/main/java/com/junglecamp/backend/agent/service/AgentService.java` coordinates dashboard data, saved runs, chat messages, evidence, and guardrails.
- `backend/src/main/java/com/junglecamp/backend/agent/client/HttpAgentWorkerClient.java` calls the Python agent worker.
- `agent-worker/app/service.py` runs OpenAI Agents workflows and returns structured responses.
- `agent-worker/app/mcp_server.py` and `agent-worker/app/mcp_tools.py` expose read-only tools for dashboard data, news, and RAG.
- `backend/src/main/java/com/junglecamp/backend/rag/service/RagIndexService.java` indexes board posts and searches RAG chunks.
- `backend/src/main/java/com/junglecamp/backend/rag/service/OpenAiEmbeddingService.java` creates embedding vectors when an OpenAI API key is available.

## Documentation Shape

Create a nested study folder:

```text
study/study/
  README.md
  00-current-ai-system-map.md
  01-agent-workbench-to-backend-flow.md
  02-agent-worker-openai-agents-flow.md
  03-mcp-tools-and-rag-search.md
  04-embeddings-pgvector-and-evidence.md
  05-ai-feature-roadmap.md
```

Each document should use a consistent learning format:

- What this step teaches
- Concepts to learn first
- Project files to read
- How the code is composed
- What has already been developed
- What to build next
- How to verify or observe the behavior

## Learning Sequence

1. Start from the visible product: the Agent Workbench UI.
2. Follow the frontend API call to Spring Boot.
3. Understand how Spring stores Agent runs, messages, trace steps, and evidence.
4. Follow the worker call into the Python FastAPI app.
5. Understand OpenAI Agents, structured outputs, MCP tools, and strict evidence guardrails.
6. Learn RAG indexing, embeddings, pgvector search, keyword fallback, and evidence links.
7. Use the roadmap to decide the next learning-oriented AI feature.

## Recommended Next Feature

The best next feature for AI learning is a RAG search experiment panel.
It would let the user type a query and inspect which RAG chunks are returned, their scores, source URLs, and why they can be used as Agent evidence.

This feature teaches:

- Semantic search
- Embeddings
- pgvector similarity
- Source citations
- Backend/frontend API contracts
- Guardrail-friendly AI evidence

## Constraints

- Do not save the original user prompt in `docs/prompt-history/` unless the user explicitly approves prompt saving.
- Do not modify application code during this documentation task.
- Keep the study material written in Korean and beginner-friendly.
- Keep file references exact enough that the user can open each relevant code file directly.

