export function formatDate(createdAt: string): string {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23", // Sử dụng định dạng 24 giờ
  };
  return date.toLocaleString("vi-VN", options);
}
