import { createActions } from 'redux-actions';

import * as PonchoUtils from 'js/utils/ponchoUtils';
import * as FlickrUtils from 'js/utils/flickrUtils';
import * as TimeUtils from 'js/utils/timeUtils';

export const actions = {
  SET_IMAGE: 'SET_IMAGE',
  SET_DAILY_INFO: 'SET_DAILY_INFO',
  SET_HOURLY_INFO: 'SET_HOURLY_INFO',
  SET_PONCHO_DESCRIPTION: 'SET_PONCHO_DESCRIPTION',
  SET_TODAY_INFO: 'SET_TODAY_INFO',
};

const {
  setImage,
  setDailyInfo,
  setHourlyInfo,
  setPonchoDescription,
  setTodayInfo,
} = createActions(...Object.keys(actions));

// Deserializers
const deserializeMainPonchoResponse = response => response.data;
const deserializeSeriesPonchoResponse = response => response.data.series;
const deserializePonchoDescription = data => ({
  subject: data.subject,
  opener: data.opener_f,
  content: data.content_f,
  media: data.media,
});
const deserializeTodayInfo = data => ({
  maxTemp: data.max_temp_f,
  minTemp: data.min_temp_f,
  weather: data.condition,
});
const deserializeDailyInfo = data => data.map(dailyData => ({
  time: dailyData.time,
  maxTemp: dailyData.temp_max_f,
  minTemp: dailyData.temp_min_f,
  icon: dailyData.icon,
  precipProb: dailyData.precip_prob,
}));
const deserializeHourlyInfo = data => data.map(hourlyData => ({
  time: hourlyData.time * 1000,
  temp: hourlyData.temp_f,
  icon: hourlyData.icon,
  precipProb: hourlyData.precip_prob,
}));


// Ajax functions

function fetchMainPonchoData(dispatch) {
  return PonchoUtils.fetchMainPonchoData()
  .then(deserializeMainPonchoResponse)
  .then(data => {
    dispatch(setPonchoDescription(deserializePonchoDescription(data)));
    dispatch(setTodayInfo(deserializeTodayInfo(data)));
  });
}

function fetchDailyPonchoData(dispatch) {
  return PonchoUtils.fetchDailyPonchoData()
  .then(deserializeSeriesPonchoResponse)
  .then(data => {
    dispatch(setDailyInfo(deserializeDailyInfo(data)));
  });
}

function fetchHourlyPonchoData(dispatch) {
  return PonchoUtils.fetchHourlyPonchoData()
  .then(deserializeSeriesPonchoResponse)
  .then(data => {
    dispatch(setHourlyInfo(deserializeHourlyInfo(data)));
  });
}

function setBackgroundImage(dispatch, weather) {
  return FlickrUtils.getGroupId()
  .then(groupId => {
    const tags = [
      weather,
      TimeUtils.getSeason(),
      TimeUtils.getTimeOfDay(),
    ];
    return FlickrUtils.getRandomImageUrl(groupId, tags);
  }).then(imageUrl => {
    dispatch(setImage(imageUrl));
  });
}

export const dispatchActions = {
  fetchMainPonchoData,
  fetchDailyPonchoData,
  fetchHourlyPonchoData,
  setBackgroundImage,
};
