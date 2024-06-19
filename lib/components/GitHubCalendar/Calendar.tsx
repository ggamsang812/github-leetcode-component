import styles from "./styles.module.css";

type CalendarGrid = (Date | null)[][];

interface CalendarProps {
  startDate: Date;
}

function makeGrid(startDate: Date) {
  // Initialize the grid with 7 rows and 53 columns
  const grid: CalendarGrid = Array.from({ length: 7 }, () =>
    Array(53).fill(null)
  );

  let currentDate = new Date(startDate);

  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      if (
        currentDate.getFullYear() > startDate.getFullYear() &&
        currentDate.getDate() === 1
      ) {
        // Stop if we move to the next year
        return grid;
      }
      grid[day][week] = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return grid;
}

export function Calendar({ startDate }: CalendarProps) {
  const grid = makeGrid(startDate);

  return (
    <div className={styles.calendar}>
      {grid.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={styles.day}
              title={day?.toLocaleDateString() || ""}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
