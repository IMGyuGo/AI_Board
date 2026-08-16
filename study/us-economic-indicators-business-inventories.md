# 미국 경제지표 학습 노트: 기업재고와 재고판매비율

## 학습 목표

제조·도매·소매의 재고와 판매를 함께 읽어 의도한 축적과 수요 부진에 따른 비의도적 축적을 구분한다.

## 지표의 구성

Census Bureau의 Manufacturing and Trade Inventories and Sales는 제조업 출하, 도매 판매, 소매 판매와 각 부문의 월말 재고를 결합한다.

```text
재고판매비율 = 월말 재고 / 월간 판매
```

비율 1.5는 현재 월 판매 속도를 가정할 때 약 1.5개월분의 재고가 있다는 뜻이다. 기업별 실제 회전기간이나 미래 수요 예측과 정확히 같지는 않다.

| 변화 | 가능한 해석 | 추가 확인 |
| --- | --- | --- |
| 재고↑ 판매↑ | 수요 대응을 위한 계획된 보충 | 신규주문·출하 |
| 재고↑ 판매↓ | 비의도적 축적 가능성 | 가격 할인·생산 조정 |
| 재고↓ 판매↑ | 재고 소진과 공급 제약 가능성 | 배송시간·수입 |
| 재고↓ 판매↓ | 보수적 운영 또는 경기 둔화 | 주문·고용 |

## 읽는 순서

1. 총계보다 제조·도매·소매를 분리한다.
2. 재고와 판매의 방향을 동시에 본다.
3. 재고판매비율이 장기 범위에서 벗어나는지 확인한다.
4. 자동차·에너지 등 가격과 품목 구성 효과를 점검한다.
5. GDP 재고투자 기여, 공장주문, ISM 고객재고와 교차검증한다.

재고 수준이 증가해도 증가 속도가 둔화하면 GDP 성장기여는 낮아질 수 있다. 국민계정의 실질 재고투자와 Census의 명목 월말 재고를 같은 값으로 취급하지 않는다.

## 대시보드 데이터 계약

```text
sector, referenceMonth, releaseDate, inventoryValue, salesValue,
inventorySalesRatio, unit, seasonalAdjustment, priceAdjusted=false,
revisionStatus
```

AI 요약은 재고만 보고 결론내리지 않고 판매·비율·부문별 기여와 가격조정 여부를 함께 밝힌다.

## 흔한 오해와 검증

- 명목 재고 증가를 실제 물량 증가로 단정하지 않는다.
- 총계의 방향을 모든 업종에 일반화하지 않는다.
- 재고축적이 항상 긍정적이거나 항상 부정적이라고 보지 않는다.
- 서로 다른 발표 일정의 제조·도매·소매 빈티지를 기록한다.

## 공식 자료

- U.S. Census Bureau, [MTIS Definitions](https://www.census.gov/econ_file/mtis/definitions.html)
- U.S. Census Bureau, [Latest MTIS Report](https://www.census.gov/mtis/current/index.html)
