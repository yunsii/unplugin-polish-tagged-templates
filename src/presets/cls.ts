export function polishClsString(str: string) {
  return str
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => {
      // Remove comment
      return !item.startsWith('//')
    })
    .map((item) => {
      return item.replace(/[ \t]{2,}/g, ' ')
    })
    .join(' ')
}
