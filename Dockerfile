# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# 2단계: 런타임 스테이지
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
# app 소스 전체 복사
COPY --from=builder /app/app ./app

# ENV NODE_ENV production
EXPOSE 3000

CMD ["yarn", "start"]
