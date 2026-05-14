export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "Unknown date";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toDateString();
}
