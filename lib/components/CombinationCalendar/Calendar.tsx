import { monthLabels } from "./utils/utils";
import styles from "./styles.module.css";
import { makeCombinedGrid } from "./utils/combineGrid";

interface CalendarProps {
  startDate: Date;
  githubContributions:
    | { date: string; level: number; contribution: string }[]
    | undefined;
  leetcodeContributions: {
    date: string;
    level: number;
    contribution: string;
  }[];
}

export function Calendar({
  startDate,
  githubContributions,
  leetcodeContributions,
}: CalendarProps) {
  const [combinedGrid, combinedMonthWeeks] = makeCombinedGrid(
    startDate,
    githubContributions,
    leetcodeContributions
  );

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
              {combinedMonthWeeks.includes(weekNumber) && (
                <div className={styles.label}>
                  {monthLabels[combinedMonthWeeks.indexOf(weekNumber)]}
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
            {combinedGrid.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.week}>
                {week.map((day, dayIndex) => {
                  let hiddenContentClass;

                  if (dayIndex < 4) {
                    hiddenContentClass = styles.frontHiddenContent;
                  } else if (dayIndex >= week.length - 6) {
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
                        <span className={hiddenContentClass}>
                          {day.date ? `${day.contribution}` : ""}
                        </span>
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
