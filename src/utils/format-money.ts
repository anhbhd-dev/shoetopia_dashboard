export function formatMoneyVND(amount: number): string {
  // Sử dụng Intl.NumberFormat để định dạng số tiền
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
