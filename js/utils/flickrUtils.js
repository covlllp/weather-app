import { ajax } from 'jquery';

import { FlickrConstants } from 'js/constants';
import keys from 'js/secrets/keys';

function buildUrl(options) {
  Object.assign(options, { format: 'json', api_key: keys.FLICKR_KEY });
  const builtUrl = Object.keys(options).reduce((url, key) => (
    `${url}&${key}=${options[key]}`
  ), FlickrConstants.url);
  return builtUrl.replace('&', '?');
}

function jsonFlickrApi(response) {
  return response;
}

export function getGroupId() {
  const urlOptions = {
    method: 'flickr.groups.search',
    text: FlickrConstants.groupId,
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
  const joinedTags = tags.join(' ');
  const urlOptions = {
    method: 'flickr.photos.search',
    text: joinedTags,
    tag_mode: 'all',
    group_id: groupId,
  };
  const url = buildUrl(urlOptions);
  return ajax(url).then((response) => {
    const photos = eval(response).photos.photo;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const photo = photos[randomIndex];
    return getImageUrl(photo);
  });
}
