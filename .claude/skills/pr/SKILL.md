---
name: pr
description: PR 생성 & GitHub 푸시
context: fork
allowed-tools: Read, Grep, Glob, Bash, Write, Edit
---
# /pr — PR 생성 & GitHub 푸시 (FE)

## 개요

구현 완료된 코드를 GitHub에 PR로 생성한다.
**PR 생성 전 빌드 체크를 반드시 실행하고, 실패 시 PR을 생성하지 않는다.**

---

## 입력

- `TICKET_ID`: 티켓 ID
- `TICKET_TITLE`: 티켓 제목
- `TICKET_TYPE`: feat | fix | modify

---

## 워크플로우

### Step 1: Pre-flight Build Gate (필수)

> **이 단계를 통과하지 못하면 PR을 생성하지 않는다.**

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE

# 1. 린트 체크
yarn lint

# 2. 타입 체크
npx tsc --noEmit

# 3. 빌드 검증
yarn build
```

#### 실패 시 처리

```
## PR 생성 차단

빌드 체크 실패:

| Check | Status | Detail |
|-------|--------|--------|
| lint | FAIL | {상세} |
| tsc | PASS | - |
| build | FAIL | {상세} |

### 해결 방법
1. {ESLint 에러 수정 안내}
2. {빌드 에러 수정 안내}

→ 수정 후 `/pr` 재실행하세요.
```

> **FAIL이 하나라도 있으면 여기서 중단. Step 2로 진행하지 않는다.**

---

### Step 2: FSD 아키텍처 위반 Quick Check

> 핵심 항목만 빠르게 재검증

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE

# feature 간 참조 위반
VIOLATIONS=$(grep -rn "from '@/feature/" src/feature/ 2>/dev/null | grep -c "feature/[^/]*/.*feature/[^/]*" || echo 0)

# shared → 상위 계층 참조 위반
VIOLATIONS2=$(grep -rn "from '@/feature/\|from '@/composite/\|from '@/app/" src/shared/ 2>/dev/null | wc -l | tr -d ' ')

if [ "$VIOLATIONS" -gt 0 ] || [ "$VIOLATIONS2" -gt 0 ]; then
  echo "BLOCKED: FSD 계층 위반 발견"
  exit 1
fi
```

> **위반 발견 시 PR 생성 차단.**

---

### Step 3: 변경 사항 확인 & 커밋

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE

git status
git diff --name-only
git diff --cached --name-only
```

커밋되지 않은 변경이 있으면:

```bash
# 파일별 스테이징 (git add -A, git add . 금지)
git add {specific files}

# Conventional commit
git commit -m "{type}: {description}"
```

---

### Step 4: 리모트 브랜치 푸시

```bash
git branch --show-current
git push -u origin $(git branch --show-current)
```

---

### Step 5: PR 생성

```bash
gh pr create \
  --title "{type}: {TICKET_TITLE}" \
  --body "$(cat <<'EOF'
## Summary

{변경 사항 요약 (1-3 bullet points)}

## Affected Domains

{영향받는 FSD 도메인 목록}

## Changes

### New Files
{신규 파일 목록}

### Modified Files
{수정 파일 목록}

## FSD Layer Map

| Layer | Files |
|-------|-------|
| app/ | {변경 파일} |
| composite/ | {변경 파일} |
| feature/ | {변경 파일} |
| model/ | {변경 파일} |
| shared/ | {변경 파일} |

## Pre-merge Verification

| Check | Status |
|-------|--------|
| lint | PASS |
| tsc | PASS |
| build | PASS |
| FSD Architecture | PASS |

## Related

- Ticket: {TICKET_ID}
- BE Impact: {있으면 기술, 없으면 None}
- Design: {Figma 링크 또는 TBD}
EOF
)"
```

---

### Step 6: 결과 보고

```
## PR 생성 완료

| 항목 | 값 |
|------|------|
| PR URL | {pr-url} |
| Branch | {branch-name} |
| Title | {pr-title} |
| Affected Domains | {domains} |

### Pre-merge Results
- lint: PASS
- tsc: PASS
- build: PASS
- FSD Architecture: PASS
```

---

## 주의사항

- **빌드 체크 실패 시 PR을 절대 생성하지 않는다.**
- **FSD 아키텍처 위반 발견 시 PR을 절대 생성하지 않는다.**
- PR 제목은 conventional commit 형식: `{feat|fix|modify}: {description}`
- `git add -A` 또는 `git add .` 를 사용하지 않는다.
- PR body에 빌드 검증 결과와 FSD Layer Map을 반드시 포함한다.
- BE API 변경과 연관된 경우 명시한다.
