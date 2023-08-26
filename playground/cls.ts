import clsx from 'clsx'

function normalizeStrings(strings: string[]) {
  const result: string[] = []
  strings.forEach((stringItem) => {
    stringItem
      .split('\n')
      .map((item) => item.trim())
      // 支持使用 // 的行注释
      .filter((item) => !item.startsWith('//') && !!item)
      .forEach((item) => result.push(item))
  })
  return result
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
export default function cls(
  strings: TemplateStringsArray,
  ...expressions: any[]
) {
  const classNamesList = strings.reduce((prev, current, currentIndex) => {
    const expression = expressions[currentIndex] || ''
    prev.push(current, clsx(expression))
    return prev
  }, [] as string[])
  const result = normalizeStrings(classNamesList).join(' ')
  return result
}

export { cls, clsx }
