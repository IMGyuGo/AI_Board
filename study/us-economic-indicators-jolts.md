# 미국 경제지표 학습 노트: JOLTS 구인과 노동이동

## 학습 목표

고용의 순증감 뒤에 있는 구인, 채용, 자발적 퇴직, 해고의 흐름을 구분하고 노동 수요와 근로자의 협상력을 함께 판단한다.

## JOLTS가 측정하는 것

BLS의 Job Openings and Labor Turnover Survey는 비농업 사업체를 조사해 월간 구인과 노동이동을 추정한다.

| 지표 | 정의의 핵심 | 경제적 질문 |
| --- | --- | --- |
| Job Openings | 월말에 시작 가능하고 외부 채용을 적극 진행하는 빈자리 | 기업의 미충족 노동 수요가 강한가 |
| Hires | 월중 급여명부에 새로 들어온 채용 | 실제 고용 전환이 일어나는가 |
| Quits | 근로자가 자발적으로 떠난 이직 | 더 나은 일자리 선택 자신감이 있는가 |
| Layoffs and Discharges | 사용자가 주도한 이직 | 노동 수요가 약해지는가 |
| Total Separations | quits, layoffs 등 전체 이탈 | 노동시장 회전이 얼마나 활발한가 |

수준과 비율을 구분한다. 구인율·채용률·퇴직률은 해당 지표의 수준을 고용과 빈자리 등 정의된 분모로 나눈 값이므로 단순 인원과 같은 단위가 아니다.

## 읽는 순서

1. 구인 수준과 구인율의 추세를 본다.
2. 구인이 실제 채용으로 연결되는지 비교한다.
3. 퇴직률과 해고율을 분리해 이직의 주체를 확인한다.
4. 업종·지역 확산과 최근 개정을 확인한다.
5. 비농업고용, 임금, 실업자 수, 신규 실업수당 청구와 교차검증한다.

구인/실업자 비율은 노동 수급의 보조지표지만 JOLTS와 가계조사의 서로 다른 조사·기준일을 결합한다. 한 숫자를 정밀한 균형점으로 취급하지 않는다.

## 대시보드 데이터 계약

```text
metric, referenceMonth, releaseDate, level, rate, unit,
industry, geography, seasonalAdjustment, revisionStatus
```

AI는 “구인 감소”와 “해고 증가”를 같은 의미로 쓰지 않는다. 냉각이 구인 정상화, 채용 둔화, 자발적 퇴직 감소, 해고 확대 중 어디서 발생했는지 설명한다.

## 흔한 오해와 검증

- 빈자리 수를 즉시 채용될 사람 수로 해석하지 않는다.
- 구인과 실업자는 서로 다른 조사에서 오므로 시점과 범위를 표시한다.
- 예비치는 다음 발표와 연례 벤치마크에서 개정될 수 있다.
- 총고용 순증만으로 채용과 이탈의 큰 흐름을 놓치지 않는다.

## 공식 자료

- U.S. Bureau of Labor Statistics, [JOLTS Handbook of Methods](https://www.bls.gov/opub/hom/jlt/home.htm)
- U.S. Bureau of Labor Statistics, [Job Openings and Labor Turnover Survey](https://www.bls.gov/jlt/)
