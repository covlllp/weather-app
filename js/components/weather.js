import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';

export default class Weather extends React.Component {
  renderIcon() {
    const imageSrc = getIconSrc(this.props.icon);
    return (
      <div className="weather__icon">
        <img src={imageSrc} alt={this.props.icon} />
      </div>
    );
  }

  renderInfo() {
    return (
      <div className="weather__info">
        {this.props.currentTemp}
        {this.props.maxTemp}
        {this.props.minTemp}
        {this.props.precipProb}
      </div>
    );
  }

  renderWeather() {
    const imageSrc = getIconSrc(this.props.icon);
    return (
      <div className="weather">
        {this.renderIcon()}
        {this.renderInfo()}
      </div>
    );
  }

  renderPoncho() {
    return (
      <div className="poncho">
        Poncho
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main container">
          {this.renderWeather()}
          {this.renderPoncho()}
        </div>
      </div>
    );
  }

}

Weather.propTypes = {
  maxTemp: React.PropTypes.number,
  minTemp: React.PropTypes.number,
  currentTemp: React.PropTypes.number,
  icon: React.PropTypes.string,
  precipProb: React.PropTypes.number,
  ponchoData: React.PropTypes.shape({
    subject: React.PropTypes.string,
    opener: React.PropTypes.string,
    content: React.PropTypes.string,
    media: React.PropTypes.string,
  }),
};
