# 미국 경제지표 학습 노트: 경기선행지수 LEI

## 학습 목표

서로 다른 선행 신호를 결합한 Conference Board LEI를 단일 침체 예언값이 아니라 경기 전환 위험의 폭·지속성 지표로 사용한다.

## LEI의 구성

미국 LEI는 노동, 주문, 주택, 금융시장, 신용, 기대를 대표하는 10개 구성요소를 결합한다.

1. 제조업 평균 주당 근로시간
2. 평균 주간 신규 실업수당 청구(역방향)
3. 소비재·원자재 신규주문
4. ISM 신규주문지수
5. 항공기 제외 비국방 자본재 신규주문
6. 신규 민간주택 건축허가
7. S&P 500 주가
8. Leading Credit Index
9. 10년 국채금리와 연방기금금리 차이
10. 소비자의 사업여건 기대

CEI는 비농업고용, 이전소득 제외 개인소득, 제조·유통 판매, 산업생산 등 현재 활동 지표를 묶는다. LEI와 CEI의 역할을 구분한다.

## 읽는 순서

1. 한 달 변화보다 6개월 방향과 감소의 지속성을 본다.
2. 몇 개 구성요소가 하락에 기여했는지 확산을 확인한다.
3. 금융시장 구성요소만 움직인 것인지 실물 선행지표도 동행하는지 본다.
4. LEI의 방향을 CEI와 실질 GDP 흐름과 비교한다.
5. 원자료 개정이 종합지수에 반영되는 시점을 확인한다.

종합지수는 구성요소를 다시 이용한 별도 모델과 함께 쓰면 같은 신호를 중복 가중할 수 있다. AI 점수에서는 LEI 또는 원 구성요소 중 하나를 주 근거로 선택한다.

## 대시보드 데이터 계약

```text
indexName, referenceMonth, releaseDate, indexLevel, monthlyChange,
sixMonthChange, diffusionIndex, componentContributions,
revisionStatus, methodologyVersion
```

AI는 침체 확정 대신 약화의 기간·폭·구성요소와 반대 근거를 제시한다.

## 흔한 오해와 검증

- 한 달 하락으로 경기침체 시점을 확정하지 않는다.
- 주가·금리차 같은 금융 구성요소를 LEI와 별도 근거로 이중계산하지 않는다.
- 구성과 방법론 변경 전후의 지수 수준을 무비판적으로 비교하지 않는다.
- 원자료 접근성과 재현 가능성을 메타데이터에 표시한다.

## 공식 자료

- The Conference Board, [US Leading Economic Index](https://www.conference-board.org/topics/us-leading-indicators/index.cfm)
- The Conference Board, [Business Cycle Indicators](https://www.conference-board.org/data/bcicountry.cfm?cid=1)
