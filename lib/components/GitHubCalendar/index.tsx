import { useState, useEffect } from "react";
import { GitHubCalendarProps } from "./GitHubCalendar.types";
import { GetGitHubData } from "../GetGitHubData";
import { Calendar } from "./Calendar";

export function GitHubCalendar({ username, year }: GitHubCalendarProps) {
  const [jsonArray, setJsonArray] = useState(null);
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

  if (year == undefined || null) {
    const currentDate = new Date();
    startDateHere.setFullYear(currentDate.getFullYear() - 1);
  } else {
    startDateHere = new Date(year.substring(0, 4) + "-01-02");
  }

  return (
    <div>
      <Calendar startDate={startDateHere} />
      <pre>{JSON.stringify(jsonArray, null, 2)}</pre>
      {username}
      {year}
    </div>
  );
}
