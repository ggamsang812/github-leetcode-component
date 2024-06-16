import { useState, useEffect } from "react";
import { GitHubUserDataProps } from "./GitHubUserData.types";

export function GitHubUserData({ username }: GitHubUserDataProps) {
  const [contributions, setContributions] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(`/api/users/${username}/contributions`);
        const text = await response.text();
        setContributions(text);
      } catch (err) {
        setError("Failed to fetch contributions");
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
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
      <div dangerouslySetInnerHTML={{ __html: contributions || "" }} />
    </div>
  );
}
