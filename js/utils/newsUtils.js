import { ajax } from 'jquery';

import keys from 'js/secrets/keys';
import { NewsConstants } from 'js/constants';

function buildUrl() {
  const nytKey = keys.NYT_KEY;
  return `${NewsConstants.url}?api-key=${nytKey}`;
}

export function getTitleFromNewsTopic(topic) {
  return topic.title;
}

export function getNewsTopics() {
  return ajax(buildUrl()).then((response) => response.results);
}

export function getNewsTitles() {
  return getNewsTopics().then((topics) => topics.map(getTitleFromNewsTopic));
}
