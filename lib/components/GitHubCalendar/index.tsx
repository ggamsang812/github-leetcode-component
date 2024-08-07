import { useState, useEffect } from "react";
import { GitHubCalendarProps } from "./GitHubCalendar.types";
import { GetGitHubData } from "../GetGitHubData";
import { Calendar } from "./Calendar";

export function GitHubCalendar({ username, year, size }: GitHubCalendarProps) {
  const [jsonArray, setJsonArray] = useState();
  const data = GetGitHubData({ username, year });

  useEffect(() => {
    if (data !== "Loading...") {
      try {
        const parsedData = JSON.parse(data);
        setJsonArray(parsedData);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [data]);

  let startDateHere: Date = new Date();
  const isLessThanCurrent =
    Number(year?.substring(0, 4)) <= startDateHere.getFullYear();
  const isOver2005 = Number(year?.substring(0, 4)) >= 2005;

  if (
    year == undefined ||
    null ||
    year.length < 4 ||
    !isLessThanCurrent ||
    !isOver2005
  ) {
    startDateHere.setFullYear(startDateHere.getFullYear() - 1);
  } else {
    startDateHere = new Date(year.substring(0, 4) + "-01-02");
  }

  return (
    <>
      <Calendar startDate={startDateHere} contributions={jsonArray} size={size} />
    </>
  );
}
