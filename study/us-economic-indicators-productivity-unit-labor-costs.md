# 미국 경제지표 학습 노트: 생산성과 단위노동비용

## 학습 목표

산출, 노동시간, 보수의 관계로 노동생산성과 단위노동비용을 읽고 임금 상승과 물가 압력을 기계적으로 동일시하지 않는다.

## 기본 관계

BLS의 노동생산성은 산출을 노동시간으로 나눈 값이고 단위노동비용은 한 단위 산출을 만드는 데 필요한 노동보수다.

```text
노동생산성 = 실질 산출 / 총 노동시간
단위노동비용 = 시간당 보수 / 노동생산성
```

시간당 보수가 올라도 생산성이 더 빠르게 오르면 단위노동비용 압력은 낮아질 수 있다. 반대로 임금 상승이 완만해도 생산성이 하락하면 단위 비용은 높아질 수 있다.

| 지표 | 의미 | 주의점 |
| --- | --- | --- |
| Labor Productivity | 노동시간당 실질 산출 | 기술만이 아니라 자본·구성·경기 영향 포함 |
| Output | 대상 부문의 실질 생산 | GDP 전체와 부문 범위가 다를 수 있음 |
| Hours Worked | 근로자·자영업자의 총 노동투입 | 고용자 수와 다름 |
| Hourly Compensation | 임금과 사용자 부담 급여를 포함한 보수 | 평균시간당임금과 범위가 다름 |
| Unit Labor Costs | 산출 한 단위당 노동비용 | 기업 마진·비노동비용은 별도 |

## 읽는 순서

1. 분기 전기 대비 연율인지 전년비인지 확인한다.
2. 생산성 변화가 산출과 노동시간 중 어디서 왔는지 나눈다.
3. 시간당 보수와 생산성의 상대 속도로 단위노동비용을 설명한다.
4. 최근 분기 변동보다 여러 분기 추세와 개정을 본다.
5. GDP, 고용, 임금, PPI, 기업이익과 교차검증한다.

## 대시보드 데이터 계약

```text
sector, referenceQuarter, releaseDate, metric, growthRate,
changePeriod, annualized, seasonalAdjustment, preliminary,
revisionStatus, benchmarkVintage
```

AI는 산식의 두 구성요소를 함께 제시하고 생산성의 한 분기 급등을 구조적 기술혁신으로 단정하지 않는다.

## 흔한 오해와 검증

- 생산성을 근로자의 노력이나 개인 성과로만 해석하지 않는다.
- 단위노동비용을 CPI와 같은 가격지수로 부르지 않는다.
- 경기침체기의 산출·시간 급변이 생산성 수치를 왜곡할 수 있다.
- 연례 개정과 국민계정 개정의 연쇄 효과를 보존한다.

## 공식 자료

- U.S. Bureau of Labor Statistics, [Productivity Methods Overview](https://www.bls.gov/productivity/methods-overview.htm)
- U.S. Bureau of Labor Statistics, [Productivity Data Sources](https://www.bls.gov/productivity/sources/home.htm)
