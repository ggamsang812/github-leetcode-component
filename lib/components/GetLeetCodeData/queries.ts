export const USER_PROFILE_CALENDAR_QUERY = `
    query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
        userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        dccBadges {
            timestamp
            badge {
            name
            icon
            }
        }
        submissionCalendar
        }
    }
    }`;
