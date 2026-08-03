# D01 학습 증거

예시 파일은 정답의 모양만 보여 준다. 서버를 직접 실행한 뒤 다음 파일을 추가한다.

- `spring-response.json`: 실제 Spring 응답
- `nest-response.json`: 실제 NestJS 응답
- `starter-failure.txt` 또는 실패 화면 캡처
- `tests-success.txt` 또는 성공 화면 캡처

## 다섯 문장 회고

1. **문제:**
2. **내 예상:**
3. **해본 실험:**
4. **실제 결과:**
5. **배운 점:**

## 내가 확인한 계약

- HTTP 방법:
- 주소:
- 성공 상태 코드:
- 필수 JSON 필드:
- 제외한 동적 필드와 이유: 없음 / 직접 작성

## Spring과 NestJS 대응표

| Spring 코드 | NestJS 코드 | 내가 이해한 뜻 |
|---|---|---|
| `@RestController` | `@Controller` | |
| `@GetMapping` | `@Get` | |
| Java `record` | TypeScript `interface` | |
| MockMvc | Supertest + Vitest | |

