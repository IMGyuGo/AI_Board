# 미국 경제지표 학습 노트: 연방 재정수지와 국가부채

## 학습 목표

연방정부의 월간 세입·지출·재정수지와 국채 조달을 구분하고 회계연도, 계절성, 일회성 시점 효과를 고려해 재정 흐름을 읽는다.

## Monthly Treasury Statement

미 재무부 Fiscal Service의 Monthly Treasury Statement(MTS)는 수정 현금주의 기준으로 연방정부의 세입, 지출, 흑자·적자와 자금조달 수단을 요약한다.

```text
재정수지 = 세입 - 지출
적자이면 국채 발행과 현금잔고 조정 등으로 자금을 조달한다.
```

| 항목 | 주요 내용 |
| --- | --- |
| Receipts | 개인·법인 소득세, 급여세, 관세 등 |
| Outlays | 사회보장, 보건, 국방, 이자와 기타 프로그램 지출 |
| Surplus or Deficit | 해당 기간 세입과 지출의 차이 |
| Means of Financing | 차입, 현금잔고와 기타 조정 |

연방 회계연도는 10월부터 다음 해 9월까지다. 월별 세금 납부 일정, 급여 지급일, 주말·공휴일 이동 때문에 단월 수지는 변동성이 크다.

## 부채와 이자비용

월간 적자와 총연방부채 증가는 일대일로 같지 않다. 정부 내 보유채무, 대중보유채무, 재무부 일반계정, 기타 금융거래가 연결된다. 이자지출은 부채 규모뿐 아니라 만기구조와 재발행 금리의 시차 영향을 받는다.

## 읽는 순서

1. 단월보다 회계연도 누계와 전년 동기 비교를 본다.
2. 세입과 지출을 각각 분해한다.
3. 일회성 납부·환급·달력 이동을 확인한다.
4. 대중보유채무, 순이자지출과 평균 금리를 함께 본다.
5. GDP 대비 수지·부채, 국채 발행계획과 교차검증한다.

## 대시보드 데이터 계약

```text
fiscalYear, referenceMonth, releaseDate, receipts, outlays,
surplusDeficit, fiscalYtdValue, accountCategory, cashBasis,
calendarShiftAdjustment, revisionStatus
```

AI는 정부 재정을 가계부채처럼 설명하지 않고 명목 금액, GDP 비율, 회계연도 누계를 구분한다.

## 흔한 오해와 검증

- 월간 적자를 국가부채 월간 증가액과 동일시하지 않는다.
- 역년과 연방 회계연도 누계를 혼용하지 않는다.
- 명목 지출 증가를 실질 재정충격으로 바로 해석하지 않는다.
- MTS, 예산 전망, 국민계정 정부지출의 회계 기준 차이를 표시한다.

## 공식 자료

- U.S. Treasury Fiscal Service, [Monthly Treasury Statement](https://fiscal.treasury.gov/accounting/monthly-treasury-statement/)
- U.S. Treasury Fiscal Data, [Debt to the Penny](https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/)
