# 미국 경제지표 학습 노트: 기업이익과 GDI

## 학습 목표

지출 측면 GDP와 소득 측면 GDI를 교차검증하고 국민계정 기업이익을 재무제표 순이익과 구분해 경기의 소득 분배와 기업 수익성을 읽는다.

## GDP와 GDI

생산된 부가가치는 누군가의 소득이므로 국민계정에서 GDP와 GDI는 개념적으로 같다. 그러나 서로 다른 원자료와 추정 시점 때문에 발표치에는 통계상 괴리가 생긴다.

```text
GDP: 소비 + 투자 + 정부지출 + 순수출
GDI: 근로자 보수 + 기업이익 + 사업소득 + 임대소득 + 순이자 + 세금·조정
```

GDP와 GDI가 엇갈리면 한쪽을 즉시 오류로 단정하지 않고 두 계열의 개정, 평균 성장률과 통계상 괴리를 확인한다.

## 국민계정 기업이익

BEA의 current-production profits는 현재 생산에서 기업에 귀속된 소득이다. 세전이익에 재고평가조정(IVA)과 자본소비조정(CCAdj)을 적용해 재고와 감가상각을 국민계정의 현재비용 개념에 맞춘다.

| 측정치 | 의미 |
| --- | --- |
| Profits from Current Production | IVA·CCAdj가 반영된 생산 일관 기업이익 |
| Profits Before Tax | 세금 차감 전 장부 기반 이익과 가까운 출발점 |
| Net Cash Flow | 이익과 감가상각 등을 반영한 내부자금 지표 |
| Domestic / Rest of World | 국내 산업 발생분과 해외 관련 소득 구분 |

기업이익과 GDI는 GDP 속보치와 동시에 항상 나오지 않는다. 원자료가 부족한 첫 추정에서는 발표되지 않고 이후 추정·연례 개정에서 큰 폭으로 바뀔 수 있다.

## 읽는 순서

1. 명목 GDI와 실질 GDI, 성장률 기간을 구분한다.
2. GDP·GDI 성장 방향과 통계상 괴리를 비교한다.
3. 기업이익의 IVA·CCAdj 포함 여부를 확인한다.
4. 국내 금융·비금융·해외 관련 이익을 나눈다.
5. 임금, 단위노동비용, 마진, 세금, 현금흐름과 교차검증한다.

## 대시보드 데이터 계약

```text
metric, accountingBasis, adjustmentType, geography, sector,
referenceQuarter, releaseDate, estimateRound, value, unit,
annualized, priceAdjusted, revisionStatus, vintageDate
```

AI는 상장기업 실적과 경제 전체 기업이익을 혼용하지 않고 발표 차수와 조정 기준을 근거에 포함한다.

## 흔한 오해와 검증

- GDP와 GDI의 단기 차이를 경제 회계의 영구적 불일치로 해석하지 않는다.
- BEA 기업이익을 S&P 500 순이익과 동일시하지 않는다.
- 명목 이익 증가에서 물가와 산업 구성을 분리한다.
- 속보 GDP에 기업이익이 없다는 사실을 데이터 누락으로 오인하지 않는다.

## 공식 자료

- U.S. Bureau of Economic Analysis, [Corporate Profits](https://www.bea.gov/data/income-saving/corporate-profits)
- U.S. Bureau of Economic Analysis, [GDP Release Additional Information](https://www.bea.gov/news/gdp-release-additional-information)
- U.S. Bureau of Economic Analysis, [NIPA Handbook](https://www.bea.gov/resources/methodologies/nipa-handbook)
