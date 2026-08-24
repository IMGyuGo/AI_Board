# 미국 경제지표 학습 노트: 소비자신용과 부채상환부담

## 학습 목표

가계의 신용 잔액 증가와 실제 원리금 상환 부담을 구분해 차입 기반 소비의 지속성과 금융 취약성을 판단한다.

## 소비자신용 G.19

Federal Reserve의 G.19는 개인의 가계·가족·개인 지출을 위한 신용 중 부동산 담보대출을 제외한 잔액을 집계한다.

| 구분 | 대표 내용 | 주의점 |
| --- | --- | --- |
| Revolving Credit | 신용카드와 사전 약정 한도대출 | 잔액 증가는 소비와 상환 패턴 모두 반영 |
| Nonrevolving Credit | 자동차·학자금·개인 할부대출 | 추가 차입마다 별도 계약이 필요 |
| Credit Terms | 카드·자동차·개인대출 금리 등 | 신규 계약 조건과 전체 잔액 비용은 다름 |

G.19는 주택담보대출을 제외하므로 전체 가계부채가 아니다. 상각된 민간 대출과 정부 학자금대출의 부도 처리 방식도 다를 수 있다.

## 부채상환부담

가계 부채상환비율은 가처분개인소득 대비 요구되는 원리금 지급을 추정한다. Financial Obligations Ratio는 임차료, 자동차 리스 등 더 넓은 정기 의무를 포함한다. 낮은 금리의 장기 고정대출이 많으면 부채 수준이 높아도 당장의 부담은 완만할 수 있다.

## 읽는 순서

1. 회전·비회전 신용의 수준과 흐름을 나눈다.
2. 월간 연율 증가율과 실제 월간 증감을 구분한다.
3. 신규 대출금리와 연체·상각률을 확인한다.
4. 가처분소득 대비 상환부담의 추세를 본다.
5. 소매판매, 저축률, 은행 대출기준, 가계대출 잔액과 교차검증한다.

## 대시보드 데이터 계약

```text
release, creditType, holderType, referenceMonth, releaseDate,
outstandingLevel, flow, annualizedGrowthRate, interestRate,
seasonalAdjustment, coverageExclusions, revisionStatus
```

AI는 신용 증가를 소비 호조로만 평가하지 않고 소득, 금리, 연체와 상환부담을 함께 제시한다.

## 흔한 오해와 검증

- G.19 총액을 주택담보대출 포함 전체 가계부채로 부르지 않는다.
- 잔액 증가를 신규 소비액과 동일시하지 않는다.
- 연율 증가율을 실제 한 달 증가율로 읽지 않는다.
- 정부 학자금대출과 민간대출의 회계 차이를 확인한다.

## 공식 자료

- Federal Reserve Board, [Consumer Credit G.19 About](https://www.federalreserve.gov/releases/g19/about.htm)
- Federal Reserve Board, [Household Debt Service and Financial Obligations Ratios](https://www.federalreserve.gov/releases/housedebt/)
