export function formatDate(input) {
  const [datePart, timePart] = input.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  const date = new Date(year, month - 1, day, hour, minute);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0"); // Add seconds (00) for uniformity

  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
}
