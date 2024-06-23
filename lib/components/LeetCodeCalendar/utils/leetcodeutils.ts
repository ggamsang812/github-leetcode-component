export function unixToDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  }
  