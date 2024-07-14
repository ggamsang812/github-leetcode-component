# github-leetcode-component

[![Blog Example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/blog_example.png)](https://theyuniverse.vercel.app/project)

github-leetcode-component is a react library to:

1. Generate the calendar that combined GitHub and LeetCode Calendar (Combination Calendar)
2. Generate the GitHub Contribution Calendar
3. Generate the LeetCode Submission Calendar
4. Get User Data from GitHub
5. Get User Data from LeetCode

Here how GitHub Calendar, Leetcode Calendar, Combination Calendar look in order:
![Overall_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/Overall_example.png)

Different Sizes of Calendar:
Combination Calender (Large - default / wrong input)
GitHub Calendar (Medium)
LeetCode Calendar (Small)
![Overall_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/Overall_size_example.png)

Example of applying to :

- My personal blog (Typescript / Next.js / Vercel)

  - [Project page of my personal blog](https://theyuniverse.vercel.app/project)

- Vite app (Typescript / Vite)

  - [vite app to test](https://github.com/ggamsang812/calendar-test-vite)

- Next.js app (Typescript / Vite)
  - [next.js app to test](https://github.com/ggamsang812/calendar-test-nextjs)

## Installation

```bash
npm install github-leetcode-component
```

## Requirements

You will have to set up a proxy. Here are a guide and examples for vite and next.js.

### Vite:

**_[test vite app repo](https://github.com/ggamsang812/calendar-test-vite)_**

1. Add server proxy field in the vite.config.ts:

Here is an example:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/github": {
        target: "https://github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github/, ""),
      },
      "/leetcode": {
        target: "https://leetcode.com/graphql/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/leetcode/, ""),
      },
    },
  },
});
```

2. Use it!

```typescript
import "./App.css";
import { GitHubCalendar, LeetCodeCalendar } from "github-leetcode-component";

function App() {
  return (
    <>
      <GitHubCalendar username="ggamsang812" />
      <LeetCodeCalendar username="ggamsang812" />
    </>
  );
}

export default App;

```

### Next.js:

**_[Project page of my personal blog](https://theyuniverse.vercel.app/project)_**
**_[test next.js app repo](https://github.com/ggamsang812/calendar-test-nextjs)_**

1. Install http-proxy-middleware:
   - `npm install express http-proxy-middleware`
2. Create a Custom Server:
   - In your Next.js project, you can create a custom server using Express (or any other Node.js server framework). For this example, we'll use Express. - Create a file named `server.js` in the root of your Next.js project. - Configure the proxy using `http-proxy-middleware`.

Here is an example:

```javascript
// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Proxy configuration for /github
  server.use(
    "/github",
    createProxyMiddleware({
      target: "https://github.com",
      changeOrigin: true,
      pathRewrite: {
        "^/github": "",
      },
    })
  );

  // Proxy configuration for /leetcode
  server.use(
    "/leetcode",
    createProxyMiddleware({
      target: "https://leetcode.com/graphql/",
      changeOrigin: true,
      pathRewrite: {
        "^/leetcode": "",
      },
    })
  );

  // Handle all other routes with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
```

3. Modify `package.json`:
   - Modify the start script in your package.json to use the custom server:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

4. Create a client side rendering component:

Here is an example:

```typescript
// app/pages/Calendar.tsx
"use client";

import { GitHubCalendar, LeetCodeCalendar } from "github-leetcode-component";

export default function Calendar() {
  return (
    <div>
      <GitHubCalendar username="ggamsang812" />
      <LeetCodeCalendar username="ggamsang812" />
    </div>
  );
}

```

5. Use it!

```typescript
// app/page.tsx
import Calendar from "./pages/Calendar";

export default function Home() {
  return (
    <div>
      <Calendar />
    </div>
  );
}

```

## Usage

### CombinationCalendar

Offers two modes of operation:

1. Current Year Calendar: When no year is specified, the component will generate the github contribution calendar starting from one year ago up until the current date.
2. Specific Year Calendar: When a year is provided as an input, the component will generate the github calendar for that entire year.

```typescript
/**
 * Generates GitHub Contribution Calendar
 * @param {string} github_username - GitHub username
 * @param {string} leetcode_username - LeetCode username
 * @param {string} year - Optional param for year of the calendar
 * @param {string} size - Optional param for size of the calendar
 * @returns {jsx} -
 */
