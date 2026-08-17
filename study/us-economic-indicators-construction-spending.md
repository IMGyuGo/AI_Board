# 미국 경제지표 학습 노트: 건설지출

## 학습 목표

미국에서 실제 시공된 공사의 가치를 주거·비주거·공공 부문으로 나눠 읽고 허가·착공과의 시차를 이해한다.

## Value Put in Place

Census Bureau의 Construction Spending은 매월 현장에 설치·시공된 공사의 가치(Value of Construction Put in Place)를 추정한다. 계약 체결액이나 지급액 전체가 아니라 해당 기간에 진행된 공사 가치를 배분한 개념이다.

포함 항목은 신축, 증축·개조, 현장에 설치된 자재와 노동, 건축·엔지니어링 비용 등이다. 토지 구입, 일반 유지보수, 생산기계 자체 등은 범위에서 제외될 수 있다.

| 분류 | 주요 내용 |
| --- | --- |
| Private Residential | 단독·다세대 주택과 주거 개선 |
| Private Nonresidential | 제조시설, 상업, 사무실, 의료, 데이터센터 등 |
| Public | 연방 및 주·지방정부의 도로, 교육, 상하수도 등 |

## 읽는 순서

1. 계절조정 연율(SAAR)과 실제 월간 지출을 구분한다.
2. 민간/공공, 주거/비주거를 나눠 기여를 확인한다.
3. 명목 지출 변화와 건설비용 상승을 구분한다.
4. 건축허가·착공에서 지출로 이어지는 시차를 고려한다.
5. 건설고용, 모기지금리, 공공 예산, 제조업 투자와 교차검증한다.

주택착공은 주택 수 단위이고 건설지출은 달러 가치다. 고가 프로젝트와 공사비 상승 때문에 두 지표의 방향이 달라질 수 있다.

## 대시보드 데이터 계약

```text
ownership, constructionType, referenceMonth, releaseDate, value,
unit, seasonalAdjustment, annualized, nominal=true,
revisionStatus, confidenceInterval
```

AI는 총건설 증가 뒤에 어느 소유·용도 부문이 기여했는지 밝히고 실질 활동 판단에는 건설비용 지표를 반대 근거로 제시한다.

## 흔한 오해와 검증

- SAAR를 해당 월 실제 지출액으로 읽지 않는다.
- 허가·착공·지출을 동일한 공정 시점으로 보지 않는다.
- 명목 증가를 건설 물량 증가로 단정하지 않는다.
- 최근 월은 개정 폭과 표본오차를 확인한다.

## 공식 자료

- U.S. Census Bureau, [Construction Spending About the Survey](https://www.census.gov/construction/c30/about_the_survey.html)
- U.S. Census Bureau, [Construction Spending Definitions](https://www.census.gov/construction/c30/definitions.html)
