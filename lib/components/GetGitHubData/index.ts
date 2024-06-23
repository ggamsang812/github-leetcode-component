import { useState, useEffect } from "react";
import { GetGitHubDataProps } from "./GetGitHubData.types";
import { fetchGitHubData } from "./fetchGitHubData";
import parseContributions from "./parseContributions";

interface Contribution {
  date: string;
  level: string;
}

export function GetGitHubData({ username, year }: GetGitHubDataProps) {
  const [contributions, setContributions] = useState<Contribution[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date();

  let actualYear: string | undefined;
  if (
    year &&
    year.length >= 4 &&
    Number(year.substring(0, 4)) <= currentYear.getFullYear() &&
    Number(year.substring(0, 4)) >= 2005
  ) {
    actualYear = year?.substring(0, 4) + "-01-01"
  } else {
    actualYear = undefined;
  }

  useEffect(() => {
    const loadContributions = async () => {
      try {
        const html = await fetchGitHubData(username, actualYear);
        const parsedData = parseContributions(html);

        // sort the contribution data by dates
        parsedData.sort((a: Contribution, b: Contribution) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });

        setContributions(parsedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, [username]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  return JSON.stringify(contributions, null, 2);
}
