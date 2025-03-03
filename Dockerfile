FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock* ./bun.lock*
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV NEXT_PUBLIC_API_URL=http://147.45.159.88/api
ENV NEXT_PUBLIC_APP_URL=https://constant-pauly-ijanybekov-0c885777.koyeb.app

CMD ["bun", "run", "start"]
