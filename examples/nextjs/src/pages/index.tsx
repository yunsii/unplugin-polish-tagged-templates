import { raw } from '@/helpers/tags'
import { useState } from 'react'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [count, setCount] = useState(0)

  const mainClassName = raw`flex min-h-screen flex-col items-center justify-between p-24`

  return (
    <main className={mainClassName}>
      <button type='button' onClick={() => setCount(count + 1)}>
        click
        {count}
      </button>
      <p
        className={raw`
          cursor-pointer
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

export default Home
