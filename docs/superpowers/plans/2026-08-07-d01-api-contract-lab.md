# D01 API Contract Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable D01 specimen that teaches API contracts by comparing the existing Spring `/api/status` response with a NestJS implementation.

**Architecture:** A pnpm workspace separates the intentionally broken lab starter, a tested solution comparator, a shared contract package, and a cumulative NestJS application. Notion explains the exercise and points to the runnable local files; source code remains in Git rather than being copied only into Notion.

**Tech Stack:** Node.js 20+, TypeScript 5, pnpm, Vitest, NestJS 11, Supertest

## Global Constraints

- Do not modify the existing Spring backend.
- The canonical response is `{ "service": "Jungle AI Backend", "status": "running", "message": "Backend API is connected." }`.
- Keep the starter intentionally wrong so the first exercise test fails.
- Keep starter code isolated from the cumulative NestJS application.
- Do not save the user's prompt text.
- Do not commit or push unrelated existing changes.

---

### Task 1: Workspace and shared contract

**Files:**
- Create: `node-transition/package.json`
- Create: `node-transition/pnpm-workspace.yaml`
- Create: `node-transition/tsconfig.base.json`
- Create: `node-transition/packages/contracts/package.json`
- Create: `node-transition/packages/contracts/src/status-contract.ts`
- Test: `node-transition/packages/contracts/test/status-contract.spec.ts`

**Interfaces:**
- Produces: `StatusResponse`, `SPRING_STATUS_RESPONSE`, `compareStatusResponses(actual, expected, ignoredKeys)`

- [ ] Write unit tests for equal objects, a wrong field name, a wrong value, and ignored dynamic keys.
- [ ] Run the tests and confirm they fail because the contract module is absent.
- [ ] Add the smallest contract and recursive comparison implementation.
- [ ] Run the tests and confirm they pass.

### Task 2: Intentionally broken starter and answer

**Files:**
- Create: `node-transition/labs/day-01-api-contract/starter/status-response.ts`
- Create: `node-transition/labs/day-01-api-contract/test/starter.spec.ts`
- Create: `node-transition/labs/day-01-api-contract/solution/compare-live.ts`
- Create: `node-transition/labs/day-01-api-contract/test/solution.spec.ts`
- Create: `node-transition/labs/day-01-api-contract/README.md`

**Interfaces:**
- Starter produces: `makeStatusResponse(): Record<string, unknown>` with an intentionally incorrect `state` key.
- Solution consumes: `compareStatusResponses` from `@node-transition/contracts`.

- [ ] Write a starter test expecting the real Spring response.
- [ ] Run it and confirm the `state` versus `status` mismatch is reported.
- [ ] Keep this test under the explicit `test:starter` command so normal verification remains green.
- [ ] Write solution tests for live-response comparison behavior.
- [ ] Implement a CLI that fetches both `/api/status` endpoints, applies optional ignored keys, prints differences, and exits non-zero on mismatch or connection failure.
- [ ] Run solution tests and confirm they pass.

### Task 3: Cumulative NestJS API

**Files:**
- Create: `node-transition/apps/api-nest/package.json`
- Create: `node-transition/apps/api-nest/src/main.ts`
- Create: `node-transition/apps/api-nest/src/app.module.ts`
- Create: `node-transition/apps/api-nest/src/status.controller.ts`
- Test: `node-transition/apps/api-nest/test/status.e2e.spec.ts`

**Interfaces:**
- Produces: `GET /api/status -> StatusResponse`
- Consumes: `SPRING_STATUS_RESPONSE` from `@node-transition/contracts`

- [ ] Write the E2E test for HTTP 200 and the exact three-field JSON body.
- [ ] Run it and confirm it fails before the controller exists.
- [ ] Add the minimal NestJS module, controller, and bootstrap code.
- [ ] Run the E2E test and confirm it passes.

### Task 4: Beginner guide and evidence

**Files:**
- Create: `node-transition/README.md`
- Create: `node-transition/evidence/day-01/README.md`
- Create: `node-transition/evidence/day-01/spring-response.example.json`
- Create: `node-transition/evidence/day-01/nest-response.example.json`
- Create: `docs/concepts/d01-spring-node-api-contract.md`

**Interfaces:**
- Documents exact commands for install, expected RED, solution tests, E2E tests, development server, and live comparison.

- [ ] Explain every command in beginner language.
- [ ] Mark the starter failure as intentional, not a broken repository.
- [ ] Add the five-sentence evidence template.
- [ ] Document the Spring-to-NestJS mapping and common mistakes.

### Task 5: Notion D01 rewrite and verification

**Files:**
- Update Notion page: `3b434a29-0ded-8155-84fb-d10ede11c9f6`

**Interfaces:**
- Links the learning instructions to `D:\jungleCamp\Projects\AI\node-transition` paths and commands.

- [ ] Replace the inaccurate `UP` example with the actual Spring response.
- [ ] Add the exact RED, GREEN, integration, and live comparison commands.
- [ ] Add expected outputs, hints, solution rules, evidence, and completion criteria.
- [ ] Run `pnpm test:solution`, `pnpm test:app`, and `pnpm build`.
- [ ] Run `pnpm test:starter` separately and confirm it fails for the intentional `state` mismatch.
- [ ] Fetch the Notion page again and confirm the new sections are present.
