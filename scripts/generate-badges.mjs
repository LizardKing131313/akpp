import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const coverageDir = path.join(rootDir, 'apps', 'web', 'coverage')
const badgesDir = path.join(rootDir, '.github', 'badges')
const lighthouseDir = path.join(rootDir, '.lighthouseci')

const readJson = async (filePath) => {
  const fileContents = await readFile(filePath, 'utf8')
  return JSON.parse(fileContents)
}

const formatPercent = (value) => {
  return `${Number(value).toFixed(2)}%`
}

const getCoverageColor = (value) => {
  if (value >= 90) return 'brightgreen'
  if (value >= 80) return 'green'
  if (value >= 70) return 'yellowgreen'
  if (value >= 60) return 'yellow'
  if (value >= 50) return 'orange'
  return 'red'
}

const createBadge = (label, message, color) => {
  return {
    schemaVersion: 1,
    label,
    message,
    color,
  }
}

const formatScore = (value) => {
  return `${Math.round(Number(value) * 100)}%`
}

await mkdir(badgesDir, { recursive: true })
const generatedBadges = []

const coverageSummaryPath = path.join(coverageDir, 'coverage-summary.json')
const testResultsPath = path.join(coverageDir, 'test-results.json')

if (existsSync(coverageSummaryPath) && existsSync(testResultsPath)) {
  const coverageSummary = await readJson(coverageSummaryPath)
  const testResults = await readJson(testResultsPath)
  const coverageValue = Number(coverageSummary.total?.lines?.pct ?? 0)
  const passedTests = Number(testResults.numPassedTests ?? 0)
  const failedTests = Number(testResults.numFailedTests ?? 0)
  const totalTests = Number(testResults.numTotalTests ?? 0)
  const testsSucceeded = failedTests === 0 && totalTests > 0

  const testsMessage = testsSucceeded
    ? `${passedTests} passing`
    : `${passedTests}/${totalTests} passing`

  const testsColor = testsSucceeded ? 'brightgreen' : 'red'

  await writeFile(
    path.join(badgesDir, 'tests.json'),
    `${JSON.stringify(createBadge('tests', testsMessage, testsColor), null, 2)}\n`,
    'utf8'
  )

  await writeFile(
    path.join(badgesDir, 'coverage.json'),
    `${JSON.stringify(
      createBadge('coverage', formatPercent(coverageValue), getCoverageColor(coverageValue)),
      null,
      2
    )}\n`,
    'utf8'
  )

  generatedBadges.push('tests', 'coverage')
}

const lighthouseManifestPath = path.join(lighthouseDir, 'manifest.json')

if (existsSync(lighthouseManifestPath)) {
  const lighthouseManifest = await readJson(lighthouseManifestPath)
  const representativeRun = lighthouseManifest.find((entry) => entry.isRepresentativeRun) ?? null

  if (!representativeRun?.summary) {
    throw new Error('Lighthouse representative run summary is missing')
  }

  const lighthousePerformance = Number(representativeRun.summary.performance ?? 0)
  const lighthouseSeo = Number(representativeRun.summary.seo ?? 0)

  await writeFile(
    path.join(badgesDir, 'lighthouse-performance.json'),
    `${JSON.stringify(
      createBadge(
        'lh perf',
        formatScore(lighthousePerformance),
        getCoverageColor(lighthousePerformance * 100)
      ),
      null,
      2
    )}\n`,
    'utf8'
  )

  await writeFile(
    path.join(badgesDir, 'lighthouse-seo.json'),
    `${JSON.stringify(
      createBadge('lh seo', formatScore(lighthouseSeo), getCoverageColor(lighthouseSeo * 100)),
      null,
      2
    )}\n`,
    'utf8'
  )

  generatedBadges.push('lighthouse-performance', 'lighthouse-seo')
}

if (generatedBadges.length === 0) {
  throw new Error('No badge sources found')
}
