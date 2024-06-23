import { GetLeetCodeDataProps } from "./GetLeetCodeData.types";
import { useEffect, useState } from "react";
import { fetchUserProfileCalendar } from "./fetchUserProfileCalendar";

export function GetLeetCodeData({ username, year }: GetLeetCodeDataProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date();

  let actualYear: string | undefined;
  if (
    year &&
    year.length >= 4 &&
    Number(year.substring(0, 4)) <= currentYear.getFullYear() &&
    Number(year.substring(0, 4)) >= 2015
  ) {
    actualYear = year.substring(0, 4);
  } else {
    actualYear = undefined;
  }

  useEffect(() => {
    async function getUserProfileCalendar() {
      try {
        const response = await fetchUserProfileCalendar({
          username: username,
          year: actualYear,
        });
        setData(response);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    getUserProfileCalendar();
  }, [username]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }
  return JSON.stringify(data, null, 2);
}
