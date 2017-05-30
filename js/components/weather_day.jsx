import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';
import { getDayOfWeek } from 'js/utils/timeUtils';

export default class WeatherDay extends React.Component {
  getPrecipProbPercent() {
    return `${this.props.precipProb}%`;
  }

  renderIcon() {
    const { icon } = this.props;
    return (
      <div className="icon">
        <img src={getIconSrc(icon)} alt={icon} className="img" />
      </div>
    );
  }

  renderDayOfWeek() {
    const dayOfWeek = getDayOfWeek(this.props.time * 1000, true);
    return (
      <div className="dow font-bold">
        {dayOfWeek}
      </div>
    );
  }

  renderMaxTemp() {
    return (
      <div className="max-temp font-bold font-small">
        {this.props.maxTemp}
      </div>
    );
  }

  renderMinTemp() {
    return (
      <div className="min-temp font-small">
        {this.props.minTemp}
      </div>
    );
  }

  renderPrecipProb() {
    return (
      <div className="rain font-small">
        <i className="fa fa-tint" aria-hidden="true" />
        <span className="precip">
          {this.getPrecipProbPercent()}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="weather-day flex flex-column">
        {this.renderDayOfWeek()}
        {this.renderIcon()}
        <div className="flex space-around temps">
          {this.renderMaxTemp()}
          {this.renderMinTemp()}
        </div>
        {this.renderPrecipProb()}
      </div>
    );
  }
}

export const dailyPropShape = {
  time: React.PropTypes.number,
  icon: React.PropTypes.string,
  maxTemp: React.PropTypes.number,
  minTemp: React.PropTypes.number,
  precipProb: React.PropTypes.number,
};

WeatherDay.propTypes = dailyPropShape;

