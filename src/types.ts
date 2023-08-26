export interface Options {
  /**
   * Default polish extensions: ['ts', 'tsx', 'js', 'jsx'],
   * You can add more polish extensions.
   */
  extensions?: string[]
  /**
   * Specific **CSS** tagged templates strings to polish.
   * There is no effect if tagged templates has any variables.
   */
  cssTags?: string[]
  /**
   * Custom specific tagged templates strings to polish.
   *
   * For example:
   * ```
   * tags: ["cls"]
   * ```
   *
   * then, you can use `polish()` callback to polish cls\`hello\` like tagged templates,
   * the `polish()` callback will not invoked if tagged templates has any variables.
   */
  polishTags?: PolishTag[]
  debug?: boolean
}

export type PolishCallback = (str: string) => string | void

export interface PolishTag {
  tag: string
  polish: PolishCallback
}
