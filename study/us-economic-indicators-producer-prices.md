# 미국 경제지표 학습 노트: 생산자물가지수 PPI

## 학습 목표

생산자가 받는 판매가격의 변화를 최종수요와 중간수요 단계로 나눠 읽고 CPI·PCE로의 비용 전가 가능성과 차이를 설명한다.

## PPI의 범위

BLS PPI는 미국 국내 생산자가 산출물 판매에서 받는 가격의 평균 변화를 측정한다. 구매자가 지불하는 생활비를 측정하는 CPI와 관점이 다르다.

| 구분 | 의미 |
| --- | --- |
| Final Demand | 개인소비, 자본투자, 정부, 수출에 판매되는 재화·서비스·건설 |
| Intermediate Demand by Type | 기업 투입물의 미가공재·가공재·서비스·건설 |
| Intermediate Demand by Production Flow | 생산 흐름을 네 단계로 배열한 비용 압력 |

헤드라인 최종수요, 식품·에너지·무역서비스 제외 지표, 재화와 서비스, 중간수요 단계를 함께 보되 “근원”의 제외 범위를 명시한다. 무역서비스 지수는 판매가격 자체가 아니라 도소매 마진 변화를 반영한다.

## 읽는 순서

1. 지수 수준이 아니라 월간·연간 변화율을 확인한다.
2. 계절조정 월간 변화와 비계절조정 전년비를 구분한다.
3. 재화·서비스·에너지·식품·무역 마진의 기여를 나눈다.
4. 중간수요 압력이 생산 단계 전반에 확산되는지 본다.
5. CPI, 수입물가, 임금, 단위노동비용, 기업 마진과 교차검증한다.

PPI 상승이 CPI 상승으로 기계적으로 이어지지는 않는다. 기업은 비용을 가격에 전가하거나 마진으로 흡수할 수 있고, 두 지표의 품목·가중치·거래 단계도 다르다.

## 대시보드 데이터 계약

```text
seriesId, demandStage, component, referenceMonth, releaseDate,
indexValue, percentChange, changePeriod, seasonalAdjustment,
relativeImportance, preliminary, revisionStatus
```

AI 요약은 헤드라인 방향, 핵심 기여 품목, 중간 단계 확산, 소비자물가와 다른 근거를 순서대로 제시한다.

## 흔한 오해와 검증

- PPI를 소비자의 장바구니 물가로 부르지 않는다.
- 최종수요와 중간수요 구성요소를 중복 합산하지 않는다.
- 에너지 한 품목의 급변과 광범위한 가격 압력을 구분한다.
- 예비치와 가중치 갱신 여부를 저장한다.

## 공식 자료

- U.S. Bureau of Labor Statistics, [Producer Price Index FAQ](https://www.bls.gov/ppi/faqs/questions-and-answers.htm)
- U.S. Bureau of Labor Statistics, [Final Demand-Intermediate Demand System](https://www.bls.gov/ppi/fd-id/)
