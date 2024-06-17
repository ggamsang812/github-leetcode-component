import { GetLeetCodeDataProps } from "./GetLeetCodeData.types";
import { useEffect, useState } from "react";
import { fetchUserProfileCalendar } from "./fetchUserProfileCalendar";

export function GetLeetCodeData({ username, year }: GetLeetCodeDataProps) {
  const [data, setData] = useState(null);
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
        setError("Failed to fetch data");
      }
    }

    getUserProfileCalendar();
  }, []);

  return (
    <div>
      <h1>User Profile Calendar</h1>
      {error && <p>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
