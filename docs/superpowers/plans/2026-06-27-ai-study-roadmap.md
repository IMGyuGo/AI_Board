# AI Study Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create beginner-friendly AI study documents under `study/study/` that explain the existing project AI flow and recommend the next learning-oriented AI feature.

**Architecture:** This is a documentation-only change. The docs follow the running system from UI to backend to Python agent worker to MCP/RAG/evidence, then turn that understanding into a feature roadmap.

**Tech Stack:** Markdown, React/Ionic frontend, Spring Boot backend, FastAPI agent worker, OpenAI Agents SDK, MCP, PostgreSQL pgvector, RAG.

---

### Task 1: Create Study Index

**Files:**
- Create: `study/study/README.md`

- [ ] Create the nested `study/study/` folder.
- [ ] Add a README that explains the learning path and links to the five study chapters.
- [ ] State that prompt originals are not saved unless the user explicitly approves prompt saving.

### Task 2: Document Current AI System Map

**Files:**
- Create: `study/study/00-current-ai-system-map.md`

- [ ] Explain what AI features already exist in this project.
- [ ] Map UI, frontend API, backend Agent service, Python worker, MCP tools, RAG, embeddings, and evidence storage.
- [ ] List exact files the user should open first.

### Task 3: Document Agent Workbench To Backend Flow

**Files:**
- Create: `study/study/01-agent-workbench-to-backend-flow.md`

- [ ] Explain how `AgentWorkbench.tsx` displays runs, catalog agents, chat messages, evidence links, and trace steps.
- [ ] Explain how `agents.ts` calls `/api/agents/*`.
- [ ] Explain how `AgentController.java`, `AgentService.java`, and `AgentRunRepository.java` work together.

### Task 4: Document Python Agent Worker Flow

**Files:**
- Create: `study/study/02-agent-worker-openai-agents-flow.md`

- [ ] Explain FastAPI endpoints in `agent-worker/app/main.py`.
- [ ] Explain structured request and response schemas in `agent-worker/app/schemas.py`.
- [ ] Explain OpenAI Agents execution in `agent-worker/app/service.py`.
- [ ] Explain fallback behavior when `OPENAI_API_KEY` or `openai-agents` is unavailable.

### Task 5: Document MCP Tools And RAG Search

**Files:**
- Create: `study/study/03-mcp-tools-and-rag-search.md`

- [ ] Explain MCP as the tool boundary used by the Agent.
- [ ] Explain `economic_indicator_search`, `latest_fred_snapshot`, `related_news_search`, and `rag_search`.
- [ ] Explain the Spring internal tool endpoints under `/api/internal/agent-tools`.

### Task 6: Document Embeddings, pgvector, And Evidence

**Files:**
- Create: `study/study/04-embeddings-pgvector-and-evidence.md`

- [ ] Explain board-post indexing into `rag_documents` and `rag_chunks`.
- [ ] Explain OpenAI embeddings and pgvector similarity.
- [ ] Explain keyword fallback.
- [ ] Explain evidence IDs, evidence items, strict evidence validation, and source links.

### Task 7: Document AI Feature Roadmap

**Files:**
- Create: `study/study/05-ai-feature-roadmap.md`

- [ ] Recommend a RAG search experiment panel as the next learning-oriented feature.
- [ ] Explain what concepts the feature teaches.
- [ ] Define a rough backend/frontend implementation path without modifying code now.
- [ ] Add verification commands the user can run when the feature is implemented later.

### Task 8: Verify Documentation

**Files:**
- Read: `study/study/*.md`

- [ ] Confirm all planned files exist.
- [ ] Confirm there are no unfinished placeholder markers.
- [ ] Confirm the docs do not contain the original prompt text.
