function addPrependingZeros(value, length) {
  if (value.length < length) {
    const numZeros = length - value.length;
    let zeros = '';
    for (let i = 0; i < numZeros; i++) {
      zeros += '0';
    }
    return `${zeros}${value}`;
  }
  return value;
}

export function getTimeString(date) {
  let hour = date.getHours();
  const minute = addPrependingZeros(date.getMinutes(), 2);
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
  if (!(date instanceof Date)) {
    const dateObj = new Date(date);
    return daysOfWeek[dateObj.getDay()];
  }
  return daysOfWeek[date.getDay()];
}

export function getDateString(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
