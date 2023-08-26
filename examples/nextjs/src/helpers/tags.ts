export function raw(strings: TemplateStringsArray, ...expressions: any[]) {
  return strings
    .reduce((prev, current, currentIndex) => {
      const expression = expressions[currentIndex] || ''
      prev.push(current, expression)
      return prev
    }, [] as string[])
    .join(' ')
}
