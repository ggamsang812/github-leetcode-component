interface Contribution {
  date: string;
  level: string;
  contribution: string;
}

const parseContributions = (html: string): Contribution[] => {
  const tooltipContents: (string | undefined)[] = [];
  const contributions: Contribution[] = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const days = doc.querySelectorAll("td[data-date]");
  const tooltips = doc.querySelectorAll("tool-tip");

  // Iterate over each tool-tip element
  tooltips.forEach((toolTip) => {
    const tooltipText = toolTip.textContent?.trim(); // Get the text content
    tooltipContents.push(tooltipText); // Push the extracted content to array
  });

  days.forEach((day, index) => {
    const date = day.getAttribute("data-date");
    const level = day.getAttribute("data-level");
    const contribution = tooltipContents[index]

    if (date && level && contribution) {
      contributions.push({ date, level, contribution });
    }
  });

  return contributions;
};

export default parseContributions;
