export function getTimeString(date) {
  let hour = date.getHours();
  const minute = date.getMinutes();
  const amOrPm = hour > 12 ? 'PM' : 'AM';
  hour %= 12;

  return `${hour}:${minute} ${amOrPm}`;
}
