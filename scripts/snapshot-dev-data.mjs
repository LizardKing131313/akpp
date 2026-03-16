import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const mode = process.argv[2]
const rootDirectory = process.cwd()
const dataDirectory = path.join(rootDirectory, 'infra', 'dev', 'data')
const postgresDirectory = path.join(dataDirectory, 'postgres')
const uploadsDirectory = path.join(dataDirectory, 'uploads')
const composeArgs = [
  'compose',
  '--env-file',
  'infra/dev/.env',
  '-f',
  'infra/dev/docker-compose.yml',
]
const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: rootDirectory,
    encoding: null,
  })

  if (result.status !== 0) {
    if (result.stderr) {
      process.stderr.write(result.stderr)
    }

    process.exit(result.status ?? 1)
  }

  return result.stdout ?? Buffer.alloc(0)
}

const writeSnapshot = (directory, fileName, content) => {
  mkdirSync(directory, { recursive: true })
  const filePath = path.join(directory, fileName)
  writeFileSync(filePath, content)
  console.log(filePath)
}

const snapshotPostgres = () => {
  const dump = run('docker', [
    ...composeArgs,
    'exec',
    '-T',
    'postgres',
    'sh',
    '-lc',
    'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists --no-owner',
  ])

  writeSnapshot(postgresDirectory, `postgres-${timestamp}.sql`, dump)
}

const snapshotUploads = () => {
  const archive = run('docker', [
    ...composeArgs,
    'exec',
    '-T',
    'directus',
    'sh',
    '-lc',
    'cd /directus/uploads && tar -czf - .',
  ])

  writeSnapshot(uploadsDirectory, `uploads-${timestamp}.tar.gz`, archive)
}

if (mode === 'postgres') {
  snapshotPostgres()
  process.exit(0)
}

if (mode === 'uploads') {
  snapshotUploads()
  process.exit(0)
}

if (mode === 'all') {
  snapshotPostgres()
  snapshotUploads()
  process.exit(0)
}

process.stderr.write('Usage: node scripts/snapshot-dev-data.mjs <postgres|uploads|all>\n')
process.exit(1)
