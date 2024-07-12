import {
  monthLabels,
  CalendarGrid,
  stringToDate,
  areDatesEqual,
  gridCleanUp,
} from "./utils/utils";
import styles from "./styles.module.css";

interface CalendarProps {
  startDate: Date;
  contributions: { date: string; level: number; contribution: string }[];
}

function makeGrid(
  startDate?: Date | null,
  contributions?: { date: string; level: number; contribution: string }[]
): [CalendarGrid, Array<any>] {
  // Default start date to one year before today if not provided
  const today = new Date();

  startDate = startDate
    ? new Date(startDate)
    : new Date(today.setFullYear(today.getFullYear() - 1));
  // Initialize the grid with 7 rows and 53 columns
  const grid: CalendarGrid = Array.from({ length: 7 }, () =>
    Array(54).fill({ date: null, level: 0, contribution: "" })
  );

  const monthWeeks = Array(12).fill(0);
  const monthEndWeeks = Array(12).fill(0);
  const monthStartWeeks = Array(12).fill(0);

  // Create a map of contributions by date for quick lookup
  const contributionMap = new Map<
    string,
    { level: number; contribution: string }
  >();

  contributions?.forEach((c) => {
    const dateString = stringToDate(c.date).toDateString();
    contributionMap.set(dateString, {
      level: c.level,
      contribution: c.contribution,
    });
  });

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
  let month = date.getMonth();

  while (date < endDate) {
    if (day === 7) {
      day = 0;
      week++;
    }

    if (month != date.getMonth()) {
      month = date.getMonth();
      monthEndWeeks[month] = week + 1;
    } else {
      monthStartWeeks[month] = week;
    }

    grid[day][week] = {
      date: new Date(date),
      level: (contributionMap.get(date.toDateString()) || { level: 0 }).level,
      contribution: (
        contributionMap.get(date.toDateString()) || {
          contribution: `0 submissions on ${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
        }
      ).contribution,
    };

    date.setDate(date.getDate() + 1);
    day++;
    count++;
  }

  for (let index = 0; index < monthEndWeeks.length; index++) {
    const endweek = monthEndWeeks[index];
    const startweek = monthStartWeeks[index];

    monthWeeks[index] = Math.round((endweek + startweek) / 2);
  }

  gridCleanUp(grid);

  return [grid, monthWeeks];
}

export function Calendar({ startDate, contributions }: CalendarProps) {
  const [grid, monthWeeks] = makeGrid(startDate, contributions);

  const dayLabels = ["Mon", "Wed", "Fri"];
  const labelRows = [1, 3, 5]; // 0-based indices for 2nd, 4th, and 6th rows

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.pageContainer}>
        <div className={styles.monthContainer}>
          {Array.from({ length: 54 }, (_, weekNumber) => (
            <div className={styles.monthItem} key={weekNumber}>
              {weekNumber === 1 && startDate.getMonth() != 0 && (
                <div className={styles.label}>
                  {monthLabels[startDate.getMonth()]}
                </div>
              )}
              {monthWeeks.includes(weekNumber) && (
                <div className={styles.label}>
                  {monthLabels[monthWeeks.indexOf(weekNumber)]}
                </div>
              )}
            </div>
          ))}
        </div>
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
                {week.map((day, dayIndex) => {
                  let hiddenContentClass;

                  if (dayIndex < 4) {
                    hiddenContentClass = styles.frontHiddenContent;
                  } else if (dayIndex >= week.length - 4) {
                    hiddenContentClass = styles.lastHiddenContent;
                  } else {
                    hiddenContentClass = styles.hiddenContent;
                  }

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={styles.dayContainer}
                    >
                      <div
                        className={`${styles.day} ${day.date ? styles[`level${day.level}`] : styles.transparent}`}
                      >
                        {/* {day.date ? day.date.getDate() : ""} */}
                      </div>
                      {day.date && (
                        <div className={hiddenContentClass}>
                          {day.date ? `${day.contribution}` : ""}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
