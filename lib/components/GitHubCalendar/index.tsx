import { GitHubCalendarProps } from "./GitHubCalendar.types";
import { GetGitHubData } from "../GetGitHubData";

export function GitHubCalendar({ username, date }: GitHubCalendarProps) {
  
  const data = GetGitHubData({ username, date });

  if (data != "Loading...") {
    const jsonArray = JSON.parse(data);
    console.log(jsonArray)
  }

  return (
    <div>
      {data}
      {username}
      {date}
    </div>
  );
}
