# /deploy-local — 로컬 개발 서버 기동

## 개요

로컬 환경에서 Next.js 개발 서버를 기동한다.

---

## 워크플로우

### Step 1: 의존성 확인

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE

# node_modules 존재 확인
ls node_modules/.package-lock.json 2>/dev/null || yarn install
```

### Step 2: 환경 변수 확인

`.env.development` 파일 존재 확인:

```
NEXT_PUBLIC_API_URL={BE API URL}
NEXT_PUBLIC_REDIRECT_URL={OAuth redirect URL}
NEXT_PUBLIC_CLOUDFRONT_VIDEO_URL={CDN URL}
```

### Step 3: 서버 기동

```bash
cd /Users/sagwangjin/Desktop/growit-test/DDD-12-GROWIT-FE && yarn dev
```

Next.js 15 + Turbopack으로 개발 서버가 기동된다.

### Step 4: 상태 확인

서버가 기동되면:

```bash
curl -s http://localhost:3000 -o /dev/null -w "%{http_code}"
```

기대 응답: `200` 또는 `302` (리다이렉트)

### Step 5: 상태 보고

```
Server: http://localhost:3000
Framework: Next.js 15.3.8 + Turbopack
Env: .env.development
Status: Ready
```

---

## 관련 서비스

| 서비스 | 기본 포트 | 용도 |
|--------|----------|------|
| Next.js Dev | 3000 | FE 개발 서버 |
| Storybook | 6006 | 컴포넌트 문서 (`yarn storybook`) |

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| Port 3000 already in use | 다른 프로세스 사용 중 | `lsof -i :3000` 후 종료, 또는 Next.js가 자동으로 3001 사용 |
| Module not found | 의존성 미설치 | `yarn install` |
| .env 변수 미적용 | 서버 재시작 필요 | 서버 종료 후 `yarn dev` 재실행 |
| Turbopack 에러 | 캐시 문제 | `rm -rf .next && yarn dev` |
| API 연결 실패 | BE 서버 미기동 | BE 서버 확인 (localhost:8080) |
