import { monthLabels, areDatesEqual, CalendarGrid, stringToDate, gridCleanUp } from "./utils";

interface Contribution {
  date: string;
  level: number;
  contribution: string;
}

export function unixToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
}

export function convertDateFormat(date: string): string {
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// Function to determine the contribution level
export function getContributionLevel(contributions: number): number {
  if (contributions === 0) return 0;
  if (contributions < 2) return 1;
  if (contributions < 4) return 2;
  return 3;
}

// Function to generate the contribution message
export function getContributionMessage(
  date: string,
  contributions: number
): string {
  // `0 submissions on ${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  const month = monthLabels[Number(date.substring(5, 7)) - 1];
  const dateNumber = date.substring(8);
  const checkLeadingZero = parseInt(dateNumber, 10).toString();
  const yearNumber = date.substring(0, 4);

  return `${contributions} submissions on ${month} ${checkLeadingZero}, ${yearNumber}`;
}

const populateContribution = ([date, contributions]: [string, number]): {
  date: string;
  level: number;
  contribution: string;
} => {
  const formattedDate = convertDateFormat(date);
  const contributionLevel = getContributionLevel(contributions);
  const contributionMessage = getContributionMessage(
    formattedDate,
    contributions
  );
  return {
    date: formattedDate,
    level: contributionLevel,
    contribution: contributionMessage,
  };
};

export const transformCalendarData = (submissionCalendar: {
  [key: string]: number;
}): Contribution[] => {
  return Object.entries(submissionCalendar).map(populateContribution);
};

export function makeLeetcodeGrid(
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
        contributionMap.get(date.toDateString()) || {
          contribution: `0 submissions on ${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
        }
      ).contribution,
    };

    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  gridCleanUp(grid);

  return [grid, monthWeeks];
}