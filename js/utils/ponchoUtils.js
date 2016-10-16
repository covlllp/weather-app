import { ajax } from 'jquery';

import { PonchoConstants } from 'js/constants';

const { url, location } = PonchoConstants;

export function getMainPonchoData() {
  const ponchoUrl = `${url}/${location}`;
  return ajax(ponchoUrl).then((response) => response.data);
}

export function getDailyPonchoData() {
  const ponchoUrl = `${url}/${location}/metrics/daily`;
  return ajax(ponchoUrl).then((response) => response.data.series);
}

export function getHourlyPonchoData() {
  const ponchoUrl = `${url}/${location}/metrics/hourly`;
  return ajax(ponchoUrl).then((response) => response.data.series);
}

export function getInitialWeatherData() {
  return getMainPonchoData().then((ponchoData) => ({
    maxTemp: ponchoData.max_temp_f,
    minTemp: ponchoData.min_temp_f,
    weather: ponchoData.condition,
    ponchoData: {
      subject: ponchoData.subject,
      opener: ponchoData.opener_f,
      content: ponchoData.content_f,
      media: ponchoData.media,
    },
  }));
}

export function getDailyWeatherData() {
  return getDailyPonchoData().then((dailyData) => dailyData.map((day) => ({
    maxTemp: day.temp_max_f,
    minTemp: day.temp_min_f,
    icon: day.icon,
    precipProb: day.precip_prob,
  })));
}

export function getCurrentWeather() {
  return getHourlyPonchoData()
  .then((hourlyData) => hourlyData[0])
  .then((weatherInfo) => ({
    icon: weatherInfo.icon,
    temp: weatherInfo.temp_f,
  }));
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

const IconMap = {
  'clear-day': 'weather-clear',
  'clear-night': 'weather-clear-night',
  cloudy: 'weather-clouds',
  'partly-cloudy-day': 'weather-few-clouds',
  'partly-cloudy-night': 'weather-few-clouds-night',
  'light-rain': 'weather-drizzle-day',
  'light-rain-night': 'weather-drizzle-day',
};

// const IconTimeMap = {
//   clear_day: 'weather-clear',
//   'clear-night_night': 'weather-clear-night',
//   cloudy_night: 'weather-clouds-night',
//   cloudy_day: 'weather-clouds',
//   'partly-cloudy-day_day': 'weather-few-clouds',
//   'partly-cloudy-night_day': 'weather-few-clouds',
//   'partly-cloudy_night': 'weather-few-clouds-night',
//   'light-rain_day': 'weather-drizzle-day',
//   'light-rain_night': 'weather-drizzle-night',
// };

export function getIconSrc(icon) {
  return `images/weather/${IconMap[icon]}.png`;
}
