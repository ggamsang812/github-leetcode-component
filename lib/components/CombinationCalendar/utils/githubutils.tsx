import {
  CalendarGrid,
  stringToDate,
  areDatesEqual,
  gridCleanUp,
} from "./utils";

export function makeGithubGrid(
  startDate?: Date | null,
  contributions?: { date: string; level: number; contribution: string }[]
): [CalendarGrid, Array<any>] {
  // Default start date to one year before today if not provided
  const today = new Date();

  startDate = startDate
    ? new Date(startDate)
    : new Date(today.setFullYear(today.getFullYear() - 1));
  // Initialize the grid with 7 rows and 53 columns
  const grid: CalendarGrid = Array.from({ length: 7 }, () =>
    Array(54).fill({ date: null, level: 0, contribution: "" })
  );
  const monthWeeks = Array(13).fill(null);

  // Create a map of contributions by date for quick lookup
  const contributionMap = new Map<
    string,
    { level: number; contribution: string }
  >();

  contributions?.forEach((c) => {
    const dateString = stringToDate(c.date).toDateString();
    contributionMap.set(dateString, {
      level: c.level,
      contribution: c.contribution,
    });
  });

  let date = new Date(startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1); // End date one year from start date

  // To fix the bug when startDate is today, it wouldn't include today in the grid
  if (areDatesEqual(endDate, today)) {
    date.setDate(date.getDate() - 1);
    endDate.setDate(endDate.getDate() + 1);
  }

  const startDayOfWeek = date.getDay(); // Sunday - Saturday: 0 - 6

  let week = 0;
  let day = startDayOfWeek;
  let count = 0;

  while (date < endDate) {
    if (day === 7) {
      day = 0;
      week++;
    }
    const month = date.getMonth();
    monthWeeks[month] = week - 1;

    grid[day][week] = {
      date: new Date(date),
      level: (contributionMap.get(date.toDateString()) || { level: 0 }).level,
      contribution: (
        contributionMap.get(date.toDateString()) || { contribution: "" }
      ).contribution,
    };

    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  gridCleanUp(grid);

  return [grid, monthWeeks];
}
