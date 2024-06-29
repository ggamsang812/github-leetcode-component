import { CombinationCalendarProps } from "./CombinationCalendar.types";

export function CombinationCalendar({github_username, leetcode_username, year}: CombinationCalendarProps) {
    return(
        <div>
            {github_username}
            {leetcode_username}
            {year}
        </div>
    )
}
