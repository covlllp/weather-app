import React from 'react';

import * as TimeUtils from 'js/utils/timeUtils';
import * as MathUtils from 'js/utils/mathUtils';

const tempOffset = 10;

export default class HourlyInfo extends React.Component {
  getTempStyle(hour) {
    const maxTemp = this.getMaxTemp();
    const minTemp = this.getMinTemp();
    const tempDiff = maxTemp - minTemp;
    const tempHeight = hour.temp - minTemp;
    let tempPercent = tempHeight / tempDiff;
    tempPercent *= 100;

    return {
      top: `${100 - tempPercent}%`,
      height: `${tempPercent}%`,
    };
  }

  getPrecipStyle(hour) {
    let precipProb = hour.precipProb;
    precipProb *= 100;

    return {
      top: `${100 - precipProb}%`,
      height: `${precipProb}%`,
    };
  }

  getMinPrecip() {
    if (!this.props || !this.props.hourData.length) return null;
    return MathUtils.getMinValue(this.props.hourData.map((data) => data.precipProb));
  }

  getMaxPrecip() {
    if (!this.props || !this.props.hourData.length) return null;
    return MathUtils.getMaxValue(this.props.hourData.map((data) => data.precipProb));
  }

  getMinTemp() {
    if (!this.props || !this.props.hourData.length) return null;
    let minTemp = MathUtils.getMinValue(this.props.hourData.map((data) => data.temp));
    minTemp -= tempOffset;
    return Math.round(minTemp / 10) * 10;
  }

  getMaxTemp() {
    if (!this.props || !this.props.hourData.length) return null;
    let maxTemp = MathUtils.getMaxValue(this.props.hourData.map((data) => data.temp));
    maxTemp += tempOffset;
    return Math.round(maxTemp / 10) * 10;
  }

  renderHeader() {
    return (
      <div className="flex">
        <div className="flex">
          <div className="square yellow" />
          <div className="side-pad">
            Temperature
          </div>
        </div>
        <div className="flex">
          <div className="side-pad">
            Precipitation
          </div>
          <div className="square blue" />
        </div>
      </div>
    );
  }

  renderHour(hour) {
    const tempDivStyle = this.getTempStyle(hour);
    const precipDivStyle = this.getPrecipStyle(hour);

    return (
      <div className="flex">
        <div className="rain-precip blue" style={precipDivStyle} />
        <div className="rain-precip yellow" style={tempDivStyle} />
      </div>
    );
  }

  renderHours() {
    const hours = this.props.hourData.map((hour) => this.renderHour(hour));
    return hours;
  }

  renderTempUnits() {
    const labels = [];
    let temp = this.getMaxTemp();
    const minTemp = this.getMinTemp();
    while (temp >= minTemp) {
      labels.push(<div>{temp}</div>)
        temp -= 10;
    }

    return (
      <div className="flex flex-column labels">
        {labels}
      </div>
    );
  }

  renderPrecipUnits() {
    return (
      <div className="flex flex-column labels">
        <div>100%</div>
        <div>0%</div>
      </div>
    );
  }

  render() {
    return (
      <div className="container hourly-info">
        {this.renderHeader()}
        <div className="hourly-info__hours flex">
          {this.renderTempUnits()}
          {this.renderHours()}
          {this.renderPrecipUnits()}
        </div>
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
