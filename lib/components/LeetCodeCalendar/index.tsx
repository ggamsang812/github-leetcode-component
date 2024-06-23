import { useState, useEffect } from "react";
import { LeetCodeCalendarProps } from "./LeetCodeCalendar.types";
import { GetLeetCodeData } from "../GetLeetCodeData";
import { unixToDate } from "./utils/leetcodeutils";

export function LeetCodeCalendar({ username, year }: LeetCodeCalendarProps) {
  const [convertedCalendar, setConvertedCalendar] = useState<{
    [key: string]: number;
  }>({});
  const data = GetLeetCodeData({ username, year });

  useEffect(() => {
    if (data !== "Loading...") {
      try {
        const parsedData = JSON.parse(data);
        const submissionCalendarStr =
          parsedData?.data?.matchedUser?.userCalendar?.submissionCalendar;

        const submissionCalendar: { [key: string]: number } = JSON.parse(
          submissionCalendarStr
        );

        const convertedCalendar: { [key: string]: number } = {};
        for (const [timestamp, value] of Object.entries(submissionCalendar)) {
          const date = unixToDate(Number(timestamp));
          convertedCalendar[date] = value;
        }

        setConvertedCalendar(convertedCalendar);
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
    startDateHere = new Date(year + "-01-02");
  }

  return <div>{JSON.stringify(convertedCalendar, null, 2)}</div>;
}
