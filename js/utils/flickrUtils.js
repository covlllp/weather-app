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
  Object.keys(urlOptions).forEach((key) => {
    url = `${url}&${key}=${urlOptions[key]}`;
  });
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

export function getImageUrl(photo) {
  const { id, secret, server, farm } = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
}

export function getRandomImageUrl(groupId, tags) {
  const joinedTags = tags.join();
  const urlOptions = {
    method: 'flickr.photos.search',
    tags: joinedTags,
    tag_mode: 'all',
    group_id: groupId,
  };
  const url = buildUrl(urlOptions);
  return ajax(url).then((response) => {
    const photos = eval(response).photos.photo;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const photo = photos[randomIndex];
    console.log(photos.length);
    return getImageUrl(photo);
  });
}

