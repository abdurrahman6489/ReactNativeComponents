export const printInReadableFormat = (data: any, title: string = '') => {
  if (!!title) console.log(title);
  console.log(JSON.stringify(data, null, 2));
};

export const isSameDate = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getDate() === secondDate.getDate() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getFullYear() === secondDate.getFullYear()
  );
};
