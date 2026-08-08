# 미국 주택시장 지표 학습 노트

## 학습 목표

미국 주택시장은 금리 변화가 실물경제에 전달되는 대표적인 경로입니다. 이 노트의 목표는 건축허가, 주택착공, 완공, 신규주택판매를 하나의 공급 파이프라인으로 읽고, 발표 수치의 단위와 개정 여부까지 보존하는 것입니다.

핵심은 한 달 수치의 상승·하락만 보는 것이 아니라 다음 순서를 구분하는 데 있습니다.

```text
건축허가 -> 주택착공 -> 건설 중 -> 완공 -> 판매와 재고 변화
```

## 발표기관과 조사 범위

미국 Census Bureau와 Department of Housing and Urban Development(HUD)가 New Residential Construction 통계를 공동 발표합니다. 주요 자료는 Building Permits Survey와 Survey of Construction에서 나옵니다.

New Residential Construction은 민간 소유 신규 주거 건물의 다음 단계를 다룹니다.

- **Building Permits**: 건축 또는 용도 허가를 받아 건설할 수 있게 된 주택 수
- **Housing Starts**: 기초나 기초판 공사가 시작된 주택 수
- **Under Construction**: 착공했지만 아직 완공되지 않은 주택 수
- **Housing Completions**: 주택이 완공된 수
- **New Residential Sales**: 신규 단독주택의 판매 계약 또는 계약금 수령이 발생한 수

신규주택판매는 거래가 최종 종결된 시점이 아니라 계약 체결 시점을 기준으로 잡을 수 있습니다. 기존주택판매와 조사 범위도 다르므로 두 통계를 하나의 계열처럼 합치면 안 됩니다.

## SAAR를 먼저 확인하기

보도자료의 대표 수치는 대개 **SAAR(Seasonally Adjusted Annual Rate, 계절조정 연율)**입니다. 이는 해당 월의 실제 주택 수가 아니라 계절성을 조정한 월간 속도가 1년 동안 이어진다고 가정한 연율입니다.

예를 들어 SAAR 150만 호를 다음처럼 잘못 읽으면 안 됩니다.

```text
잘못된 해석: 그 달에 150만 호가 착공됐다.
올바른 해석: 그 달의 계절조정 착공 속도를 연간 기준으로 환산하면 150만 호 수준이다.
```

대시보드는 원자료 값과 함께 `unit=SAAR_THOUSANDS` 또는 이에 준하는 단위를 저장해야 합니다. 월간 실제 건수, 비계절조정 값, 연율을 혼합하면 변화율이 왜곡됩니다.

## 지표 사이의 선행 관계

### 1. 건축허가

허가는 실제 착공보다 앞단에 있어 미래 건설 활동의 선행 신호로 사용됩니다. 다만 허가가 모두 착공으로 이어지는 것은 아닙니다. 금융비용, 자재비, 수요 전망이 나빠지면 허가 후 착공이 지연되거나 취소될 수 있습니다.

### 2. 주택착공

착공은 실제 건설 활동이 시작됐다는 신호입니다. 건설업 고용, 목재·금속·가전 수요와 연결되므로 주거투자의 현재 모멘텀을 보여줍니다. 월별 변동성과 표본오차가 크기 때문에 단일 월보다 3개월 이동평균과 전년 동월 흐름을 함께 봅니다.

### 3. 완공과 판매

완공은 공급이 시장에 도착하는 후행 단계입니다. 신규주택판매와 판매용 재고, 판매까지 걸리는 개월 수를 함께 보면 수요가 공급을 흡수하는 속도를 판단할 수 있습니다.

## 단독주택과 다세대주택 분리

전체 주택 수만 보면 시장의 구조가 가려질 수 있습니다.

- **Single-family**: 자가 수요와 모기지금리의 영향을 비교적 직접 받습니다.
- **Multifamily**: 임대 수요, 개발금융, 대도시 공급 사이클의 영향을 크게 받습니다.

