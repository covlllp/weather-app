import { ajax } from 'jquery';

import { FlickrConstants } from 'js/constants';
import keys from 'js/secrets/keys';

function buildUrl(options) {
  const urlOptions = options;
  let url = FlickrConstants.restUrl;
  if (!urlOptions.format) {
    urlOptions.format = 'json';
  }
  if (!urlOptions.api_key) {
    urlOptions.api_key = keys.FLICKR_KEY;
  }
  for (let key in urlOptions) {
    url = url + '&' + key + '=' + urlOptions[key];
  }
  return url.replace('&', '?');
}

function jsonFlickrApi(response) {
  return response;
}

export function getGroupId(groupName) {
  const urlOptions = {
    method: 'flickr.groups.search',
    text: groupName,
  };
  const url = buildUrl(urlOptions);

  return ajax(url).then((response) => {
    const groups = eval(response).groups.group;
    return groups[0].nsid;
  });
}
