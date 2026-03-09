# AKPP

Монорепозиторий проекта `AKPPCenter` (Nuxt + Directus + PostgreSQL).

## Что внутри

- `apps/web` - фронтенд и server API на Nuxt 4
- `infra/dev` - dev docker-контур (Postgres, Redis, Directus, Web)
- `infra/prod` - prod docker-контур (Postgres, Redis, Directus, Web)
- `.github/workflows` - CI пайплайны

## Стек

- Node.js 20
- pnpm 10
- Nuxt 4 / Vue 3 / TypeScript
- Directus 11
- PostgreSQL 16
- Redis 7
- Docker Compose

## Требования

Перед стартом должны быть установлены:

```bash
node -v    # 20.x
pnpm -v    # 10.x
docker -v
docker compose version
```

## Быстрый старт (локально, без Docker)

1. Установить зависимости:

```bash
pnpm install
```

2. Создать env для web:

```bash
cp apps/web/.env.example apps/web/.env
```

3. Запустить dev сервер:

```bash
pnpm dev:web
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Быстрый старт (полный dev-контур через Docker)

1. Создать env для dev-контура:

```bash
cp infra/dev/.env.example infra/dev/.env
```

2. Поднять сервисы:

```bash
docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml up -d --build
```

3. Проверить состояние:

```bash
docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml ps
```

По умолчанию:

- Web: `http://localhost:3001`
- Directus: `http://localhost:8056`
- Postgres: `localhost:5433`
- Redis: `localhost:6380`

## Переменные окружения

### `apps/web/.env`

Минимально необходимые:

- `NUXT_PUBLIC_SITE_URL`
- `NUXT_PUBLIC_DIRECTUS_URL`
- `DIRECTUS_TOKEN`
- `DIRECTUS_CACHE_TTL_SECONDS`
- `YANDEX_MAP_API_KEY`
- `YANDEX_ORG_ID`

Шаблон: [apps/web/.env.example](/apps/web/.env.example)

### `infra/dev/.env`

Шаблон: [infra/dev/.env.example](/infra/dev/.env.example)

Важно заполнить:

- `DIRECTUS_KEY` и `DIRECTUS_SECRET` (минимум 32 символа)
- `DIRECTUS_ADMIN_EMAIL` и `DIRECTUS_ADMIN_PASSWORD`
- `DIRECTUS_TOKEN` (токен для web API запросов к Directus)

### `infra/prod/.env`

Шаблон: [infra/prod/.env.example](/infra/prod/.env.example)

## Полезные команды

### Разработка

```bash
pnpm dev:web
pnpm build:web
pnpm preview:web
```

### Качество кода

```bash
pnpm lint
pnpm typecheck:web
pnpm format
pnpm duplicates
pnpm duplicates:deep
```

### Directus schema/settings

Dev:

```bash
pnpm schema:apply:dev
pnpm schema:snapshot:dev
pnpm settings:apply:dev
pnpm settings:export:dev
```

Prod:

```bash
pnpm schema:apply:prod
pnpm schema:snapshot:prod
pnpm settings:apply:prod
pnpm settings:export:prod
```

## Как работает контур Directus

При запуске docker-контура:

1. Поднимаются `postgres`, `redis`, `directus`
2. Применяется `schema.json`
3. Directus перезапускается
4. Применяется `directus.settings.json`
5. Поднимается `web`

Это одинаково для `infra/dev` и `infra/prod`.

## Production запуск

1. Подготовить `infra/prod/.env`:

```bash
cp infra/prod/.env.example infra/prod/.env
```

2. Запустить:

```bash
docker compose --env-file infra/prod/.env -f infra/prod/docker-compose.yml up -d --build
```

3. Проверить:

```bash
docker compose --env-file infra/prod/.env -f infra/prod/docker-compose.yml ps
docker compose --env-file infra/prod/.env -f infra/prod/docker-compose.yml logs -f web
```

## CI

Основной workflow: [ci.yml](.github/workflows/ci.yml)

Проверяет:

- `pnpm lint`
- `pnpm -C apps/web typecheck`
- `pnpm -C apps/web build`
- `pnpm prettier --check .`

## Частые проблемы

### `Directus url is not configured`

Проверь `NUXT_PUBLIC_DIRECTUS_URL` в `apps/web/.env` или env docker-сервиса `web`.

### `No access token in login response` при settings apply/export

Проверь:

- `DIRECTUS_ADMIN_EMAIL`
- `DIRECTUS_ADMIN_PASSWORD`
- что сервис `directus` healthy

### Web не видит данные из CMS

Проверь:

- `DIRECTUS_TOKEN`
- доступность `DIRECTUS_INTERNAL_URL` внутри compose-сети
- статус API `web`: `http://<host>:<web_port>/api/health/directus`

## Структура репозитория

```text
.
├─ apps/
│  └─ web/
├─ infra/
│  ├─ dev/
│  └─ prod/
├─ .github/workflows/
├─ package.json
└─ pnpm-workspace.yaml
```