```

```typescript
import { CombinationCalendar } from "github-leetcode-component";
```

```typescript
<CombinationCalendar github_username="ggamsang812" leetcode_username="ggamsang812" />
<CombinationCalendar github_username="ggamsang812" leetcode_username="ggamsang812" size="small"/>

```

example:
![CombinationCalendar_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/CombinationCalendar_example.png)

### GitHubCalendar

Offers two modes of operation:

1. Current Year Calendar: When no year is specified, the component will generate the github contribution calendar starting from one year ago up until the current date.
2. Specific Year Calendar: When a year is provided as an input, the component will generate the github calendar for that entire year.

```typescript
/**
 * Generates GitHub Contribution Calendar
 * @param {string} username - GitHub username
 * @param {string} year - Optional param for year of the calendar
 * @param {string} size - Optional param for size of the calendar
 * @returns {jsx} -
 */
```

```typescript
import { GitHubCalendar } from "github-leetcode-component";
```

```typescript
<GitHubCalendar username="ggamsang812" />
<GitHubCalendar username="ggamsang812" year="2024" />
<GitHubCalendar username="ggamsang812" size="medium" />
```

example:
![GitHubCalendar_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/GitHubCalendar_example.png)

### LeetCodeCalendar

Offers two modes of operation:

1. Current Year Calendar: When no year is specified, the component will generate the leetcode submission calendar starting from one year ago up until the current date.
2. Specific Year Calendar: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

```typescript
/**
 * Generates LeetCode Submissions Calendar
 * @param {string} username - LeetCode username
 * @param {string} year - Optional param for year of the calendar
 * @param {string} size - Optional param for size of the calendar
 * @returns {jsx} -
 */
```

```typescript
import { LeetCodeCalendar } from "github-leetcode-component";
```

```typescript
<LeetCodeCalendar username="ggamsang812" />
<LeetCodeCalendar username="ggamsang812" year="2024" />
<LeetCodeCalendar username="ggamsang812" size="MeDiUm" />
```

example:
![LeetCodeCalendar_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/LeetCodeCalendar_example.png)

### GetGitHubData

Performs an HTTP request to fetch user data, then converts the fetched data into a stringified HTML format and returns it. Offers two modes of operation:

1. Current Year Data: When no year is specified, the component will generate the stringified HTML of user data starting from one year ago up until the current date.
2. Specific Year Data: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

```typescript
/**
 * Fetch GitHub user data
 * @param {string} username - LeetCode username
 * @param {string} year - Optional param for specific year data
 * @returns {string} - stringified fetched GitHub data
 */
```

```typescript
import { GetGitHubData } from "github-leetcode-component";
```

```typescript
<GetGitHubData username="ggamsang812" />
<GetGitHubData username="ggamsang812" year="2024" />
```

example:
![GetGitHubData_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/GetGitHubData_example.png)

### GetLeetCodeData

Performs an HTTP request with GraphQL query to fetch user data, then converts the fetched data into a stringified HTML format and returns it. Offers two modes of operation:

1. Current Year Data: When no year is specified, the component will generate the stringified HTML of user data starting from one year ago up until the current date.
2. Specific Year Data: When a year is provided as an input, the component will generate the leetcode calendar for that entire year.

```typescript
/**
 * Fetch LeetCode user data
 * @param {string} username - LeetCode username
 * @param {string} year - Optional param for specific year data
 * @returns {string} - stringified fetched Leetcode data
 */
```

```typescript
import { GetLeetCodeData } from "github-leetcode-component";
```

```typescript
<GetLeetCodeData username="ggamsang812" />
<GetLeetCodeData username="ggamsang812" year="2024" />
```

example:
![GetLeetCodeData_example](https://raw.githubusercontent.com/ggamsang812/github-leetcode-component/master/src/assets/GetLeetCodeData_example.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
