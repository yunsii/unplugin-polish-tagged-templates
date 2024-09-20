// toString(): /(?<!\\)`((\r\n|\r|\n|.)*?)(?<!\\)`/gm
// source: (?<!\\)`((\r\n|\r|\n|.)*?)(?<!\\)`
export const templateRegExp = /(?<!\\)`((\r\n|[\r\n]|.)*?)(?<!\\)`/g

export const templateExpressionRegExp = /(?<!\\)\$\{((\r\n|[\r\n]|.)*?)\}/g

export function getTaggedTemplatesRegExp(tags: string[]) {
  return new RegExp(`(${tags.join('|')})${templateRegExp.source}`, 'gm')
}

// templateExpressionRegExp.test("${item.value} size-4 shrink-0 md:h-5 md:w-6") // => false
// templateExpressionRegExp.test(" ${item.value} size-4 shrink-0 md:h-5 md:w-6") // => true
// '${item.value} size-4 shrink-0 md:h-5 md:w-6'.match(templateExpressionRegExp) // => ['${item.value}']
export function templateStringContainsExpression(str: string) {
  const result = str.match(templateExpressionRegExp)

  return result && !!result.length
}

export function unescapeTemplateString(str: string) {
  const reg = /\\(.)/g
  return str.replace(reg, '$1')
}

export function containsTaggedTemplate(tags: string[], str: string) {
  const parseReg = new RegExp(`(${tags.join('|')})\``, 'gm')
  return parseReg.test(str)
}

export function checkTemplateNested(str: string) {
  const result = str.match(templateExpressionRegExp)

  if (!result) {
    return false
  }

  return result.some((item) => item.includes('`'))
}

export function checkTaggedTemplatesNested(tags: string[], str: string) {
  if (!containsTaggedTemplate(tags, str)) {
    return false
  }
  const result = str.match(templateExpressionRegExp)

  if (!result) {
    return false
  }

  return result.some((item) => item.includes('`'))
}