다세대 착공의 큰 폭 변동이 전체 수치를 움직였는데 단독주택까지 같은 방향이라고 요약하면 잘못된 판단이 됩니다. AI 요약은 전체, 단독주택, 5가구 이상 건물의 방향을 분리해야 합니다.

## 수치를 읽는 순서

1. 발표일과 대상월(`referencePeriod`)을 구분합니다.
2. 값이 SAAR인지 실제 월간 건수인지 확인합니다.
3. 전월치가 얼마나 개정됐는지 확인합니다.
4. 전체와 단독주택·다세대주택을 분리합니다.
5. 전월 대비, 전년 대비, 3개월 평균을 함께 봅니다.
6. 허가와 착공의 방향이 일치하는지 확인합니다.
7. 완공·판매·재고가 수요 흡수 속도와 맞는지 확인합니다.

## 함께 비교할 경제지표

- 30년 고정 모기지금리와 미국 국채금리
- 주택담보대출 신청 지수
- 건설업 고용과 주당 근로시간
- 주거용 건설지출
- 신규주택 판매용 재고와 공급 개월 수
- 기존주택판매와 주택가격 지수
- 주택건설업체 심리지수

금리가 상승한 직후에는 기존 주택 보유자가 낮은 고정금리를 포기하지 않는 잠금 효과가 나타날 수 있습니다. 이때 기존주택 매물이 줄고 신규주택이 상대적으로 강해질 수 있으므로 신규·기존 판매를 함께 읽어야 합니다.

## AI 대시보드 데이터 계약

주택 지표는 최소한 다음 메타데이터를 보존해야 합니다.

```json
{
  "indicator": "housing_starts",
  "releaseDate": "YYYY-MM-DD",
  "referencePeriod": "YYYY-MM",
  "value": 0,
  "unit": "SAAR_THOUSANDS",
  "seasonalAdjustment": "SA",
  "annualized": true,
  "housingType": "total | single_family | multifamily_5_plus",
  "revisionStatus": "advance | revised | final",
  "source": "US_CENSUS_HUD"
}
```

AI 요약은 다음 정보를 문장에 포함해야 합니다.

- 현재 방향과 3개월 추세
- 이전 발표치의 개정 방향
- 단독주택과 다세대주택 중 변화의 주도 부문
- 허가·착공·완공·판매 사이의 일치 또는 불일치
- 모기지금리와 재고가 제공하는 반대 근거

## 흔한 오해

- SAAR를 그 달의 실제 주택 수로 읽지 않습니다.
- 허가 증가를 미래 착공 증가로 확정하지 않습니다.
- 전체 착공만 보고 단독주택도 같은 방향이라고 가정하지 않습니다.
- 신규주택판매와 기존주택판매의 모집단과 집계 시점을 혼합하지 않습니다.
- 속보치의 큰 전월 변화를 개정치 확인 없이 구조적 전환으로 부르지 않습니다.

## 검증 체크리스트

- [ ] 발표일과 대상월이 분리되어 있는가?
- [ ] SAAR와 실제 건수가 구분되어 있는가?
- [ ] 이전 값과 최신 개정치가 함께 저장되어 있는가?
- [ ] 단독주택과 다세대주택을 분리했는가?
- [ ] 허가, 착공, 완공, 판매의 단계가 뒤섞이지 않았는가?
- [ ] 모기지금리, 재고, 가격과 교차검증했는가?
- [ ] AI 요약이 불확실성과 반대 근거를 표시하는가?

## 공식 자료

- [U.S. Census Bureau - New Residential Construction](https://www.census.gov/construction/nrc/index.html)
- [U.S. Census Bureau - Survey of Construction](https://www.census.gov/construction/soc/index.html)
- [U.S. Census Bureau - Survey of Construction Definitions](https://www.census.gov/construction/soc/definitions.html)
- [U.S. Census Bureau - New Residential Sales](https://www.census.gov/construction/nrs/index.html)
- [FRED - 30-Year Fixed Rate Mortgage Average in the United States](https://fred.stlouisfed.org/series/MORTGAGE30US)
