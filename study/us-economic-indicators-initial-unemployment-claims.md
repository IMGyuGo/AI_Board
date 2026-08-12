# 미국 경제지표 학습 노트: 신규 실업수당 청구

## 학습 목표

주간 실업보험 청구를 노동시장 악화의 빠른 신호로 읽되, 휴일·계절조정·주별 행정 차이 때문에 한 주의 움직임을 확정적 전환으로 해석하지 않는다.

## 지표의 구조

미 노동부 고용훈련청(ETA)은 주 정부가 집계한 실업보험 청구를 매주 발표한다.

| 지표 | 의미 | 해석 초점 |
| --- | --- | --- |
| Initial Claims | 실업 후 처음 급여를 신청한 청구 | 해고 흐름의 빠른 변화 |
| Continued Claims | 첫 청구 뒤에도 실업 상태로 급여를 청구 | 재취업 속도와 실업 지속성 |
| Insured Unemployment Rate | 보험 적용 고용 대비 계속 청구 비율 | 일반 실업률과 범위가 다름 |

신규 청구는 사람이 아니라 행정상 청구 건수이며 모든 실업자를 포함하지 않는다. 자격요건, 처리 지연, 중복·사기 청구 정비도 수치에 영향을 줄 수 있다.

## 읽는 순서

1. 계절조정치인지 원계열인지 확인한다.
2. 최신 주뿐 아니라 4주 이동평균의 방향을 본다.
3. 신규 청구와 계속 청구가 함께 상승하는지 구분한다.
4. 여러 주·여러 주(州)에 악화가 확산되는지 확인한다.
5. 비농업고용, 실업률, JOLTS 해고·구인과 교차검증한다.

신규 청구만 오르면 해고가 일시적으로 늘었을 수 있다. 계속 청구까지 오르면 새 일자리를 찾는 시간이 길어졌을 가능성을 점검한다. 자연재해, 파업, 자동차 공장 휴업과 연말 휴일은 단기 변동을 키울 수 있다.

## 대시보드 데이터 계약

```text
seriesId, referenceWeekEnding, releaseDate, value, unit=claims,
seasonalAdjustment, movingAverageWindow, revisionStatus, stateCoverage
```

AI 요약은 `latestWeek`, `fourWeekAverage`, `continuedClaims`를 따로 인용하고, “악화” 판단에는 지속기간과 확산 근거를 붙인다. 발표일과 기준 주 종료일을 혼동하지 않는다.

## 흔한 오해와 검증

- 신규 청구 증가를 곧바로 비농업고용 감소와 동일시하지 않는다.
- 보험 적용 실업률을 BLS 실업률과 직접 비교하지 않는다.
- 한 주의 급등 전에 휴일·재해·주별 적체 여부를 확인한다.
- 최신치가 개정될 수 있으므로 데이터 빈티지를 보존한다.

## 공식 자료

- U.S. Department of Labor, [Unemployment Insurance Weekly Claims Data](https://www.dol.gov/ui/data.pdf)
- U.S. Department of Labor, [Unemployment Insurance Data](https://oui.doleta.gov/unemploy/claims.asp)
