const className = cls`
  cursor-pointer
  font-bold text-xl
  // comment here
  text-sky-500
  hover:text-sky-600
  \`test
`

const className2 = cls`
  cursor-pointer
  font-bold text-xl
  ${123} ${true ? cls`absolute` : `relative`}
  // comment here
  text-sky-500
  hover:text-sky-600
`
