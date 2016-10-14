export function getTimeString(date) {
  let hour = date.getHours();
  const minute = date.getMinutes();
  const amOrPm = hour > 12 ? 'pm' : 'am';
  hour %= 12;

  return `${hour}:${minute} ${amOrPm}`;
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getDayOfWeek(date) {
  return daysOfWeek[date.getDay()];
}

export function getDateString(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
