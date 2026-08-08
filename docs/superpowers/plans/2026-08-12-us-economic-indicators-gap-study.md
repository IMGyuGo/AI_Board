# 미국 경제지표 공백일 학습 기록 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GitHub 기여가 비어 있는 2026년 8월 8~11일에 대응하는 미국 경제지표 학습 노트 네 개를 작성하고 날짜별 커밋으로 푸시한다.

**Architecture:** 각 날짜는 독립된 Markdown 학습 노트 한 개와 루트 README의 요약 항목 한 개로 구성한다. 시점별 수치 대신 공식 정의, 단위, 해석 순서, 교차검증 지표, AI 대시보드 데이터 계약을 기록해 장기적으로 재사용할 수 있게 한다.

**Tech Stack:** Markdown, Git, GitHub, U.S. Census Bureau/HUD, ISM, The Conference Board, University of Michigan, Federal Reserve, Chicago Fed, FRED

## Global Constraints

- 2026년 8월 8일부터 11일까지 하루에 커밋 하나만 생성한다.
- author date와 committer date는 Asia/Seoul 기준으로 동일하게 설정한다.
- 학습 내용은 한국어로 작성하고 초보자가 읽을 수 있어야 한다.
- 특정 시점의 최신 수치를 정답처럼 저장하지 않는다.
- 공식 발표기관의 정의와 링크를 우선한다.
- 애플리케이션 코드는 변경하지 않는다.
- 사용자의 프롬프트 원문을 저장하지 않는다.

---

### Task 1: 주택시장 지표 학습 기록

**Files:**
- Create: `study/us-economic-indicators-housing-market.md`
- Modify: `README.md`
- Include: `docs/superpowers/specs/2026-08-12-us-economic-indicators-gap-study-design.md`
- Include: `docs/superpowers/plans/2026-08-12-us-economic-indicators-gap-study.md`

**Interfaces:**
- Consumes: Census/HUD New Residential Construction 및 New Residential Sales 정의
- Produces: 건축허가 → 주택착공 → 완공/판매 흐름과 `releaseDate`, `referencePeriod`, `unit`, `seasonalAdjustment`, `annualized`, `revisionStatus` 데이터 계약

- [ ] **Step 1: 학습 노트 작성**

  다음 내용을 별도 절로 작성한다: 건축허가·착공·완공·신규주택판매 정의, SAAR 의미, 단독주택/다세대 구분, 허가에서 착공으로 이어지는 선행 관계, 모기지금리·재고·주택가격 교차검증, 개정치와 표본오차 주의점, AI 요약 체크리스트.

- [ ] **Step 2: README 요약 추가**

  `## 경제지표 학습 기록` 아래에 `### 2026-08-08 - 미국 주택시장 지표`를 추가하고 학습 목표·핵심 질문·대시보드 적용·상세 노트 링크를 기록한다.

- [ ] **Step 3: 문서 검증**

  Run: `rg -n "건축허가|주택착공|신규주택판매|SAAR|revisionStatus" study/us-economic-indicators-housing-market.md README.md`

  Expected: 학습 노트의 핵심 용어와 README 링크가 모두 검색된다.

- [ ] **Step 4: 날짜별 커밋**

  Timestamp: `2026-08-08T20:46:13+09:00`

  Message: `docs(study): 미국 주택시장 지표 학습 내용 추가`

---

### Task 2: ISM PMI 학습 기록

**Files:**
- Create: `study/us-economic-indicators-ism-pmi.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: ISM Manufacturing PMI 및 Services PMI의 확산지수 방법론
- Produces: 기준선 50, 제조업·서비스업 하위지수, 방향과 변화 속도를 구분하는 해석 계약

- [ ] **Step 1: 학습 노트 작성**

  제조업·서비스업 조사 범위, 확산지수와 50 기준선, 신규주문·생산/사업활동·고용·공급자배송·가격 하위지수, 공급자배송의 역방향 해석 주의, 전월차와 3개월 흐름, GDP·산업생산·고용·물가 교차검증을 설명한다.

- [ ] **Step 2: README 요약 추가**

  `### 2026-08-09 - 미국 ISM 제조업·서비스업 PMI` 항목과 상세 노트 링크를 추가한다.

- [ ] **Step 3: 문서 검증**

  Run: `rg -n "확산지수|기준선 50|신규주문|공급자배송|Services PMI" study/us-economic-indicators-ism-pmi.md README.md`

  Expected: PMI의 정의·기준선·핵심 하위지수가 검색된다.

