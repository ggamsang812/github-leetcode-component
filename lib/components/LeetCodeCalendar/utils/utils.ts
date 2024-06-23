export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type CalendarGrid = {
  date: Date | null;
  level: number;
  contribution: string;
}[][];

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const stringToDate = (initDate: string) => {
  const date = new Date(initDate);
  date.setDate(date.getDate() + 1);
  return date;
};

export const gridCleanUp = (grid: CalendarGrid) => {
  const lastColumnIndex = 53;
  let isLastColumnNull = true;
  for (let day = 0; day < 7; day++) {
    if (grid[day][lastColumnIndex].date !== null) {
      isLastColumnNull = false;
      break;
    }
  }

  if (isLastColumnNull) {
    for (let day = 0; day < 7; day++) {
      grid[day].pop(); // Remove the last column
    }
  }
};
