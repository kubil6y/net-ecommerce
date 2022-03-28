export function currencyFormat(price: number): string {
  return "$" + (price / 100).toFixed(2);
}

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}
