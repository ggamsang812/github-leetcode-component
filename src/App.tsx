import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  GitHubUserData,
  GetGitHubData,
  GetLeetCodeData,
  GitHubCalendar,
  LeetCodeCalendar,
  CombinationCalendar,
} from "../";

function App() {
  const [count, setCount] = useState(0);
  const [inputCustomCountValue, setInputCustomCountValue] = useState("");

  const handleClickCustomCount = () => {
    if (inputCustomCountValue === "") {
      setCount((count) => count + 1);
    } else {
      setCount(Number(inputCustomCountValue));
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <CombinationCalendar
          github_username="ggamsang812"
          leetcode_username="ggamsang812"
        />
        <GitHubCalendar username="ggamsang812" size="medium" />
        <LeetCodeCalendar username="ggamsang812" size="small"/>
        <input
          placeholder="Custom count"
          value={inputCustomCountValue}
          onChange={(e) => setInputCustomCountValue(e.target.value)}
        />
        <br />
        <button onClick={handleClickCustomCount}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
