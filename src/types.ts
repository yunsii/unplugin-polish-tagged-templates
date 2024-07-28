export interface Options {
  /**
   * Default polish extensions: ['ts', 'tsx', 'js', 'jsx'],
   * You can add more polish extensions.
   */
  extensions?: string[]
  /**
   * Specific **class names** tagged templates strings to polish.
   * There is no effect if tagged templates has any variables.
   */
  clsTags?: string[]
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
  /** Custom exclude for better performance */
  exclude?: (id: string) => boolean
  /** Custom processor, default auto */
  processor?: (id: string) => ProcessorType
}

export type PolishCallback = (str: string) => string | void

export interface PolishTag {
  tag: string
  polish: PolishCallback
}

export interface TransformOptions {
  beforeTransform?: () => void
}

export type TransformFn = (
  code: string,
  polishTags: PolishTag[],
  options?: TransformOptions,
) => string

export type ProcessorType = 'ast' | 'string' | 'auto'
