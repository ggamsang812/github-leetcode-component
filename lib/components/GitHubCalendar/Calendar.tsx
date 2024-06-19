import styles from "./styles.module.css";

type CalendarGrid = (Date | null)[][];

interface CalendarProps {
  startDate: Date;
}

function makeGrid(startDate: Date) {
  // Default start date to one year before today if not provided
  const today = new Date();

  startDate = startDate
    ? new Date(startDate)
    : new Date(today.setFullYear(today.getFullYear() - 1));

  // Initialize the grid with 7 rows and 53 columns
  const grid: CalendarGrid = Array.from({ length: 7 }, () =>
    Array(53).fill(null)
  );

  let date = new Date(startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1); // End date one year from start date

  // To fix the bug when startDate is today, it wouldn't include today in the grid
  if (areDatesEqual(endDate, today)) {
    date.setDate(date.getDate() - 1)
    endDate.setDate(endDate.getDate() + 1);
  }

  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      if (date >= endDate) {
        // Stop if we reach the end date
        return grid;
      }
      grid[day][week] = new Date(date);
      date.setDate(date.getDate() + 1);
    }
  }
  return grid;
}

const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
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
