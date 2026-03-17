import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const coverageDir = path.join(rootDir, 'apps', 'web', 'coverage')
const badgesDir = path.join(rootDir, '.github', 'badges')

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

const coverageSummary = await readJson(path.join(coverageDir, 'coverage-summary.json'))
const testResults = await readJson(path.join(coverageDir, 'test-results.json'))

const coverageValue = Number(coverageSummary.total?.lines?.pct ?? 0)
const passedTests = Number(testResults.numPassedTests ?? 0)
const failedTests = Number(testResults.numFailedTests ?? 0)
const totalTests = Number(testResults.numTotalTests ?? 0)
const testsSucceeded = failedTests === 0 && totalTests > 0

const testsMessage = testsSucceeded
  ? `${passedTests} passing`
  : `${passedTests}/${totalTests} passing`

const testsColor = testsSucceeded ? 'brightgreen' : 'red'

await mkdir(badgesDir, { recursive: true })

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
