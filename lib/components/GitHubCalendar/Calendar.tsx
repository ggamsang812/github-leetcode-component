import styles from "./styles.module.css";

type CalendarGrid = { date: Date | null; level: number }[][];

interface CalendarProps {
  startDate: Date;
  contributions: { date: string; level: number }[] | undefined;
}

function makeGrid(
  startDate?: Date | null,
  contributions?: { date: string; level: number }[]
) {
  // Default start date to one year before today if not provided
  const today = new Date();

  startDate = startDate
    ? new Date(startDate)
    : new Date(today.setFullYear(today.getFullYear() - 1));

  // Initialize the grid with 7 rows and 53 columns
  const grid: CalendarGrid = Array.from({ length: 7 }, () =>
    Array(53).fill({ date: null, level: 0 })
  );
  // Create a map of contributions by date for quick lookup
  const contributionMap = new Map(
    contributions?.map((c) => [stringToDate(c.date).toDateString(), c.level])
  );

  let date = new Date(startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 1); // End date one year from start date

  // To fix the bug when startDate is today, it wouldn't include today in the grid
  if (areDatesEqual(endDate, today)) {
    date.setDate(date.getDate() - 1);
    endDate.setDate(endDate.getDate() + 1);
  }

  for (let week = 0; week < 53; week++) {
    for (let day = 0; day < 7; day++) {
      if (date >= endDate) {
        // Stop if we reach the end date
        return grid;
      }
      const dateString = date.toDateString();
      const level = contributionMap.get(dateString) || 0;

      grid[day][week] = { date: new Date(date), level: level };
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
};

const stringToDate = (initDate: string) => {
  const date = new Date(initDate);
  date.setDate(date.getDate() + 1);
  return date;
};

export function Calendar({ startDate, contributions }: CalendarProps) {
  const grid = makeGrid(startDate, contributions);
  // console.log(grid);

  return (
    <div className={styles.calendar}>
      {grid.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`${styles.day} ${styles[`level${day.level}`]}`} // Apply level-based styling
              title={day.date?.toLocaleDateString() || ""}
            >
              {day.date ? day.date.getDate() : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
