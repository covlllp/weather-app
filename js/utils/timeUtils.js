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

export function getShortTimeString(date) {
  const dateObj = new Date(date);
  let hour = dateObj.getHours();
  const amOrPm = hour >= 12 ? 'pm' : 'am';
  hour %= 12;
  if (!hour) hour = 12;
  return `${hour}${amOrPm}`;
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

export function getSeason() {
  const month = new Date().getMonth();
  if (month < 4) {
    return 'winter';
  } else if (month < 7) {
    return 'spring';
  } else if (month < 10) {
    return 'summer';
  } else if (month < 12) {
    return 'autumn';
  }
  return 'winter';
}

export function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 6) {
    return 'night';
  } else if (hour < 9) {
    return 'dawn';
  } else if (hour < 17) {
    return 'day';
  } else if (hour < 21) {
    return 'dusk';
  }
  return 'night';
}

export function getDayOrNight() {
  return getTimeOfDay() === 'night' ? 'night' : 'day';
}
