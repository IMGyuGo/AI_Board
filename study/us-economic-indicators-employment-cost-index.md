# 미국 경제지표 학습 노트: 고용비용지수 ECI

## 학습 목표

임금뿐 아니라 사용자 부담 복리후생까지 포함한 노동비용의 변화를 읽고, 고용 구성 변화에 민감한 평균시간당임금과 구분한다.

## ECI가 측정하는 것

BLS의 Employment Cost Index(ECI)는 사용자가 부담하는 시간당 노동비용의 변화를 분기별로 측정한다. 산업·직종별 고용 구성을 고정해 저임금·고임금 일자리 비중 변화가 지수에 미치는 영향을 줄인다.

| 구성 | 포함 내용 | 해석 |
| --- | --- | --- |
| Total Compensation | 임금·급여와 복리후생 | 전체 노동비용 압력 |
| Wages and Salaries | 기본급, 수당, 인센티브 등 | 현금 보상의 변화 |
| Benefits | 보험, 퇴직, 유급휴가, 법정 부담 등 | 급여 외 사용자 비용 |

민간, 주·지방정부, 전체 민간 비연방 근로자를 구분한다. ECI는 비용의 변화율을 보여주는 지수이며 시간당 달러 비용 수준은 ECEC와 역할이 다르다.

## 읽는 순서

1. 전분기 대비 계절조정 변화와 12개월 비계절조정 변화를 구분한다.
2. 총보상을 임금·급여와 복리후생으로 나눈다.
3. 민간과 주·지방정부, 산업·직종별 확산을 확인한다.
4. 평균시간당임금과 차이가 고용 구성 때문인지 점검한다.
5. 생산성, 단위노동비용, CPI·PCE, 구인·퇴직률과 교차검증한다.

ECI 상승이 곧바로 같은 폭의 소비자물가 상승을 뜻하지 않는다. 생산성, 기업 마진, 비노동 투입비용과 가격 결정력이 비용 전가를 바꾼다.

## 대시보드 데이터 계약

```text
seriesId, ownership, industry, occupation, compensationComponent,
referenceQuarter, releaseDate, indexValue, percentChange,
changePeriod, seasonalAdjustment, revisionStatus
```

AI 요약은 지수와 달러 수준을 혼용하지 않고 총보상 변화가 임금과 복리후생 중 어디에서 왔는지 설명한다.

## 흔한 오해와 검증

- ECI를 근로자가 실제 받는 평균 임금 수준으로 읽지 않는다.
- 전분기 연율과 단순 전분기 변화율을 혼동하지 않는다.
- 민간과 공공의 산업·직종 구성이 다름을 표시한다.
- 계절조정 계열의 연례 개정 여부를 보존한다.

## 공식 자료

- U.S. Bureau of Labor Statistics, [ECI Handbook Overview](https://www.bls.gov/opub/hom/eci/home.htm)
- U.S. Bureau of Labor Statistics, [Understanding ECI Index Numbers](https://www.bls.gov/eci/factsheets/understanding-index-numbers-and-percent-changes-factsheet.htm)
