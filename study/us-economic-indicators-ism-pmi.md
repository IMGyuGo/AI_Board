# 미국 ISM 제조업·서비스업 PMI 학습 노트

## 학습 목표

ISM PMI는 기업의 구매·공급관리 담당자가 체감하는 활동 방향을 빠르게 보여주는 월간 설문 지표입니다. 이 노트의 목표는 제조업 PMI와 서비스업 PMI의 구성 차이를 이해하고, **수준**, **전월 변화**, **확산 범위**를 분리해 읽는 것입니다.

PMI는 생산량이나 매출액을 직접 합산한 지표가 아닙니다. 응답 기업이 전월보다 상황이 좋아졌는지, 같아졌는지, 나빠졌는지를 묻는 확산지수입니다.

## 발표기관과 조사 방식

Institute for Supply Management(ISM)의 Business Survey Committees가 제조업과 서비스업 공급관리 담당자를 조사해 매월 PMI Reports를 발표합니다.

확산지수의 기본 구조는 다음과 같습니다.

```text
Diffusion Index = 개선 응답 비중 + 0.5 × 동일 응답 비중
```

따라서 응답의 방향과 확산 정도를 요약하지만 증가율의 크기를 직접 뜻하지는 않습니다. PMI가 55라고 해서 생산이 5% 증가했다는 뜻이 아닙니다.

## 기준선 50 읽기

- **50 초과**: 조사 대상 부문에서 개선 또는 확장 응답이 더 넓게 퍼져 있음
- **50 미만**: 악화 또는 위축 응답이 더 넓게 퍼져 있음
- **50 부근**: 개선과 악화 응답이 대체로 균형

수준과 방향은 별개입니다.

```text
52 -> 51: 확장 영역이지만 확장 속도는 둔화
48 -> 49: 위축 영역이지만 위축 속도는 완화
49 -> 51: 위축에서 확장으로 기준선 상향 돌파
```

AI 요약은 `expanding/contracting`과 `accelerating/decelerating`을 따로 판단해야 합니다.

## 제조업 PMI 구성

Manufacturing PMI의 대표 구성요소는 동일 가중치로 결합되는 다음 다섯 지수입니다.

- **New Orders**: 앞으로 생산으로 이어질 신규 주문
- **Production**: 현재 생산 활동
- **Employment**: 제조업 고용 방향
- **Supplier Deliveries**: 공급업체 배송 속도
- **Inventories**: 제조업체 재고 방향

함께 발표되는 Prices, Backlog of Orders, New Export Orders, Imports, Customers' Inventories도 경기 전환을 해석하는 데 유용하지만 PMI 종합지수와 동일한 구성요소는 아닙니다.

### 신규주문과 생산의 조합

- 신규주문과 생산이 함께 50을 넘으면 수요와 현재 활동이 같이 확장되는 신호입니다.
- 신규주문이 먼저 약해지고 생산이 버티면 향후 생산 둔화 가능성을 확인합니다.
- 생산은 약하지만 신규주문이 반등하면 재고 조정 뒤 회복 가능성을 살펴봅니다.

### 재고와 고객재고

제조업체 재고와 고객재고를 구분해야 합니다. 고객재고가 너무 낮다는 응답은 향후 재주문 가능성을 시사할 수 있지만, 최종수요 자료로 확인하기 전에는 확정 신호가 아닙니다.

## 서비스업 PMI 구성

Services PMI는 다음 네 지수를 동일 가중치로 결합합니다.

- **Business Activity**: 서비스업 사업활동
- **New Orders**: 신규 주문
- **Employment**: 고용 방향
- **Supplier Deliveries**: 공급업체 배송 속도

서비스업은 미국 경제에서 비중이 크지만 업종별 성격이 매우 다릅니다. 금융, 정보, 전문서비스, 숙박·음식 등 산업별 응답 방향이 엇갈릴 수 있으므로 종합지수와 산업 코멘트를 함께 읽습니다.

## 공급자배송 지수의 특별한 방향

Supplier Deliveries는 다른 하위지수와 달리 **50 초과가 배송 지연 또는 느려짐**을 뜻합니다. 과거에는 강한 수요가 공급 능력을 압박하는 경우가 많아 종합 PMI에 양의 방향으로 들어갑니다.

