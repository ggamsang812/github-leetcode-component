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

  // Added this part to mass around with the first column of the gird
  // this might be something I need to keep my eye on
  // deletes empty space in the grid which doesn't have any data in from the front
  for (let index = 0; index < 7; index++) {
    if (grid[index][0].contribution === "") {
      grid[index][0] = {
        date: null,
        level: 0,
        contribution: "",
      };
    }
  }

  const firstColumnIndex = 0;
  let isFirstColumnNull = true;
  for (let day = 0; day < 7; day++) {
    if (grid[day][firstColumnIndex].date !== null) {
      isFirstColumnNull = false;
      break;
    }
  }

  if (isFirstColumnNull) {
    for (let day = 0; day < 7; day++) {
      grid[day].splice(firstColumnIndex, 1); // Remove the first column if all rows are null
    }
  }
};