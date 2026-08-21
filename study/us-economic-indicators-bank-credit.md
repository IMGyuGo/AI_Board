# 미국 경제지표 학습 노트: 통화와 은행신용

## 학습 목표

통화량과 상업은행 대차대조표를 구분하고 대출 증가율을 신용 공급, 차입 수요, 상각·분류 변경과 함께 해석한다.

## 두 데이터 체계

Federal Reserve의 H.6는 M1·M2 등 통화량을, H.8은 미국 상업은행의 주간 집계 대차대조표를 제공한다.

| 지표 | 무엇을 보여주는가 | 주의점 |
| --- | --- | --- |
| M1 / M2 | 현금·예금 등 유동성 자산의 범위별 잔액 | 정의 변경과 제도 변화 영향 |
| Bank Credit | 은행 보유 증권과 대출·리스 | 은행권 밖 신용 제외 |
| C&I Loans | 기업 운영·투자 관련 대출 | 공급과 수요가 함께 결정 |
| Real Estate Loans | 주거·상업용 부동산 관련 대출 | 금리·상각·매각 영향 |
| Consumer Loans | 신용카드·자동차 등 가계 신용 일부 | 전체 가계부채와 범위 차이 |
| Deposits / Borrowings | 은행의 주요 자금조달 | 예금 이동과 긴급조달 구분 |

H.8은 모든 상업은행뿐 아니라 대형·소형 국내은행과 외국계 기관 하위 집계를 제공한다. 대형·소형 은행 간 차이는 신용 충격의 집중 위치를 보여줄 수 있다.

## 읽는 순서

1. 주간 수준보다 월평균·분기·전년 변화율로 변동을 완화한다.
2. 대출을 기업·부동산·소비로 나눈다.
3. 대형은행과 소형은행의 방향을 비교한다.
4. 예금, 증권, 차입 등 대차대조표 반대편을 확인한다.
5. SLOOS 대출기준·수요, 연체율, 회사채 발행과 교차검증한다.

대출 감소만으로 은행이 공급을 조였다고 단정할 수 없다. 차입 수요 감소, 대출 매각·상각, 분류·회계 변경도 가능하다.

## 대시보드 데이터 계약

```text
release=H6|H8, institutionGroup, balanceSheetItem, referenceDate,
releaseDate, level, percentChange, annualized, seasonalAdjustment,
breakAdjusted, definitionVintage, revisionStatus
```

AI는 수준·증가율·연율 여부를 구분하고 H.8의 구조조정 조정치와 주석을 인용한다.

## 흔한 오해와 검증

- 통화량 증가를 즉시 신규 은행대출 증가로 동일시하지 않는다.
- H.8 대출을 경제 전체 신용으로 부르지 않는다.
- 주간 변동 하나로 신용경색을 선언하지 않는다.
- 합병, 패널 이동, 회계기준 변화에 대한 break adjustment를 확인한다.

## 공식 자료

- Federal Reserve Board, [H.8 About](https://www.federalreserve.gov/releases/H8/about.htm)
- Federal Reserve Board, [Money Stock Measures H.6](https://www.federalreserve.gov/releases/h6/current/default.htm)
