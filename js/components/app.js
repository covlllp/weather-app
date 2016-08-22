import React from 'react';

import News from 'js/components/news';

import * as FlickrUtils from 'js/utils/flickrUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageSrc: null,
      weather: null,
    };
  }

  componentDidMount() {
    this.getBackgroundSrc();
  }

  getBackgroundSrc() {
    FlickrUtils.getGroupId('Project Weather')
    .then((groupId) => FlickrUtils.getRandomImageUrl(groupId, ['sunny', 'summer', 'dawn']))
    .then((imageSrc) => {
      this.setState({ backgroundImageSrc: imageSrc });
    });
  }

  getBackgroundStyle() {
    const { backgroundImageSrc } = this.state;
    const divStyle = {};
    if (backgroundImageSrc) {
      divStyle.backgroundImage = `url(${backgroundImageSrc})`;
    } else {
      divStyle.backgroundColor = 'lightblue';
    }
    return divStyle;
  }

  render() {
    return (
      <div
        style={this.getBackgroundStyle()}
        id="app"
      >
        <News />
      </div>
    );
  }

}
