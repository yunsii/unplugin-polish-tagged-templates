const className: string = "cursor-pointer font-bold text-xl text-sky-500 hover:text-sky-600"

const className2 = cls`
  cursor-pointer
  font-bold text-xl
  ${123} ${true ? "absolute" : "relative"}
  // comment here
  text-sky-500
  hover:text-sky-600
`
