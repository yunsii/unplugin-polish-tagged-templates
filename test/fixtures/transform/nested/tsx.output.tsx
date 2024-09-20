import { useState } from 'react'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [count, setCount] = useState(0)

  const mainClassName = cls`flex ${123} ${true ? "absolute" : `relative`} min-h-screen flex-col items-center justify-between p-24`

  return (
    <main className={mainClassName}>
      <button onClick={() => setCount(count + 1)}>click {count}</button>
      <p
        className={"cursor-pointer font-bold text-xl text-sky-500 hover:text-sky-600"}
      >
        Hello, world
      </p>
      <p
        className={"bg-f-bg-container h-full p-8 [&_[class*=\"form-item-label\"]>label]:text-sm [&_[class*=\"form-item-label\"]>label]:font-semibold"}
      >
        Hello, world 2
      </p>
    </main>
  );
}

export default Home
