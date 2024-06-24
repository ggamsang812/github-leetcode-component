import { useState, useEffect } from "react";
import { LeetCodeCalendarProps } from "./LeetCodeCalendar.types";
import { GetLeetCodeData } from "../GetLeetCodeData";
import { unixToDate, transformCalendarData } from "./utils/leetcodeutils";
import { Calendar } from "./Calendar";

export function LeetCodeCalendar({ username, year }: LeetCodeCalendarProps) {
  const [formattedData, setFormattedData] = useState<
    { date: string; level: number; contribution: string }[]
  >([]);

  let startDateHere: Date = new Date();
  const isLessThanCurrent =
    Number(year?.substring(0, 4)) <= startDateHere.getFullYear();
  const isOver2015 = Number(year?.substring(0, 4)) >= 2015;

  if (
    year == undefined ||
    null ||
    year.length < 4 ||
    !isLessThanCurrent ||
    !isOver2015
  ) {
    startDateHere.setFullYear(startDateHere.getFullYear() - 1);
  } else {
    startDateHere = new Date(year.substring(0, 4) + "-01-02");
  }

  const data = GetLeetCodeData({ username, year });

  useEffect(() => {
    if (data !== "Loading...") {
      try {
        const parsedData = JSON.parse(data);
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

          setFormattedData(transformCalendarData(convertedCalendar));
        }
      } catch (error) {
        console.error("Failed to parse data:", error);
      }
    }
  }, [data]);

  return (
    <>
      <Calendar startDate={startDateHere} contributions={formattedData} />
    </>
  );
}
