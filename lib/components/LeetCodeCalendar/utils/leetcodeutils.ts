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
  if (contributions < 3) return 1;
  if (contributions < 5) return 2;
  return 3;
}

// Function to generate the contribution message
export function getContributionMessage(
  date: string,
  contributions: number
): string {
  if (contributions === 0) return `No contributions on ${date}`;
  if (contributions === 1) return `1 contribution on ${date}`;
  return `${contributions} contributions on ${date}`;
}

const newLocal = ([date, contributions]: [string, number]): { date: string; level: number; contribution: string; } => {
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
  return Object.entries(submissionCalendar).map(newLocal);
};
