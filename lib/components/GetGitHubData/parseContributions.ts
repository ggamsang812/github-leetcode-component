interface Contribution {
  date: string;
  level: string;
}

const parseContributions = (html: string): Contribution[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const days = doc.querySelectorAll("td[data-date]");
  const contributions: Contribution[] = [];

  days.forEach((day) => {
    const date = day.getAttribute("data-date");
    const level = day.getAttribute("data-level");
    if (date && level) {
      contributions.push({ date, level });
    }
  });

  return contributions;
};

export default parseContributions;
