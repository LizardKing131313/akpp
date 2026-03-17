import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const coverageDir = path.join(rootDir, 'apps', 'web', 'coverage')
const badgesDir = path.join(rootDir, '.github', 'badges')
const lighthouseQualityDir = path.join(rootDir, '.lighthouseci-quality')
const lighthousePerformanceDir = path.join(rootDir, '.lighthouseci-performance')
const productionLighthouseUrl = 'https://expertakpp.ru/'
const lighthouseBadgeNames = [
  'lighthouse-performance',
  'lighthouse-accessibility',
  'lighthouse-best-practices',
  'lighthouse-seo',
]

const readJson = async (filePath) => {
  const fileContents = await readFile(filePath, 'utf8')
  return JSON.parse(fileContents)
}

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const badgeColorMap = {
  brightgreen: '#4c1',
  green: '#97ca00',
  yellowgreen: '#a4a61d',
  yellow: '#dfb317',
  orange: '#fe7d37',
  red: '#e05d44',
  lightgrey: '#9f9f9f',
}

const getBadgeColorHex = (color) => badgeColorMap[color] ?? color

const getTextWidth = (value) => Math.max(String(value).length * 7 + 10, 20)

const createBadgeSvg = (label, message, color) => {
  const leftWidth = getTextWidth(label)
  const rightWidth = getTextWidth(message)
  const totalWidth = leftWidth + rightWidth
  const leftCenter = Math.round(leftWidth / 2)
  const rightCenter = leftWidth + Math.round(rightWidth / 2)
  const labelText = escapeXml(label)
  const messageText = escapeXml(message)
  const fillColor = getBadgeColorHex(color)

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${labelText}: ${messageText}">`,
    '<linearGradient id="s" x2="0" y2="100%">',
    '<stop offset="0" stop-color="#fff" stop-opacity=".7"/>',
    '<stop offset=".1" stop-color="#aaa" stop-opacity=".1"/>',
    '<stop offset=".9" stop-opacity=".3"/>',
    '<stop offset="1" stop-opacity=".5"/>',
    '</linearGradient>',
    '<clipPath id="r">',
    `<rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>`,
    '</clipPath>',
    '<g clip-path="url(#r)">',
    `<rect width="${leftWidth}" height="20" fill="#555"/>`,
    `<rect x="${leftWidth}" width="${rightWidth}" height="20" fill="${fillColor}"/>`,
    `<rect width="${totalWidth}" height="20" fill="url(#s)"/>`,
    '</g>',
    '<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">',
    `<text x="${leftCenter}" y="15" fill="#010101" fill-opacity=".3">${labelText}</text>`,
    `<text x="${leftCenter}" y="14">${labelText}</text>`,
    `<text x="${rightCenter}" y="15" fill="#010101" fill-opacity=".3">${messageText}</text>`,
    `<text x="${rightCenter}" y="14">${messageText}</text>`,
    '</g>',
    '</svg>',
    '',
  ].join('\n')
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

const findProductionRuns = (manifest) =>
  manifest.filter(
    (entry) =>
      typeof entry?.url === 'string' &&
      entry.url.startsWith(productionLighthouseUrl) &&
      entry.summary
  )

const getMedian = (values) => {
  const sortedValues = [...values].sort((left, right) => left - right)
  const middleIndex = Math.floor(sortedValues.length / 2)

  if (sortedValues.length % 2 === 1) {
    return sortedValues[middleIndex]
  }

  return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2
}

const writeBadgeFiles = async (name, label, message, color) => {
  const badge = createBadge(label, message, color)

  await writeFile(
    path.join(badgesDir, `${name}.json`),
    `${JSON.stringify(badge, null, 2)}\n`,
    'utf8'
  )
  await writeFile(
    path.join(badgesDir, `${name}.svg`),
    createBadgeSvg(label, message, color),
    'utf8'
  )
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

  await writeBadgeFiles('tests', 'tests', testsMessage, testsColor)
  await writeBadgeFiles(
    'coverage',
    'coverage',
    formatPercent(coverageValue),
    getCoverageColor(coverageValue)
  )

  generatedBadges.push('tests', 'coverage')
}

const lighthouseQualityManifestPath = path.join(lighthouseQualityDir, 'manifest.json')

if (existsSync(lighthouseQualityManifestPath)) {
  const lighthouseQualityManifest = await readJson(lighthouseQualityManifestPath)
  const representativeRun =
    findProductionRuns(lighthouseQualityManifest).find((entry) => entry.isRepresentativeRun) ?? null

  if (!representativeRun) {
    throw new Error('Lighthouse quality representative run summary is missing')
  }

  const lighthouseAccessibility = Number(representativeRun.summary.accessibility ?? 0)
  const lighthouseBestPractices = Number(representativeRun.summary['best-practices'] ?? 0)
  const lighthouseSeo = Number(representativeRun.summary.seo ?? 0)

  await writeBadgeFiles(
    'lighthouse-accessibility',
    'lh a11y',
    formatScore(lighthouseAccessibility),
    getCoverageColor(lighthouseAccessibility * 100)
  )
  await writeBadgeFiles(
    'lighthouse-best-practices',
    'lh best',
    formatScore(lighthouseBestPractices),
    getCoverageColor(lighthouseBestPractices * 100)
  )
  await writeBadgeFiles(
    'lighthouse-seo',
    'lh seo',
    formatScore(lighthouseSeo),
    getCoverageColor(lighthouseSeo * 100)
  )

  generatedBadges.push('lighthouse-accessibility', 'lighthouse-best-practices', 'lighthouse-seo')
}

const lighthousePerformanceManifestPath = path.join(lighthousePerformanceDir, 'manifest.json')

if (existsSync(lighthousePerformanceManifestPath)) {
  const lighthousePerformanceManifest = await readJson(lighthousePerformanceManifestPath)
  const performanceRuns = findProductionRuns(lighthousePerformanceManifest)
  const performanceValues = performanceRuns
    .map((entry) => Number(entry.summary.performance ?? Number.NaN))
    .filter((value) => Number.isFinite(value))

  if (performanceValues.length === 0) {
    throw new Error('Lighthouse performance run summary is missing')
  }

  const lighthousePerformance = getMedian(performanceValues)

  await writeBadgeFiles(
    'lighthouse-performance',
    'lh perf',
    formatScore(lighthousePerformance),
    getCoverageColor(lighthousePerformance * 100)
  )

  generatedBadges.push('lighthouse-performance')
}

if (generatedBadges.length === 0) {
  const existingBadgeNames = ['tests', 'coverage', ...lighthouseBadgeNames].filter((name) =>
    existsSync(path.join(badgesDir, `${name}.json`))
  )

  for (const name of existingBadgeNames) {
    const badge = await readJson(path.join(badgesDir, `${name}.json`))

    await writeFile(
      path.join(badgesDir, `${name}.svg`),
      createBadgeSvg(badge.label, badge.message, badge.color),
      'utf8'
    )
  }

  generatedBadges.push(...existingBadgeNames)
}

if (generatedBadges.length === 0) {
  throw new Error('No badge sources found')
}
