import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';
import { getDayOfWeek } from 'js/utils/timeUtils';

export default class WeatherInfo extends React.Component {
  getRainProbability() {
    return `${this.props.precipProb}%`;
  }

  renderIcon() {
    const { icon } = this.props;
    return (
      <div className="weather-info__icon">
        <img src={getIconSrc(icon)} alt={icon} className="img" />
      </div>
    );
  }

  renderTimeOfWeek() {
    const dayOfWeek = getDayOfWeek(this.props.time * 1000, true);
    return (
      <div className="weather-info__tow">
        {dayOfWeek}
      </div>
    );
  }

  renderMaxTemp() {
    return (
      <div className="weather-info__max font-bold">
        {this.props.maxTemp}
      </div>
    );
  }

  renderPrecipProb() {
    return (
      <div className="weather-info__precip">
        <i className="fa fa-cloud" aria-hidden="true" />
        <span className="precip-prob">
          {this.getRainProbability()}
        </span>
      </div>
    );
  }

  renderMinTemp() {
    return (
      <div className="weather-info__min">
        {this.props.minTemp}
      </div>
    );
  }

  render() {
    return (
      <div className="weather-info flex">
        {this.renderTimeOfWeek()}
        {this.renderIcon()}
        {this.renderMaxTemp()}
        {this.renderMinTemp()}
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  time: React.PropTypes.number,
  icon: React.PropTypes.string,
  maxTemp: React.PropTypes.number,
  minTemp: React.PropTypes.number,
  precipProb: React.PropTypes.number,
};

