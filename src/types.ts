export interface Options {
  /**
   * Default polish extensions: ['ts', 'tsx', 'js', 'jsx'],
   * You can add more polish extensions.
   */
  extensions?: string[]
  /**
   * Specific **CSS** tagged template strings to polish.
   * There is no effect if tagged template has any variables.
   */
  cssTags?: string[]
  /**
   * Custom specific tagged template strings to polish.
   *
   * For example:
   * ```
   * tags: ["cls"]
   * ```
   *
   * then, you can use `polish()` callback to polish cls\`hello\` like tagged template strings,
   * the `polish()` callback will not invoked if tagged template has any variables.
   */
  polishTags?: PolishTag[]
}

export type PolishCallback = (str: string) => string | void

export interface PolishTag {
  tag: string
  polish: PolishCallback
}
