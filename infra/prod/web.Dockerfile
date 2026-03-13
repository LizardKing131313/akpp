FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

ARG NUXT_PUBLIC_DIRECTUS_PUBLIC_URL
ENV NUXT_PUBLIC_DIRECTUS_PUBLIC_URL=$NUXT_PUBLIC_DIRECTUS_PUBLIC_URL

COPY . .

WORKDIR /app/apps/web

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --force
RUN pnpm build

# -------- runtime stage --------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/apps/web/.output ./.output
COPY --from=builder /app/apps/web/package.json ./package.json

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
