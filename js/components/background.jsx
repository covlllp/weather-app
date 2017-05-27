import React from 'react';

import * as FlickrUtils from 'js/utils/flickrUtils';

export default class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flickrGroupId: null,
      imageSrc: null,
    };
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.getProjectWeatherGroupId().then(this.getImage);
  }

  getProjectWeatherGroupId() {
    return FlickrUtils.getGroupId('Project Weather').then((groupId) => {
      this.setState({ flickrGroupId: groupId });
    });
  }

  getImage() {
    const { location, weather } = this.props;
    const tags = [weather, 'day'];
    FlickrUtils.getRandomImageUrl(this.state.flickrGroupId, tags).then((imageUrl) => {
      this.setState({ imageSrc: imageUrl });
    });
  }

  render() {
    return (
      <img
        src={this.state.imageSrc}
        alt="background"
      />
    );
  }
}

Background.propTypes = {
  weather: React.PropTypes.string,
  location: React.PropTypes.string,
};
