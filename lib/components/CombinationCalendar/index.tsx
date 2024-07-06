import { useState, useEffect } from "react";
import { CombinationCalendarProps } from "./CombinationCalendar.types";
import { GetGitHubData } from "../GetGitHubData";
import { GetLeetCodeData } from "../GetLeetCodeData";
import { unixToDate, transformCalendarData } from "./utils/leetcodeutils";
import { Calendar } from "./Calendar";

export function CombinationCalendar({
  github_username,
  leetcode_username,
  year,
}: CombinationCalendarProps) {
  const [githubJsonArray, setGithubJsonArray] = useState();
  const [formattedLeetcodeData, setformattedLeetcodeData] = useState<
    { date: string; level: number; contribution: string }[]
  >([]);

  let username = github_username;
  const githubData = GetGitHubData({ username, year });

  username = leetcode_username;
  const leetcodeData = GetLeetCodeData({ username, year });

  useEffect(() => {
    if (githubData !== "Loading...") {
      try {
        const parsedGithubData = JSON.parse(githubData);
        setGithubJsonArray(parsedGithubData);
      } catch (error) {
        console.error("Failed to parse githubData:", error);
      }
    }

    if (leetcodeData !== "Loading...") {
      try {
        const parsedData = JSON.parse(leetcodeData);
        const submissionCalendarStr =
          parsedData?.data?.matchedUser?.userCalendar?.submissionCalendar;

        if (submissionCalendarStr) {
          const submissionCalendar: { [key: string]: number } = JSON.parse(
            submissionCalendarStr
          );

          const convertedCalendar: { [key: string]: number } = {};
          for (const [timestamp, value] of Object.entries(submissionCalendar)) {
            const date = unixToDate(Number(timestamp));
            convertedCalendar[date] = value;
          }

          setformattedLeetcodeData(transformCalendarData(convertedCalendar));
        }
      } catch (error) {
        console.error("Failed to parse leetcodeData:", error);
      }
    }
  }, [githubData, leetcodeData]);

  // setting the startDate of the calendar here:
  let startDateHere: Date = new Date();
  const isLessThanCurrent =
    Number(year?.substring(0, 4)) <= startDateHere.getFullYear();
  const isOver2005 = Number(year?.substring(0, 4)) >= 2005; // for github
  // const isOver2015 = Number(year?.substring(0, 4)) >= 2015; // for leetcode

  if (
    year == undefined ||
    null ||
    year.length < 4 ||
    !isLessThanCurrent ||
    !isOver2005
  ) {
    startDateHere.setFullYear(startDateHere.getFullYear() - 1);
    startDateHere.setDate(startDateHere.getDate() + 1);
  } else {
    startDateHere = new Date(year.substring(0, 4) + "-01-02");
  }

  return (
    <>
      <Calendar
        startDate={startDateHere}
        githubContributions={githubJsonArray}
        leetcodeContributions={formattedLeetcodeData}
      />
    </>
  );
}
