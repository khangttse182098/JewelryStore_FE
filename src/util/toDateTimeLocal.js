function toDatetimeLocal(input) {
  // Split the input into date and time parts
  const [datePart, timePart] = input.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");

  // Format the date and time parts into ISO 8601 format
  const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;

  return formattedDate;
}

export default toDatetimeLocal;
