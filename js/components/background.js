import React from 'react';

import * as FlickrUtils from 'js/utils/flickrUtils';

export default class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flickrGroupId: null,
    };
  }

  componentDidMount() {
    this.getProjectWeatherGroupId();
  }

  getProjectWeatherGroupId() {
    return FlickrUtils.getGroupId('Project Weather').then((groupId) => {
      this.setState({ flickrGroupId: groupId });
    });
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
        {JSON.stringify(this.state)}
      </div>
    );
  }

}
