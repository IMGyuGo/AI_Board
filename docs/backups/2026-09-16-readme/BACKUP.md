# README 개편 전 백업

- 백업 시각: 2026-09-16 22:51:14 +09:00
- 기준 브랜치: `gyugo`
- 기준 커밋: `cb5e71b1732717eaa99ed9b55533c29eae7fe319`
- 백업 전 `git status --porcelain=v1`: 출력 없음, 작업 트리 깨끗함.

## 보존한 내용

- [README.original.md](README.original.md): 개편 전 README를 바이트 그대로 복사했습니다. 내용과 상대 링크는 당시 루트 위치 기준이므로 현재 설명으로 사용하지 않습니다.
- [structure.txt](structure.txt): 기준 커밋의 전체 추적 파일 경로입니다. `git -c core.quotepath=false ls-tree -r --name-only HEAD`로 생성했습니다.
- 로컬 전체 소스 ZIP: `.local-logs/backups/before-readme-2026-09-16-cb5e71b.zip`

ZIP은 `git archive`로 생성한 기준 커밋의 추적 파일 백업입니다. Git 이력, 무시된 의존성·빌드 결과, 실제 환경 변수, 로컬 DB 데이터는 포함하지 않습니다. ZIP은 기존 `.local-logs/` 무시 규칙에 따라 커밋하지 않습니다. 이 저장소의 Git 이력과 아래 명령으로 다시 생성할 수 있습니다.

```powershell
git archive --format=zip --output=before-readme-cb5e71b.zip cb5e71b1732717eaa99ed9b55533c29eae7fe319
```

## 무결성 기준

- 원본 README / 복사본 SHA-256: `B6B2CA7076D5A248DE051613AFF96CCF05734F62400394DE541449E642284E20`
- ZIP SHA-256: `ACE3A351C03693B400BA1901C37399659B4554ED1653558E4D0CA514C438AD12`

## README만 복원하기

저장소 루트에서 실행합니다. 현재 README 변경을 덮어쓰므로 필요한 내용은 먼저 보관합니다.

```powershell
Copy-Item docs/backups/2026-09-16-readme/README.original.md README.md
```

프로젝트의 실행 코드와 디렉터리 배치는 변경하지 않았습니다. README를 프로젝트 목적·전체 구조·설계 질문·소스와 테스트 근거·실행 방법 중심으로 재구성했습니다. 프롬프트 원문은 저장하지 않았습니다.
