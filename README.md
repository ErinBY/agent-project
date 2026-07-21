# ModoAI 수정 에이전트 설계 PRD

Figma Make로 만든 인터랙티브 기획 문서입니다.
`erinby.github.io/agent-project` 주소로 배포합니다.

---

## 처음 배포하는 방법 (5단계)

### 1단계. GitHub에서 새 저장소 만들기
1. github.com 접속 → 오른쪽 위 `+` 버튼 → `New repository`
2. Repository name에 **`agent-project`** 입력 (이 이름이 그대로 주소가 됩니다)
3. Public 선택, 나머지는 기본값 그대로 두고 `Create repository` 클릭
4. README, .gitignore 등은 추가하지 않고 빈 저장소로 만듭니다 (이미 이 폴더에 다 있습니다)

### 2단계. 이 폴더를 내 컴퓨터의 원하는 위치에 압축 풀기
바탕화면이든 어디든 편한 곳에 압축을 풉니다.

### 3단계. Git Bash에서 저장소에 연결하고 올리기
압축을 푼 폴더 안에서 Git Bash를 열고, 아래 명령어를 **한 줄씩** 순서대로 입력합니다.
(`깃허브아이디` 부분만 본인 GitHub 아이디로 바꿔주세요)

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/깃허브아이디/agent-project.git
git push -u origin main
```

> 참고: 이번엔 새로 만드는 저장소라서 `git clone`이 아니라 `git init`으로 시작하는 게 맞습니다.
> (기존 저장소를 이어받을 때만 `git clone`을 씁니다)

### 4단계. GitHub Pages 켜기
1. 방금 만든 저장소 페이지에서 `Settings` 탭 클릭
2. 왼쪽 메뉴에서 `Pages` 클릭
3. `Build and deployment` 항목의 `Source`를 **`GitHub Actions`** 로 선택

### 5단계. 자동 배포 기다리기
1. 저장소 페이지의 `Actions` 탭 클릭
2. `Deploy to GitHub Pages`라는 작업이 자동으로 돌아가는 게 보입니다 (2~3분 소요)
3. 초록색 체크가 뜨면 완료. `https://erinby.github.io/agent-project` 로 접속해서 확인합니다

---

## 이후에 내용을 수정하고 싶을 때

`src/app/App.tsx` 파일 안의 텍스트를 고친 뒤, 같은 폴더에서 아래 명령어만 입력하면
GitHub Actions가 자동으로 다시 빌드해서 사이트에 반영합니다.

```bash
git add .
git commit -m "내용 수정"
git push
```

---

## 내 컴퓨터에서 미리 보고 싶을 때 (선택)

```bash
npm install
npm run dev
```
터미널에 뜨는 주소(보통 http://localhost:5173)로 접속하면 배포 전에 미리 확인할 수 있습니다.
