import {
  areDatesEqual,
  CalendarGrid,
  gridCleanUp,
  monthLabels,
  stringToDate,
} from "./utils";

export function makeCombinedGrid(
  startDate?: Date | null,
  githubContributions?: { date: string; level: number; contribution: string }[],
  leetcodeContributions?: {
    date: string;
    level: number;
    contribution: string;
  }[]
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

  // ----------------------------------------------------------------------------------
  // Create a maps of each contributions by date for quick lookup
  const githubContributionMap = new Map<
    string,
    { level: number; contribution: string }
  >();

  const leetcodeContributionMap = new Map<
    string,
    { level: number; contribution: string }
  >();

  githubContributions?.forEach((c) => {
    const dateString = stringToDate(c.date).toDateString();
    githubContributionMap.set(dateString, {
      level: c.level,
      contribution: c.contribution,
    });
  });

  leetcodeContributions?.forEach((c) => {
    const dateString = stringToDate(c.date).toDateString();
    leetcodeContributionMap.set(dateString, {
      level: c.level,
      contribution: c.contribution,
    });
  });

  // ---------------------------------------------------------------------

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

    let levelValue =
      Number(
        (githubContributionMap.get(date.toDateString()) || { level: 0 }).level
      ) +
      Number(
        (leetcodeContributionMap.get(date.toDateString()) || { level: 0 }).level
      );

    let githubContribution = (
      githubContributionMap.get(date.toDateString()) || { contribution: "" }
    ).contribution;

    let leetcodeContribution = (
      leetcodeContributionMap.get(date.toDateString()) || {
        contribution: `0 submissions on ${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
      }
    ).contribution;

    let contributionValue = githubContribution + " " + leetcodeContribution;

    // contributionValue =
    //   (githubContributionMap.get(date.toDateString()) || { contribution: "" })
    //     .contribution +
    //   " " +
    //   (
    //     leetcodeContributionMap.get(date.toDateString()) || {
    //       contribution: `0 submissions on ${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    //     }
    //   ).contribution;

    grid[day][week] = {
      date: new Date(date),
      level: levelValue,
      contribution: contributionValue,
    };

    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  gridCleanUp(grid);

  return [grid, monthWeeks];
}
