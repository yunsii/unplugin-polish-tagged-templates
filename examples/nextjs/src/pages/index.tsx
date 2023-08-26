import { useState } from 'react'

import { raw } from '@/helpers/tags'

export default function Home() {
  const [count, setCount] = useState(0)

  const mainClassName = raw`flex min-h-screen flex-col items-center justify-between p-24`

  return (
    <main className={mainClassName}>
      <button onClick={() => setCount(count + 1)}>click {count}</button>
      <p
        className={raw`cursor-pointer
          font-bold text-xl
          text-sky-500
          hover:text-sky-600
        `}
      >
        Hello, world
      </p>
    </main>
  )
}
