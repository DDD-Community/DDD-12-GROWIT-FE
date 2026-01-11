# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# CI에서 .env 파일을 동적으로 생성하여 환경변수 전달
# GitHub Actions에서 각 환경별 Variables로 생성됨

RUN yarn build

# 2단계: 런타임 스테이지
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# ENV NODE_ENV production
EXPOSE 3000

CMD ["yarn", "start"]
