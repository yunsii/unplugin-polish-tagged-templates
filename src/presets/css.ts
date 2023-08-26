export function polishCssClass(str: string) {
  return `${str
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' ')}`
}
