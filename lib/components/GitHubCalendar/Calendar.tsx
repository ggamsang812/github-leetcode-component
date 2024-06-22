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
    Array(54).fill({ date: null, level: 0 })
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

  const startDayOfWeek = date.getDay(); // Sunday - Saturday: 0 - 6

  let week = 0;
  let day = startDayOfWeek;
  let count = 0;

  while (date < endDate) {
    if (day === 7) {
      day = 0;
      week++;
    }
    grid[day][week] = {
      date: new Date(date),
      level: contributionMap.get(date.toDateString()) || 0,
    };
    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  gridCleanUp(grid)
  
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

const gridCleanUp = (grid: CalendarGrid) => {
  const lastColumnIndex = 53;
  let isLastColumnNull = true;
  for (let day = 0; day < 7; day++) {
    if (grid[day][lastColumnIndex].date !== null) {
      isLastColumnNull = false;
      break;
    }
  }

  if (isLastColumnNull) {
    for (let day = 0; day < 7; day++) {
      grid[day].pop(); // Remove the last column
    }
  }
}

export function Calendar({ startDate, contributions }: CalendarProps) {
  const grid = makeGrid(startDate, contributions);

  const dayLabels = ["Mon", "Wed", "Fri"];
  const labelRows = [1, 3, 5]; // 0-based indices for 2nd, 4th, and 6th rows

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.dayLabels}>
        {labelRows.map((rowIndex, i) => (
          <div
            key={i}
            className={styles.dayLabel}
            style={{ gridRow: rowIndex + 2 }}
          >
            {dayLabels[i]}
          </div>
        ))}
      </div>
      <div className={styles.calendar}>
        {grid.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.week}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`${styles.day} ${day.date ? styles[`level${day.level}`] : styles.transparent}`}
                title={
                  day.date
                    ? `Date: ${day.date.toLocaleDateString()}, Contributions: ${day.level}`
                    : ""
                }
              >
                {day.date ? day.date.getDate() : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
