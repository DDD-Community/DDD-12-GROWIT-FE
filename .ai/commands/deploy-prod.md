# /deploy-prod — PROD 환경 배포

## 개요

main 브랜치에 머지하여 PROD 환경 배포를 트리거한다.
GitHub Actions `deploy.yml`이 main push 이벤트로 자동 실행된다.

---

## 워크플로우

### Step 1: 사전 검증

```bash
# develop 브랜치에서 main으로 PR 생성 또는 확인
gh pr list --base main --head develop

# DEV 배포가 성공했는지 확인
gh run list --workflow=deploy.yml --limit=3
```

**PROD 배포 전 반드시 확인:**
- [ ] DEV 환경 배포 성공
- [ ] DEV 환경 QA 통과
- [ ] 로컬 빌드 통과 (`yarn build`)

### Step 2: develop → main 머지

```bash
# develop에서 main으로 PR 생성 (없는 경우)
gh pr create --base main --head develop --title "release: {version}" --body "DEV QA 완료"

# PR 머지
gh pr merge --merge --delete-branch=false
```

또는 기존 feature PR을 직접 main에 머지:

```bash
gh pr merge --squash --delete-branch
```

### Step 3: PROD 배포 모니터링

main에 머지되면 `deploy.yml` GitHub Actions가 자동 실행된다.

```bash
# workflow run 확인
gh run list --workflow=deploy.yml --limit=1

# 실행 상태 확인
gh run view {run-id}

# 실시간 로그 확인
gh run watch {run-id}
```

### Step 4: 배포 결과 보고

```
Branch: main
Workflow: deploy.yml
Run: {run-url}
Status: {success | failure}
Environment: production
Image Tag: prod-{sha}
```

---

## 배포 파이프라인 (deploy.yml)

```
main push → Build Next.js → Docker Image → ECR Push → ECS Deploy
```

1. 환경 결정 (main → production)
2. `.env` 파일 생성 (GitHub Vars에서 — production 환경)
3. Docker 이미지 빌드 (`prod-{sha}` 태그)
4. AWS ECR에 이미지 푸시
5. ECS Task Definition 업데이트
6. ECS 서비스 배포 (growit-fe-cluster)

---

## 롤백 절차

PROD 배포 후 문제 발생 시:

```bash
# 방법 1: ECS에서 이전 task definition으로 롤백
aws ecs update-service --cluster growit-fe-cluster --service {service-name} --task-definition {previous-task-def}

# 방법 2: 이전 커밋으로 revert PR 생성
git revert HEAD
git push origin main
# deploy.yml이 자동 실행되어 이전 상태로 배포
```

---

## 주의사항

- DEV 배포 성공 없이 PROD 배포하지 않는다.
- DEV 환경 QA 통과 후에만 PROD 배포를 진행한다.
- 롤백 계획을 항상 확인한 후 배포한다.
- PROD 환경 변수가 올바른지 GitHub Vars (production environment)에서 확인한다.
