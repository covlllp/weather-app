import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';
import { getDayOfWeek } from 'js/utils/timeUtils';

export default class WeatherInfo extends React.Component {
  renderIcon() {
    const { icon } = this.props;
    return (
      <div className="weather-info__icon">
        <img src={getIconSrc(icon)} alt={icon} />
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div className="weather-info">
        {getDayOfWeek(this.props.time)}
        {this.renderIcon()}
        {this.props.maxTemp}
        {this.props.minTemp}
        {this.props.precipProb}
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

