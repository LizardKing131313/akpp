const escapeXmlText = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const xmlTag = (tagName: string, innerText: string): string =>
  `<${tagName}>${escapeXmlText(innerText)}</${tagName}>`

export const xmlRawTag = (tagName: string, innerXml: string): string =>
  `<${tagName}>${innerXml}</${tagName}>`

export const xmlDoc = (innerXml: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n${innerXml}\n`
