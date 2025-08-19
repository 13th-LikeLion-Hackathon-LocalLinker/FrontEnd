### 멋사 중앙해커톤 3팀 FE

### Branch
- 작업 내용에 따른 이슈 생성 후 해당 브랜치를 사용한다.
- commit에 대한 prefix 규칙을 준수하도록 한다.
- pr은 dev 브랜치에 진행

  
### Commit Prefix
| 커밋 타입 | 내용 |
|-----------|------------------|
| ✨ Feat      | Feat: 기능 구현 |
| 🐛 Fix       | Fix: 버그 수정|
| ✏️ Rename    | Rename: Home → HomePage 컴포넌트 이름 변경 |
| 🔥 Remove    | Remove: 불필요한 이미지 리소스 제거 |
| 💄 Style     | Style: 코드 포매팅 및 세미콜론 추가 |
| 📱 Design    | Design: 메인 페이지 UI 수정 |
| ♻️ Refactor  | Refactor: 로그인 로직 리팩토링 |
| ✅ Test      | Test: 유닛 테스트 코드 추가 |
| 📝 Docs      | Docs: README 커밋 메시지 규칙 추가 |
| 🔧 Chore     | Chore: .gitignore 파일 수정 |
| ⚡️ Perf      | Perf: 이미지 로딩 성능 개선 |
| ⚙️ Setting  | 빌드 및 패키지 등 프로젝트 설정  |

```
< Commit Message >
[#이슈번호] Prefix_종류: 구현_내용
ex-1) [#1] Setting: 라우터 세팅
ex-2) [#3] Feat: 로그인 기능 서버 연동
ex-3) [#4] Fix: 로그인 연동 API Path 수정
```
