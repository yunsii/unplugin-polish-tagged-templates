# unplugin-polish-tagged-templates

[![NPM version](https://img.shields.io/npm/v/unplugin-polish-tagged-templates?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-polish-tagged-templates) [![Download monthly](https://img.shields.io/npm/dm/unplugin-polish-tagged-templates.svg)](https://www.npmjs.com/package/unplugin-polish-tagged-templates)

Remove unnecessary [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) at compile time.

## Features

- 🦄 [Unified plugin](https://github.com/unjs/unplugin), support Vite/Rollup/Webpack/Nuxt/esbuild
- 💎 polish **class names** tagged templates as preset
  - Support comment start with `//`
- 🛠️ Custom tagged templates to polish

> Only polish tagged templates in non-development environment.

## Example

With the config:

```tsx
polishTaggedTemplates({
  cssTags: ['cls'],
})
```

It will polish code from:

```tsx
const className = cls`
  cursor-pointer
  font-bold text-xl
  // comment here
  text-sky-500
  hover:text-sky-600
`

function Component() {
  return (
    <p
      className={cls`
        cursor-pointer
        font-bold text-xl
        // comment here
        text-sky-500
        hover:text-sky-600
      `}
      // ...
    >
      Hi
    </p>
  )
}
```

to

```tsx
const className = "cursor-pointer font-bold text-xl text-sky-500 hover:text-sky-600"

function Component() {
  return (
    <p
      className={"cursor-pointer font-bold text-xl text-sky-500 hover:text-sky-600"}
      // ...
    >
      Hi
    </p>
  )
}
```

However, there is no effect if tagged templates has any variables.

This plugin make you free to use tagged templates to composite class name or others aims, and remove unnecessary tagged templates at compile time.

## Install

```bash
npm i unplugin-polish-tagged-templates
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import polishTaggedTemplates from 'unplugin-polish-tagged-templates/vite'

export default defineConfig({
  plugins: [
    polishTaggedTemplates({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import polishTaggedTemplates from 'unplugin-polish-tagged-templates/rollup'

export default {
  plugins: [
    polishTaggedTemplates({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-polish-tagged-templates/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-polish-tagged-templates/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-polish-tagged-templates/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import polishTaggedTemplates from 'unplugin-polish-tagged-templates/esbuild'

build({
  plugins: [polishTaggedTemplates()],
})
```

<br></details>

## Related

* [tagged-classnames-free](https://github.com/yunsii/tagged-classnames-free) - Free to tagged classnames.
