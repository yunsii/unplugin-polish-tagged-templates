const a = cls``

const b = cls`

`

const c = cls`relative`

const d = cls`relative
  \${foo}
  \${
    bar
  }
`

const e = cls`relative
  ${foo}
  ${bar}
  relative
`

const f = cls`${item.value} size-4 shrink-0 md:h-5 md:w-6`
