import { GetLeetCodeDataProps } from "./GetLeetCodeData.types";
import { useEffect, useState } from "react";
import { fetchUserProfileCalendar } from "./fetchUserProfileCalendar";

export function GetLeetCodeData({ username, year }: GetLeetCodeDataProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserProfileCalendar() {
      try {
        const response = await fetchUserProfileCalendar({
          username: username,
          year: year,
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
