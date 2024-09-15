export const status_color = {
  registered: "text-green-400",
  pending: "text-yellow-600",
  abandoned: "text-red-400",
  other: "text-blue-400",
} as { [key: string]: string };

export function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.substring(1);
}

export function formatDateFromTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}