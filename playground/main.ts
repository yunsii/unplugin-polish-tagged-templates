import { cls } from './cls'

import './global.css'

const p1 = document.createElement('p')
p1.className = cls`
  cursor-pointer
  font-bold text-xl
  // hello, world
  text-sky-500
  hover:text-sky-600
`
p1.textContent = 'Hello, world.'

const p2 = document.createElement('p')
p2.className = cls`
  font-bold text-xl
  ${1}
`
p2.textContent = 'Today is great day.'

document.getElementById('app')!.innerHTML = '__UNPLUGIN__'
document.getElementById('app')!.appendChild(p1)
document.getElementById('app')!.appendChild(p2)
