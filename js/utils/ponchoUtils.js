import { ajax } from 'jquery';

import { PonchoConstants } from 'js/constants';

const { url, location } = PonchoConstants;

const buildPonchoUrl = (route = '') => `${url}/${location}/${route}`;

// Ajax functions
export function fetchMainPonchoData() {
  const ponchoUrl = buildPonchoUrl();
  return ajax(ponchoUrl);
}


export function fetchDailyPonchoData() {
  const ponchoUrl = buildPonchoUrl('metrics/daily');
  return ajax(ponchoUrl);
}


export function fetchHourlyPonchoData() {
  const ponchoUrl = buildPonchoUrl('metrics/hourly');
  return ajax(ponchoUrl);
}

const IconMap = {
  'clear-day': 'weather-clear',
  'clear-night': 'weather-clear-night',
  cloudy: 'weather-clouds',
  fog: 'weather-fog',
  'partly-cloudy-day': 'weather-few-clouds',
  'partly-cloudy-night': 'weather-few-clouds-night',
  'light-rain': 'weather-drizzle-day',
  'light-rain-night': 'weather-drizzle-day',
};

export function getIconSrc(icon) {
  return `images/weather/${IconMap[icon]}.png`;
}
