function addPrependingZeros(value) {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
}

export function getTimeString(date) {
  let dateObj = date;
  if (!(date instanceof Date)) {
    dateObj = new Date(date);
  }

  let hour = dateObj.getHours();
  const minute = addPrependingZeros(dateObj.getMinutes());
  const amOrPm = hour >= 12 ? 'pm' : 'am';
  hour %= 12;
  if (!hour) hour = 12;

  return `${hour}:${minute} ${amOrPm}`;
}

const shortDaysOfWeek = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thurs',
  'Fri',
  'Sat',
];

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

export function getDayOfWeek(date, shorten = false) {
  let dateObj = date;
  if (!(date instanceof Date)) {
    dateObj = new Date(date);
  }
  if (shorten) return shortDaysOfWeek[dateObj.getDay()];
  return daysOfWeek[dateObj.getDay()];
}

export function getDateString(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
