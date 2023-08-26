# unplugin-polish-string

[![NPM version](https://img.shields.io/npm/v/unplugin-polish-string?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-polish-string)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit yunsii/unplugin-polish-string my-unplugin
```

And do a global replacement of `unplugin-polish-string`` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev` To release a new version, run: `pnpm run release`

## Install

```bash
npm i unplugin-polish-string
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-polish-string/vite'

export default defineConfig({
  plugins: [
    Starter({
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
import Starter from 'unplugin-polish-string/rollup'

export default {
  plugins: [
    Starter({
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
    require('unplugin-polish-string/webpack')({
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
      'unplugin-polish-string/nuxt',
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
      require('unplugin-polish-string/webpack')({
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
import Starter from 'unplugin-polish-string/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>
