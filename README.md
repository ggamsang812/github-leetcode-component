## Steps to Create Contribution Calendar:

- Step 1: Prepare Contribution Data - Done
  - Fetch or create a list of contributions with dates and counts.
  - Ensure the data covers at least the past year.
- Step 2: Define the Grid Layout
  - The grid should have 7 rows (days of the week) and 53 columns (weeks of the year).
- Step 3: Calculate Dates
  - Determine the starting date (the first Sunday of the calendar year).
  - For each week in the past year, calculate the dates for each day (Sunday to Saturday).
- Step 4: Map Data to Grid
  - For each date in your contribution data, determine its position in the grid.
  - Create a 2D array or a similar structure to hold the contribution counts for each grid cell.
- Step 5: Define Color Coding
  - Choose a set of colors to represent different ranges of contributions (e.g., no contributions, low, medium, high).
  - Create a function that maps a contribution count to a color.
- Step 6: Render the Calendar
  - Use a front-end framework (React, Angular, etc.) to render the calendar.
  - Each cell in the calendar is a component that takes the contribution count and date as props and displays the appropriate color.
  - Implement tooltips or popups to show the exact number of contributions when hovering over a cell.

## Initialized the project from this article:

- https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
- Thank you @[receter](https://github.com/receter)

## To publish package

To publish your package, you just need to run `npm publish`. If you want to release your package to the public, you have to set `private: false` in your `package.json`.

## Useful articles / documentations I read for this project

- Guide on setting up the proxy in vite:
  - https://vitejs.dev/guide/ssr.html#ssr-externals
  - https://dev.to/ghacosta/til-setting-up-proxy-server-on-vite-2cng
- Difference between API vs. Endpoints https://dev.to/msnmongare/understanding-the-difference-between-apis-and-endpoints-402a
- Data fetching guide for Next.js: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
