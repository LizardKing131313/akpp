# AKPP

[![CI](https://github.com/LizardKing131313/akpp/actions/workflows/ci.yml/badge.svg)](https://github.com/LizardKing131313/akpp/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/LizardKing131313/akpp/main/.github/badges/tests.json)](https://github.com/LizardKing131313/akpp/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/LizardKing131313/akpp/main/.github/badges/coverage.json)](https://github.com/LizardKing131313/akpp/actions/workflows/ci.yml)
[![CI Meta](https://github.com/LizardKing131313/akpp/actions/workflows/ci-meta.yml/badge.svg)](https://github.com/LizardKing131313/akpp/actions/workflows/ci-meta.yml)

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
- `NUXT_PUBLIC_DIRECTUS_PUBLIC_URL`
- `NUXT_DIRECTUS_INTERNAL_URL`
- `NUXT_DIRECTUS_TOKEN`
- `NUXT_DIRECTUS_CACHE_TTL_SECONDS`
- `NUXT_PUBLIC_YANDEX_MAP_API_KEY`
- `NUXT_PUBLIC_YANDEX_ORG_ID`

Шаблон: [apps/web/.env.example](/apps/web/.env.example)

### `infra/dev/.env`

Шаблон: [infra/dev/.env.example](/infra/dev/.env.example)

Важно заполнить:

- `DIRECTUS_KEY` и `DIRECTUS_SECRET` (минимум 32 символа)
- `DIRECTUS_ADMIN_EMAIL` и `DIRECTUS_ADMIN_PASSWORD`
- `NUXT_DIRECTUS_TOKEN` (токен для web API запросов к Directus)
- `NUXT_PUBLIC_DIRECTUS_PUBLIC_URL` (публичный URL Directus для браузера)
- `NUXT_DIRECTUS_INTERNAL_URL` (внутренний URL Directus внутри compose-сети)

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
pnpm test:web
pnpm test:web:unit
pnpm test:web:nuxt
pnpm test:web:e2e
pnpm test:web:coverage
pnpm format
pnpm duplicates
pnpm duplicates:deep
```

## Тесты

В проекте настроены три уровня тестов для `apps/web`:

- `unit` - чистая логика и утилиты
- `nuxt` - composables и код, которому нужен Nuxt runtime
- `e2e` - smoke-проверки Nitro маршрутов

Основные команды:

```bash
pnpm test:web
pnpm test:web:unit
pnpm test:web:nuxt
pnpm test:web:e2e
pnpm test:web:coverage
pnpm badges:generate
```

Что сейчас проверяется:

- pure helpers в `shared/lib`
- helper composables в `app/composables`
- базовые Nitro маршруты

Бейджи тестов и покрытия в README обновляются автоматически из CI на ветке `main`.

Отчет coverage генерируется командой `pnpm test:web:coverage` в каталог `apps/web/coverage`.
JSON для бейджей генерируются командой `pnpm badges:generate` в каталог `.github/badges`.

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
- `pnpm -C apps/web test`
- `pnpm -C apps/web test:coverage`
- `pnpm -C apps/web build`
- `pnpm prettier --check .`

Coverage-отчет из CI публикуется как artifact `web-coverage`.
После успешного прогона на `main` CI также обновляет `.github/badges/tests.json` и `.github/badges/coverage.json`.

## Pre-commit

Перед коммитом выполняются:

- `pnpm lint-staged`
- `pnpm typecheck:web`
- `pnpm test:web`

## Частые проблемы

### `Directus url is not configured`

Проверь `NUXT_DIRECTUS_INTERNAL_URL` в `apps/web/.env` или env docker-сервиса `web`.

### `No access token in login response` при settings apply/export

Проверь:

- `DIRECTUS_ADMIN_EMAIL`
- `DIRECTUS_ADMIN_PASSWORD`
- что сервис `directus` healthy

### Web не видит данные из CMS

Проверь:

- `NUXT_DIRECTUS_TOKEN`
- доступность `NUXT_DIRECTUS_INTERNAL_URL` внутри compose-сети
- доступность Directus из контейнера `web`

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
