export function dateFormat(date: Date | string): string {
  const formatedDate = new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatedDate.slice(0, formatedDate.length - 3);
}

export function timeFormat(date: Date | string): string {
  return new Date(date).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
}
