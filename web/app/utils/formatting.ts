const paddedNumber = (number: number) => { 
  return number.toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  )
}

const humanizedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export { paddedNumber, humanizedDate }