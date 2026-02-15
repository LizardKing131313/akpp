FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

ENV CI=true

COPY . .

WORKDIR /app/apps/web

ENV NODE_ENV=development
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]
