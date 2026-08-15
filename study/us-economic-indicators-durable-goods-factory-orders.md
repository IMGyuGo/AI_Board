# 미국 경제지표 학습 노트: 내구재와 공장주문

## 학습 목표

제조업의 신규주문·출하·미처리주문·재고를 연결하고 항공기 같은 대형 운송장비가 헤드라인을 흔드는 효과를 분리한다.

## M3 통계의 흐름

Census Bureau의 Manufacturers' Shipments, Inventories, and Orders(M3)는 제조업 주문 파이프라인을 월간으로 보여준다.

```text
신규주문 -> 미처리주문(backlog) -> 생산 -> 출하
                         \-> 재고
```

| 지표 | 의미 | 주의점 |
| --- | --- | --- |
| Durable Goods New Orders | 통상 3년 이상 사용하는 재화의 신규 구매 의사 | 항공기·국방 주문 변동이 큼 |
| Shipments | 공장에서 판매·출하된 제품 가치 | 주문보다 현재 활동에 가까움 |
| Unfilled Orders | 아직 출하되지 않은 주문 잔액 | 취소·분류 변경 가능 |
| Inventories | 원재료·재공품·완제품 재고 | 명목 금액이며 가격 영향 포함 |

비국방 자본재에서 항공기를 제외한 신규주문은 기업 설비투자 의향의 대용지표로, 같은 범주의 출하는 GDP 장비투자 추정에 더 가까운 신호로 사용된다.

## 읽는 순서

1. 전체 내구재 주문과 운송장비 제외 주문을 비교한다.
2. 국방 포함·제외 및 항공기 제외 핵심 자본재를 구분한다.
3. 신규주문이 출하와 미처리주문으로 이어지는지 본다.
4. 월간 변동을 3개월 평균과 전년비로 완화한다.
5. 산업생산, ISM 신규주문, 설비투자, 재고와 교차검증한다.

## 대시보드 데이터 계약

```text
metric, industryCategory, inclusionRule, referenceMonth, releaseDate,
value, unit=currentDollars, percentChange, seasonalAdjustment,
advanceOrFull, revisionStatus
```

AI는 헤드라인과 `excludingTransportation`, `coreCapitalGoodsOrders`, `coreCapitalGoodsShipments`를 혼용하지 않고 각각의 경제적 역할을 설명한다.

## 흔한 오해와 검증

- 큰 항공기 주문 한 건을 제조업 전반의 회복으로 일반화하지 않는다.
- 명목 주문 증가를 실질 생산량 증가와 동일시하지 않는다.
- 속보 내구재와 이후 전체 제조업 자료의 범위·개정 차이를 표시한다.
- 주문, 출하, 미처리주문을 같은 시점의 활동으로 해석하지 않는다.

## 공식 자료

- U.S. Census Bureau, [M3 Definitions](https://www.census.gov/manufacturing/m3/definitions/index.html)
- U.S. Census Bureau, [Advance Durable Goods Report](https://www.census.gov/manufacturing/m3/adv/current/index.html)
