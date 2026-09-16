# 실제 실행 화면 캡처

2026-09-16 KST에 저장소의 실제 애플리케이션을 로컬에서 실행해 촬영했습니다. 화면과 API 응답을 목업으로 대체하거나 표시 문구를 편집하지 않았습니다.

## 화면과 경로

| 이미지 | 실제 화면 경로 | 해상도 | 확인 내용 |
| --- | --- | --- | --- |
| [dashboard.png](dashboard.png) | `/home` | 1600 × 1300 | 실제 FRED 지표 12개, 한국수출입은행 환율 23개, 기준일과 출처 |
| [discussion.png](discussion.png) | `/home?view=discussion&postId=21` | 1600 × 1180 | 샘플 게시글 상세, 댓글 9개의 페이지 탐색, 작성·필터 UI |
| [agent-workbench.png](agent-workbench.png) | `/home?view=agent` | 1600 × 1000 | 근거 지표 5개, 역할별 Agent 4개, 브리핑 실행 이력 1개 |

테마는 light, 언어는 한국어, 브라우저는 설치된 Chrome입니다. Playwright로 실제 경로를 열고 데이터 로딩과 폰트 준비가 끝난 뒤 PNG로 저장했습니다. 공개용 화면에는 캡처용 로컬 일반 사용자 `경제리뷰어`를 사용했습니다. 로그인은 실제 `/api/auth/login` API를 거쳤습니다. 개인 계정이나 이메일 발송은 사용하지 않았습니다.

## 데이터와 AI 응답의 구분

- 경제 지표와 환율은 실제 외부 API를 통해 수집한 DB 데이터입니다. 화면의 수치·기준일은 캡처 시점의 결과이며 이후 달라질 수 있습니다.
- 게시글과 댓글은 Flyway migration의 AI 생성 샘플입니다. 실제 사용자의 토론 활동이나 운영 실적으로 제시하지 않습니다.
- 홈의 OpenAI 브리프 생성은 API 크레딧 부족 응답으로 실패했습니다. 이후 규칙 기반 fallback이 표시됐습니다.
- 현재 홈 UI는 이 경우에도 `OpenAI API 키 미설정`으로 표시합니다. 실행 로그에서 확인한 원인은 키 누락이 아닌 크레딧 부족입니다. 이 상태 표시의 구분은 후속 개선 대상입니다.
- Agent Worker의 `/agent/briefing`은 200을 반환했고 실행 기록이 저장됐습니다. 실행 단계는 `guardrail=fallback-boundary`, `result=fallback`, `action=Reuse verified dashboard brief.`입니다. `completed` 상태만으로 새 AI 생성 성공을 판단하면 안 됩니다.
- 이 환경에서 Worker의 MCP `/mcp/` 호출은 404로 기록됐습니다. 새로 설치한 Python 의존성 조합과 MCP 경로 호환성을 추가 확인해야 하며, 이번 캡처로 도구 호출이나 RAG 기반 신규 답변의 정상 작동을 입증하지 않습니다.

## 실행과 검증 결과

- Java 21 + Maven 3.9.16: `mvn -Dmaven.repo.local=.m2/repository -DskipTests package` 성공. 이 명령에서는 테스트를 건너뛰었습니다.
- `docker version --format '{{.Server.Version}}'`: Docker 엔진 29.7.2 확인.
- `scripts/start-local-postgres.ps1`: PostgreSQL 16 + pgvector 컨테이너 생성·실행. 초기 준비 이후 `pg_isready -U jungle -d jungle_ai`에서 accepting connections 확인.
- Spring Boot JAR 실행: 8080 포트 기동 및 실제 DB 연결 확인.
- Vite 개발 서버: 5173 포트 기동, 실제 `/api` proxy를 통해 백엔드와 연결.
- Python Worker: 8090 포트 기동 확인.
- `POST /api/auth/login`: 캡처용 계정으로 200.
- `GET /api/us-economy/dashboard`: 지표 12개·환율 23개, `brief.generationStatus=fallback:no-openai-key` 확인.
- `POST /api/agents/runs/briefing`: 200, fallback 실행 단계와 이력 저장 확인.
- 최종 촬영 직전 화면 텍스트를 로컬 환경 파일의 비밀값과 대조했습니다. 공개할 3개 화면에서 일치하는 비밀값이 없음을 확인했습니다.
- 이번 작업은 문서·이미지 추가이며 애플리케이션 소스 코드는 변경하지 않았습니다. 전체 단위·통합 테스트를 재실행한 결과로 제시하지 않습니다.

## 공개 캡처에서 제외한 화면

CPI 상세의 외부 원천 비교 오류 메시지에 API 키 문자열이 그대로 포함되는 문제가 확인돼 해당 이미지는 공개 산출물에서 제외했습니다. 외부 API 오류 메시지를 사용자 화면에 전달하기 전에 비밀값을 제거하는 처리가 후속 과제입니다. 원문 오류와 해당 이미지는 이 폴더나 Git에 포함하지 않았습니다.

## 재촬영 방법

1. 루트 README의 실행 절차에 따라 DB, Spring, Vite와 필요 시 Worker를 실행합니다.
2. 개인 정보가 없는 로컬 데모 계정으로 로그인합니다.
3. 위 화면 경로를 열고 데이터 로딩이 끝났는지 확인합니다. `postId`는 해당 로컬 DB의 샘플 글 ID에 맞춥니다.
4. 표의 해상도와 라이트 테마에서 브라우저 화면을 PNG로 촬영합니다.
5. 실제 데이터인지 샘플인지, AI 실행이 생성 성공인지 fallback인지 확인합니다. 비밀값·개인정보를 검사한 뒤 이미지와 이 문서를 함께 갱신합니다.