- [ ] **Step 4: 날짜별 커밋**

  Timestamp: `2026-08-09T19:32:47+09:00`

  Message: `docs(study): 미국 ISM PMI 학습 내용 추가`

---

### Task 3: 소비심리 지표 학습 기록

**Files:**
- Create: `study/us-economic-indicators-consumer-sentiment.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: Conference Board Consumer Confidence Survey와 University of Michigan Surveys of Consumers
- Produces: 현재상황·기대·심리·인플레이션 기대를 구분하고 서로 다른 지수 수준을 직접 비교하지 않는 해석 계약

- [ ] **Step 1: 학습 노트 작성**

  Consumer Confidence Index의 Present Situation/Expectations 구성, Michigan의 Current Economic Conditions/Consumer Expectations 구성, 기준연도와 표본·질문 차이, 기대인플레이션, 소매판매·개인소비·실질소득·실업률 교차검증, 방향과 전환점을 우선하는 요약 규칙을 설명한다.

- [ ] **Step 2: README 요약 추가**

  `### 2026-08-10 - 미국 소비자신뢰·소비자심리 지표` 항목과 상세 노트 링크를 추가한다.

- [ ] **Step 3: 문서 검증**

  Run: `rg -n "Present Situation|Expectations|Consumer Sentiment|기대인플레이션|기준연도" study/us-economic-indicators-consumer-sentiment.md README.md`

  Expected: 두 조사 체계의 구성과 직접 수준 비교 금지 규칙이 검색된다.

- [ ] **Step 4: 날짜별 커밋**

  Timestamp: `2026-08-10T21:14:28+09:00`

  Message: `docs(study): 미국 소비심리 지표 학습 내용 추가`

---

### Task 4: 금융여건 지표 학습 기록

**Files:**
- Create: `study/us-economic-indicators-financial-conditions.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: FRED 회사채 스프레드 계열, Federal Reserve SLOOS, Chicago Fed NFCI
- Produces: 시장가격·은행대출태도·종합 금융여건을 함께 읽는 위험/유동성/레버리지 해석 계약

- [ ] **Step 1: 학습 노트 작성**

  회사채 신용스프레드의 국채 대비 추가금리, 투자등급/하이일드 구분, SLOOS의 순긴축·대출수요, NFCI의 0 기준과 양수/음수 방향, 빈도 차이, 정책금리·실질금리·연체율·주가 변동성 교차검증, 이중계산 방지 규칙을 설명한다.

- [ ] **Step 2: README 요약 추가**

  `### 2026-08-11 - 미국 금융여건 지표` 항목과 상세 노트 링크를 추가한다.

- [ ] **Step 3: 문서 검증**

  Run: `rg -n "신용스프레드|SLOOS|순긴축|NFCI|이중계산" study/us-economic-indicators-financial-conditions.md README.md`

  Expected: 세 금융여건 축과 중복 해석 방지 규칙이 검색된다.

- [ ] **Step 4: 날짜별 커밋**

  Timestamp: `2026-08-11T20:27:54+09:00`

  Message: `docs(study): 미국 금융여건 지표 학습 내용 추가`

---

### Task 5: 최종 검증과 푸시

**Files:**
- Verify: `README.md`
- Verify: `study/us-economic-indicators-housing-market.md`
- Verify: `study/us-economic-indicators-ism-pmi.md`
- Verify: `study/us-economic-indicators-consumer-sentiment.md`
- Verify: `study/us-economic-indicators-financial-conditions.md`

**Interfaces:**
- Consumes: 날짜별 네 커밋
- Produces: `origin1/gyugo`에 반영된 깨끗한 작업 트리

- [ ] **Step 1: Markdown와 링크 검증**

  Run: `git diff HEAD~4..HEAD --check`

  Expected: 출력 없음, exit code 0.

- [ ] **Step 2: 커밋 날짜 검증**

  Run: `git log -4 --pretty=format:"%h%x09%aI%x09%cI%x09%s"`

  Expected: 2026-08-08, 09, 10, 11이 각 한 번씩 나오고 author/committer 날짜가 일치한다.

- [ ] **Step 3: 원격 푸시**

  Run: `git push origin1 gyugo:gyugo`

  Expected: 원격 `gyugo`가 마지막 커밋까지 이동한다.

- [ ] **Step 4: 동기화 검증**

  Run: `git rev-list --left-right --count origin1/gyugo...HEAD` 및 `git status --porcelain=v1`

  Expected: ahead/behind `0 0`, 작업 트리 출력 없음.
