# /deploy-dev — DEV 환경 배포

## 개요

PR을 develop 브랜치에 머지하여 DEV 환경 배포를 트리거한다.
GitHub Actions `deploy.yml`이 develop push 이벤트로 자동 실행된다.

---

## 워크플로우

### Step 1: PR 상태 확인

```bash
# 현재 브랜치의 PR 확인
gh pr status

# PR의 CI 체크 확인
gh pr checks
```

- PR이 존재하는지 확인
- CI 체크가 통과했는지 확인

### Step 2: PR 머지

```bash
# develop 브랜치 대상으로 Squash merge + 브랜치 삭제
gh pr merge --squash --delete-branch
```

### Step 3: DEV 배포 모니터링

develop에 머지되면 `deploy.yml` GitHub Actions가 자동 실행된다.

```bash
# 최신 workflow run 확인
gh run list --workflow=deploy.yml --limit=1

# 실행 상태 확인
gh run view {run-id}

# 실시간 로그 확인 (필요 시)
gh run watch {run-id}
```

### Step 4: 배포 결과 보고

```
Branch: develop
Merge: squash
Workflow: deploy.yml
Run: {run-url}
Status: {success | failure}
Environment: development
```

---

## 배포 파이프라인 (deploy.yml)

```
develop push → Build Next.js → Docker Image → ECR Push → ECS Deploy
```

1. 환경 결정 (develop → development)
2. `.env` 파일 생성 (GitHub Vars에서)
3. Docker 이미지 빌드 (`dev-{sha}` 태그)
4. AWS ECR에 이미지 푸시
5. ECS Task Definition 업데이트
6. ECS 서비스 배포

---

## 실패 시 대응

| 단계 | 실패 원인 | 대응 |
|------|----------|------|
| Build | 빌드 에러 | 로컬에서 `yarn build` 재현 후 수정 |
| Docker | Dockerfile 문제 | Dockerfile 확인 |
| ECR Push | AWS 인증 문제 | AWS 자격 증명 확인 |
| ECS Deploy | 컨테이너 시작 실패 | ECS 로그 확인, 환경 변수 점검 |
