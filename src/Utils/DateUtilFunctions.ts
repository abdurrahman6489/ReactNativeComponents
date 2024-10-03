export const findTheIndexOfDayOfTheMonth = (
  year: number,
  month: number,
  date: number = 1,
) => {
  const dayIndex = new Date(year, month, date).getDay();
  return dayIndex;
};

export const findTheLastDateOfTheMonth = (year: number, month: number) => {
  const nextMonthFirstDate: any = new Date(year, month + 1, 1);
  const lastDateCurrentMonth = new Date(nextMonthFirstDate - 1);
  return lastDateCurrentMonth.getDate();
};

export const findTheFirstDayOfTheWeekArray = (
  yearInInitialDate: number,
  monthInInitialDate: number,
) => {
  const firstDate = 1;
  const firstDateIndex = findTheIndexOfDayOfTheMonth(
    yearInInitialDate,
    monthInInitialDate,
    firstDate,
  );
  const firstDayOfTheWeekArray = [firstDate];
  let firstDayOfTheWeek = firstDate + 7 - firstDateIndex;
  while (firstDayOfTheWeek <= 31) {
    let date = firstDayOfTheWeek;
    firstDayOfTheWeekArray.push(date);
    firstDayOfTheWeek += 7;
  }
  return firstDayOfTheWeekArray;
};

export const getTheCalendarArray = (
  firstDateIndex: number,
  lastDate: number,
  firstDayOfTheWeekArray: number[],
) => {
  let monthlyCalendarArray = [];
  let initialEmptyArray: string[] = [];
  for (let i = 0; i < 7; i++) {
    if (i < firstDateIndex) initialEmptyArray.push('');
    else {
      const date = i - firstDateIndex + 1;
      const stringDate = String(date);
      initialEmptyArray.push(stringDate);
    }
  }
  monthlyCalendarArray.push(initialEmptyArray);
  const lastRow = firstDayOfTheWeekArray.length;
  for (let i = 1; i < lastRow; i++) {
    let weeklyArray: string[] = [];
    let isDateAvailable = true;
    for (let j = 0; j < 7; j++) {
      let firstDateOfTheWeek = firstDayOfTheWeekArray[i];
      const date = j + firstDateOfTheWeek;
      const stringDate = String(date);
      if (date <= lastDate) {
        weeklyArray.push(stringDate);
        isDateAvailable;
      } else {
        weeklyArray.push('');
      }
    }

    if (weeklyArray.some(date => date)) monthlyCalendarArray.push(weeklyArray);
  }
  return monthlyCalendarArray;
};

export const DEFAULT_STARTING_YEAR = 1900;
export const DEFAULT_ENDING_YEAR = 2100;
export const INITIAL_YEARS_COUNT = DEFAULT_ENDING_YEAR - DEFAULT_STARTING_YEAR;

export const createYearList = (
  toYear: number = DEFAULT_ENDING_YEAR,
  fromYear: number = DEFAULT_STARTING_YEAR,
) => {
  let outputYearList = [];
  for (let i = fromYear; i <= toYear; i++) {
    const year = i;
    outputYearList.push(year);
  }
  return outputYearList;
};