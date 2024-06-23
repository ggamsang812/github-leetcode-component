import { useState, useEffect } from "react";
import { LeetCodeCalendarProps } from "./LeetCodeCalendar.types";
import { GetLeetCodeData } from "../GetLeetCodeData";

function unixToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
}

export function LeetCodeCalendar({ username, year }: LeetCodeCalendarProps) {
  const [jsonArray, setJsonArray] = useState();
  const data = GetLeetCodeData({ username, year });

  useEffect(() => {
    if (data !== "Loading...") {
      try {
        const parsedData = JSON.parse(data);
        const submissionCalendarStr =
          parsedData?.data?.matchedUser?.userCalendar?.submissionCalendar;

        console.log(submissionCalendarStr);
        setJsonArray(submissionCalendarStr);
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [data]);

  let startDateHere: Date = new Date();

  console.log(unixToDate(1709942400))

  if (year == undefined || null) {
    const currentDate = new Date();
    startDateHere.setFullYear(currentDate.getFullYear() - 1);
  } else {
    startDateHere = new Date(year + "-01-02");
  }

  return <div>{jsonArray}</div>;
}
