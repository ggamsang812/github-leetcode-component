import { useState, useEffect } from "react";
import { GetGitHubDataProps } from "./GetGitHubData.types";
import { fetchGitHubData } from "./fetchGitHubData";
import parseContributions from "./parseContributions";

interface Contribution {
  date: string;
  level: string;
}

export function GetGitHubData({ username, date }: GetGitHubDataProps) {
  const [contributions, setContributions] = useState<Contribution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        const html = await fetchGitHubData(username, date);
        // console.log(html)
        const parsedData = parseContributions(html);
        // console.log(parsedData)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Contributions for {username}</h2>
      <div>{contributions?.length}</div>
      <pre>{JSON.stringify(contributions, null, 2)}</pre>
    </div>
  );
}
