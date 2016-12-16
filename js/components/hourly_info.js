import React from 'react';

import * as TimeUtils from 'js/utils/timeUtils';
import * as MathUtils from 'js/utils/mathUtils';

const tempOffset = 2;

export default class HourlyInfo extends React.Component {

  getMinPrecip() {
    if (!this.props) return null;
    return MathUtils.getMinValue(this.props.hourData.map((data) => data.precipProb));
  }

  getMaxPrecip() {
    if (!this.props) return null;
    return MathUtils.getMaxValue(this.props.hourData.map((data) => data.precipProb));
  }

  getMinTemp() {
    if (!this.props) return null;
    return MathUtils.getMinValue(this.props.hourData.map((data) => data.temp)) - tempOffset;
  }

  getMaxTemp() {
    if (!this.props) return null;
    return MathUtils.getMaxValue(this.props.hourData.map((data) => data.temp)) + tempOffset;
  }

  renderHour(hour) {
    console.log(hour);
    const maxTemp = this.getMaxTemp();
    const minTemp = this.getMinTemp();
    const tempDiff = maxTemp - minTemp;
    const tempHeight = hour.temp - minTemp;
    const tempPercent = tempHeight / tempDiff * 100;

    const precipProb = hour.precipProb * 100;

    const tempDivStyle = {
      top: `${100 - tempPercent}%`,
      height: `${tempPercent}%`,
    };

    const precipDivStyle = {
      top: `${100 - precipProb}%`,
      height: `${precipProb}%`,
    };

    return (
      <div className="flex">
        <div className="rain-precip" style={precipDivStyle} />
        <div className="rain-precip" style={tempDivStyle} />
      </div>
    );
  }

  render() {
    const hours = this.props.hourData.map((hour) => this.renderHour(hour));

    return (
      <div className="container hourly-info flex">
        {hours}
      </div>
    );
  }
}

HourlyInfo.propTypes = {
  hourData: React.PropTypes.arrayOf(React.PropTypes.shape({
    precipProb: React.PropTypes.number,
    temp: React.PropTypes.number,
    time: React.PropTypes.number,
  })),
};
