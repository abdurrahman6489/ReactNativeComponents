export const printInReadableFormat = (data: any, title: string = '') => {
  if (!!title) console.log(title);
  console.log(JSON.stringify(data, null, 2));
};
