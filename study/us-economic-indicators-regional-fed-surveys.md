# 미국 경제지표 학습 노트: 지역 연은 제조업 설문

## 학습 목표

뉴욕·필라델피아 등 지역 연은 설문을 전국 제조업의 빠른 방향 신호로 활용하되 지역·표본·지수 산식 차이를 보존한다.

## 대표 설문

지역 연방준비은행은 관할 지역 기업에 전월 대비 상황과 향후 전망을 묻는다. Empire State Manufacturing Survey와 Philadelphia Fed Manufacturing Business Outlook Survey가 시장에서 널리 활용된다.

| 항목 | 질문 |
| --- | --- |
| General Business Conditions | 전반적 활동이 개선·악화됐는가 |
| New Orders / Shipments | 수요와 실제 출하 방향은 어떠한가 |
| Employment / Workweek | 노동 투입이 늘었는가 |
| Prices Paid / Received | 투입비용과 판매가격 압력은 어떠한가 |
| Future Conditions | 약 6개월 뒤 전망은 어떠한가 |

대부분 확산지수이므로 0보다 크면 개선 응답이 악화 응답보다 많고, 0보다 작으면 반대다. 지수 20을 생산 20% 증가로 읽지 않는다.

## 읽는 순서

1. 현재 일반여건 지수의 0 기준과 전월 변화를 본다.
2. 신규주문과 출하가 헤드라인을 지지하는지 확인한다.
3. 고용·근로시간과 가격지수로 성장의 질을 살핀다.
4. 현재와 미래지수의 괴리를 설명한다.
5. 여러 지역 설문, ISM 제조업 PMI, 산업생산과 교차검증한다.

한 지역의 산업구성과 충격이 전국 흐름과 다를 수 있다. 여러 지역을 단순 평균하려면 지수 산식·표본·계절조정 차이를 먼저 정규화해야 한다.

## 대시보드 데이터 계약

```text
reserveBank, surveyName, region, referenceMonth, releaseDate,
metric, diffusionIndex, baseline=0, currentOrFuture,
seasonalAdjustment, sampleSize, revisionStatus
```

AI는 지역명을 제목에 표시하고 전국 제조업 판단에는 최소 두 지역과 전국 지표를 반대 근거로 확인한다.

## 흔한 오해와 검증

- 0 기준 확산지수를 ISM의 50 기준과 같은 수준으로 비교하지 않는다.
- 지역 한 곳의 급등락을 전국 생산 증가율로 변환하지 않는다.
- 응답률과 조사기간, 특수 의견을 확인한다.
- 현재지수와 미래지수를 혼합하지 않는다.

## 공식 자료

- Federal Reserve Bank of New York, [Empire State Manufacturing Survey](https://www.newyorkfed.org/survey/empire/empiresurvey_overview.html)
- Federal Reserve Bank of Philadelphia, [Manufacturing Business Outlook Survey](https://www.philadelphiafed.org/surveys-and-data/regional-economic-analysis/mbos-historical-data)
