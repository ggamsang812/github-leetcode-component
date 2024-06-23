import { USER_PROFILE_CALENDAR_QUERY } from "./queries";

interface UserProfileCalendarVariables {
  username: string;
  year?: string;
}

export async function fetchUserProfileCalendar(
  variables: UserProfileCalendarVariables
) {
  const url = `/leetcode`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: USER_PROFILE_CALENDAR_QUERY,
        variables: variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile calendar:", error);
    throw error;
  }
}
