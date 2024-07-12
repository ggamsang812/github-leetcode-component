import {
  areDatesEqual,
  CalendarGrid,
  gridCleanUp,
  monthLabels,
  stringToDate,
  addOrdinalSuffix,
  extractSubmission,
} from "./utils";

function getContributionString(
  githubContribution: string,
  leetcodeContribution: string,
  dateString: string
): string {
  const datePattern =
    /(\d+\s+\w+(?:\s+\w+)?)(?:\s+on\s+\w+\s+\d+(?:[a-z]{2})?(?:,\s*\d{4})?)/g;

  if (githubContribution[0] === "N" && leetcodeContribution[0] === "0") {
    return `No activities on ${dateString}`;
  }
  if (leetcodeContribution[0] === "0") {
    return githubContribution;
  }
  if (githubContribution[0] === "N") {
    return `${extractSubmission(leetcodeContribution)} on ${dateString}.`;
  }

  const matches = [];
  let match;
  while (
    (match = datePattern.exec(githubContribution + leetcodeContribution)) !==
    null
  ) {
    matches.push(match[1]);
  }

  return `${matches[0]}, ${matches[1]} on ${dateString}`;
}

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

  const monthWeeks = Array(12).fill(0);
  const monthEndWeeks = Array(12).fill(0);
  const monthStartWeeks = Array(12).fill(0);

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
  let month = date.getMonth();

  while (date < endDate) {
    if (day === 7) {
      day = 0;
      week++;
    }

    if (month != date.getMonth()) {
      month = date.getMonth();
      monthEndWeeks[month] = week + 1;
    } else {
      monthStartWeeks[month] = week;
    }

    let levelValue =
      Number(
        (githubContributionMap.get(date.toDateString()) || { level: 0 }).level
      ) +
      Number(
        (leetcodeContributionMap.get(date.toDateString()) || { level: 0 }).level
      );

    let dateString = `${monthLabels[date.getMonth()]} ${date.getDate()}${addOrdinalSuffix(date.getDate())}`;

    let githubContribution = (
      githubContributionMap.get(date.toDateString()) || { contribution: "" }
    ).contribution;

    let leetcodeContribution = (
      leetcodeContributionMap.get(date.toDateString()) || {
        contribution: `0 submissions on ${dateString}`,
      }
    ).contribution;

    let contributionValue = getContributionString(
      githubContribution,
      leetcodeContribution,
      dateString
    );

    grid[day][week] = {
      date: new Date(date),
      level: levelValue,
      contribution: contributionValue,
    };

    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  for (let index = 0; index < monthEndWeeks.length; index++) {
    const endweek = monthEndWeeks[index];
    const startweek = monthStartWeeks[index];

    monthWeeks[index] = Math.round((endweek + startweek) / 2);
  }

  gridCleanUp(grid);

  return [grid, monthWeeks];
}

