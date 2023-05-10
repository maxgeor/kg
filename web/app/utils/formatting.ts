const paddedNumber = (number: number) => { 
  return number.toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  )
}

export { paddedNumber }