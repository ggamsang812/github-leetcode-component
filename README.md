# Github-Leetcode-component

github-leetcode-component is a react library to:

1. Generate the GitHub Contribution Calendar 
2. Generate the LeetCode Submission Calendar 
3. Get User Data from GitHub
4. Get User Data from LeetCode 

## Installation

```bash
npm install github-leetcode-component
```

## Usage

### GitHubCalendar
Offers two modes of operation:
1. Current Year Calendar: When no year is specified, the component will generate the github contribution calendar starting from one year ago up until the current date.
2. Specific Year Calendar: When a year is provided as an input, the component will generate the github calendar for that entire year.

 ```typescript
/** 
 * Generates GitHub Contribution Calendar
 * @param {string} username - GitHub username 
 * @param {string} year - Optional param for year of the calendar
 * @returns {jsx} - 
 */
```
```typescript
import { GitHubCalendar } from "github-leetcode-component"
```
```typescript
<GitHubCalendar username="ggamsang812" />
<GitHubCalendar username="ggamsang812" year="2024" />
```

### LeetCodeCalendar
Offers two modes of operation:
1. Current Year Calendar: When no year is specified, the component will generate the leetcode submission calendar starting from one year ago up until the current date.
2. Specific Year Calendar: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

 ```typescript
/** 
 * Generates LeetCode Submissions Calendar
 * @param {string} username - LeetCode username 
 * @param {string} year - Optional param for year of the calendar
 * @returns {jsx} - 
 */
```
```typescript
import { LeetCodeCalendar} from "github-leetcode-component"
```
```typescript
<LeetCodeCalendar username="ggamsang812" />
<LeetCodeCalendar username="ggamsang812" year="2024" />
```

### GetGitHubData
Performs an HTTP request to fetch user data, then converts the fetched data into a stringified HTML format and returns it. Offers two modes of operation:
1. Current Year Data: When no year is specified, the component will generate the stringified HTML of user data starting from one year ago up until the current date.
2. Specific Year Data: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

 ```typescript
/** 
 * Fetch GitHub user data
 * @param {string} username - LeetCode username 
 * @param {string} year - Optional param for specific year data
 * @returns {string} - stringified fetched data
 */
```
```typescript
import { GetGitHubData} from "github-leetcode-component"
```
```typescript
<GetGitHubData username="ggamsang812" />
<GetGitHubData username="ggamsang812" year="2024" />
```

### GetLeetCodeData
Performs an HTTP request with GraphQL query to fetch user data, then converts the fetched data into a stringified HTML format and returns it. Offers two modes of operation:
1. Current Year Data: When no year is specified, the component will generate the stringified HTML of user data starting from one year ago up until the current date.
2. Specific Year Data: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

 ```typescript
/** 
 * Fetch LeetCode user data
 * @param {string} username - LeetCode username 
 * @param {string} year - Optional param for specific year data
 * @returns {string} - stringified fetched data
 */
```
```typescript
import { GetLeetCodeData} from "github-leetcode-component"
```
```typescript
<GetLeetCodeData username="ggamsang812" />
<GetLeetCodeData username="ggamsang812" year="2024" />
```

## License

[MIT](https://choosealicense.com/licenses/mit/)