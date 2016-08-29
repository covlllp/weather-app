import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';
import { getTimeString } from 'js/utils/timeUtils';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  renderIcon() {
    const imageSrc = getIconSrc(this.props.icon);
    return (
      <div className="weather__icon">
        <img src={imageSrc} alt={this.props.icon} />
      </div>
    );
  }

  renderMoreInfo() {
    return (
      <div className="info__more">
        <span className="info__high">
          <i className="fa fa-long-arrow-up" aria-hidden="true" />
          {this.props.maxTemp}
        </span>
        <span className="info__low">
          <i className="fa fa-long-arrow-down" aria-hidden="true" />
          {this.props.minTemp}
        </span>
        <span className="info__prob">
          <i className="fa fa-tint" aria-hidden="true" />
          {this.props.precipProb}
        </span>
      </div>
    );
  }

  renderInfo() {
    const currentTemp = `${this.props.currentTemp}\u00B0`;
    return (
      <div className="weather__info info">
        <div className="info__time">
          {getTimeString(this.state.time)}
        </div>
        <div className="info__temp">
          {currentTemp}
        </div>
        {this.renderMoreInfo()}
      </div>
    );
  }

  renderWeather() {
    return (
      <div className="weather">
        {this.renderIcon()}
        {this.renderInfo()}
      </div>
    );
  }

  renderPoncho() {
    const { ponchoData } = this.props;
    return (
      <div className="poncho">
        <div className="poncho__header">
          {ponchoData.subject}
        </div>
        <div className="poncho__body">
          {ponchoData.opener}
          {ponchoData.content}
        </div>
        <img src={ponchoData.media} alt="poncho-img" />
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
