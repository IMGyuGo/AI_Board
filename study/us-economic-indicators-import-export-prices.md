# 미국 경제지표 학습 노트: 수입·수출물가지수

## 학습 목표

미국과 해외 사이에서 거래되는 비군사 재화·서비스 가격의 변화를 읽고 환율, 원자재, 해외 생산비가 국내 물가와 교역조건에 전달되는 경로를 구분한다.

## 지표의 범위

BLS International Price Program은 수입가격지수와 수출가격지수를 수정 라스파이레스 방식으로 작성한다. 조사 가격, 행정 무역자료와 교역액 가중치를 이용하며 품질 변화와 순수 가격 변화를 구분하려 한다.

| 지표 | 관점 | 주요 분해 |
| --- | --- | --- |
| Import Price Index | 미국이 해외에서 구매하는 가격 | 연료/비연료, 자본재, 소비재, 산업용 원자재 |
| Export Price Index | 미국 생산자가 해외 판매에서 받는 가격 | 농산물/비농산물, 산업·최종용도 |

수입 물가는 관세가 부과되기 전 또는 계약 조건에 따른 가격을 반영할 수 있으므로 관세가 소비자 가격에 전가된 정도와 동일하지 않다. 환율 전가도 계약 통화와 기업의 마진 조정에 따라 시차가 난다.

## 읽는 순서

1. 전체 수입가격과 연료 제외 수입가격을 비교한다.
2. 수출가격을 농산물과 비농산물로 나눈다.
3. 월간 계절조정 여부와 12개월 비계절조정 변화를 확인한다.
4. 달러 환율, 원유·원자재 가격, 운임과 품목 기여를 본다.
5. CPI, PPI, 무역물량, 기업 마진과 교차검증한다.

수입가격 하락이 달러 강세 때문인지 해외 생산비 하락인지, 수출가격 상승이 미국 기업의 가격 결정력인지 원자재 가격인지 분리해 설명한다.

## 대시보드 데이터 계약

```text
flow=import|export, classification, component, referenceMonth,
releaseDate, indexValue, percentChange, changePeriod,
seasonalAdjustment, tradeWeightVintage, revisionStatus
```

AI는 가격 변화와 무역액 변화를 구분하고 환율과 물가 전이를 단정할 때 계약·품목·시차 근거를 요구한다.

## 흔한 오해와 검증

- 수입가격지수를 수입액이나 수입물량으로 읽지 않는다.
- 연료 급등을 비연료 품목 전반의 물가압력으로 일반화하지 않는다.
- CPI·PPI와 가중치·거래 단계가 다름을 표시한다.
- 지수 기준시점 재설정과 품질조정 여부를 확인한다.

## 공식 자료

- U.S. Bureau of Labor Statistics, [Import/Export Price Indexes](https://www.bls.gov/MXP/)
- U.S. Bureau of Labor Statistics, [MXP Methodology](https://www.bls.gov/mxp/methods.htm)
