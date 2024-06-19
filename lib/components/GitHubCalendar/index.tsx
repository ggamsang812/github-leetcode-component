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

  return (
    <div>
      <Calendar />
      <pre>{JSON.stringify(jsonArray, null, 2)}</pre>
      {username}
      {year}
    </div>
  );
}