하지만 배송 지연의 원인이 항상 수요 호황인 것은 아닙니다.

- 항만 폐쇄와 운송 차질
- 자연재해와 전쟁
- 핵심 부품 부족
- 통관 지연
- 공급망 재편

따라서 공급자배송 상승을 수요 강세로 자동 번역하지 말고 신규주문·생산·가격 지수와 교차검증해야 합니다.

## 수치를 읽는 순서

1. 제조업인지 서비스업인지 구분합니다.
2. 종합지수가 기준선 50의 위인지 아래인지 봅니다.
3. 전월보다 상승했는지 하락했는지 확인합니다.
4. 신규주문이 현재 활동보다 먼저 방향을 바꾸는지 봅니다.
5. 고용지수가 공식 고용지표와 같은 방향인지 확인합니다.
6. 가격지수와 공급자배송으로 물가·공급 압력을 살펴봅니다.
7. 3개월 평균과 확장·위축 지속 개월 수를 기록합니다.
8. 산업별 확산과 응답 코멘트가 종합지수를 뒷받침하는지 확인합니다.

## 함께 비교할 경제지표

- 산업생산과 제조업 생산
- 제조업 신규주문과 내구재 주문
- 비농업고용과 주간 실업수당 청구
- 서비스 소비와 소매판매
- 생산자물가지수와 소비자물가지수
- 지역 연은 제조업 설문
- 실질 GDP와 기업 재고

PMI는 빠르지만 설문 기반입니다. 이후 발표되는 생산·고용·소비의 실제 활동 자료와 방향이 일치하는지 확인해야 합니다.

## AI 대시보드 데이터 계약

```json
{
  "indicator": "ism_pmi",
  "sector": "manufacturing | services",
  "releaseDate": "YYYY-MM-DD",
  "referencePeriod": "YYYY-MM",
  "value": 0,
  "unit": "DIFFUSION_INDEX",
  "threshold": 50,
  "direction": "expanding | contracting | unchanged",
  "momentum": "accelerating | decelerating | stable",
  "seasonalAdjustment": "SA | NSA",
  "source": "ISM"
}
```

하위지수에는 `component`, `value`, `direction`, `monthOverMonthChange`를 저장합니다. 종합지수와 하위지수의 발표 대상월이 같아야 하며, 제조업과 서비스업 값을 한 계열로 이어 붙이지 않습니다.

AI 요약은 다음 순서를 권장합니다.

```text
부문과 기준선 위치
-> 전월 대비 모멘텀
-> 신규주문과 현재 활동
-> 고용과 가격
-> 공급자배송의 원인
-> 실제 활동 자료와 반대 근거
```

## 흔한 오해

- PMI 55를 생산량 5% 증가로 해석하지 않습니다.
- 50 아래에서 상승한 것을 곧바로 경기 확장이라고 부르지 않습니다.
- 50 위에서 하락한 것을 곧바로 경기 위축이라고 부르지 않습니다.
- 공급자배송 상승을 수요 호황으로 자동 해석하지 않습니다.
- 제조업 PMI가 전체 미국 경제를 대표한다고 단정하지 않습니다.
- 설문 응답 코멘트를 계량지표와 같은 무게로 집계하지 않습니다.

## 검증 체크리스트

- [ ] 제조업과 서비스업이 구분되어 있는가?
- [ ] 기준선 50과 전월 변화가 각각 표시되는가?
- [ ] 신규주문과 현재 활동의 시차를 확인했는가?
- [ ] 공급자배송 지수의 방향을 올바르게 읽었는가?
- [ ] 가격과 고용 하위지수를 별도로 보존했는가?
- [ ] 3개월 흐름과 지속 개월 수를 확인했는가?
- [ ] 산업생산·고용·물가와 교차검증했는가?

## 공식 자료

- [ISM - Manufacturing PMI Reports](https://www.ismworld.org/supply-management-news-and-reports/reports/ism-pmi-reports/manufacturing/)
- [ISM - Services PMI Reports](https://www.ismworld.org/supply-management-news-and-reports/reports/ism-pmi-reports/services/)
- [Federal Reserve - Industrial Production and Capacity Utilization](https://www.federalreserve.gov/releases/g17/)
- [U.S. Census Bureau - Manufacturers' Shipments, Inventories, and Orders](https://www.census.gov/manufacturing/m3/)
