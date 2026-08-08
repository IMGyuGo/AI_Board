# 미국 경제지표 공백일 학습 기록 설계

## 목표

GitHub 기여가 비어 있는 2026년 8월 8일부터 11일까지 하루에 하나씩 미국 경제지표 학습 기록을 추가한다. 기존 `study/` 경제지표 노트와 같은 초보자 친화적 깊이를 유지하며, 각 기록은 AI 미국경제 대시보드가 지표를 수집·해석·요약할 때 필요한 데이터 계약까지 설명한다.

## 날짜별 주제

| 날짜 | 학습 주제 | 파일 |
|---|---|---|
| 2026-08-08 | 미국 주택시장 지표: 건축허가·주택착공·신규주택판매 | `study/us-economic-indicators-housing-market.md` |
| 2026-08-09 | 미국 경기 설문 지표: ISM 제조업·서비스업 PMI | `study/us-economic-indicators-ism-pmi.md` |
| 2026-08-10 | 미국 소비심리 지표: 소비자신뢰지수·미시간대 소비자심리지수 | `study/us-economic-indicators-consumer-sentiment.md` |
| 2026-08-11 | 미국 금융여건 지표: 신용스프레드·SLOOS·NFCI | `study/us-economic-indicators-financial-conditions.md` |

## 문서 구조

각 학습 노트는 다음 구조를 따른다.

1. 학습 목표
2. 지표의 정의와 발표기관
3. 지표 사이의 선행·동행 관계
4. 수치를 읽는 순서
5. 함께 비교할 경제지표
6. AI 대시보드 데이터 계약과 요약 규칙
7. 흔한 오해와 검증 체크리스트
8. 공식 자료 출처

숫자는 시점에 따라 바뀌므로 특정 발표값을 정답처럼 저장하지 않는다. 대신 단위, 기준선, 계절조정, 연율화, 개정 가능성, 조사 기반 지표의 방향성을 명시한다.

## README 연결

루트 `README.md`의 경제지표 학습 기록에 8월 8~11일 항목을 추가한다. 각 항목은 학습 목표, 핵심 질문, 대시보드 적용법, 상세 노트 링크를 포함한다.

## 출처 원칙

- 주택: U.S. Census Bureau / HUD의 New Residential Construction 및 New Residential Sales
- PMI: Institute for Supply Management의 Manufacturing·Services PMI Reports
- 소비심리: The Conference Board의 Consumer Confidence Survey와 University of Michigan Surveys of Consumers
- 금융여건: Federal Reserve의 SLOOS, Chicago Fed의 NFCI, FRED의 회사채 스프레드 계열

해설은 공식 정의를 바탕으로 프로젝트 관점에서 다시 작성하고, 출처 본문을 길게 복사하지 않는다.

## 커밋 설계

각 날짜에는 해당 학습 노트와 README 항목만 포함하는 `docs(study)` 커밋을 하나씩 생성한다. author date와 committer date는 Asia/Seoul 기준으로 동일하게 설정한다.

- 2026-08-08: 주택시장 지표
- 2026-08-09: ISM PMI
- 2026-08-10: 소비심리 지표
- 2026-08-11: 금융여건 지표

설계 문서는 첫 번째 커밋에 포함한다. 마지막 커밋 후 전체 문서 링크, 커밋 날짜, 깨끗한 작업 트리, 원격 브랜치 동기화를 검증한다.

## 범위 밖

- 실시간 경제 수치 수집
- 애플리케이션 코드 또는 데이터베이스 변경
- 특정 시점의 경기·투자 판단
- 사용자의 프롬프트 원문 저장
