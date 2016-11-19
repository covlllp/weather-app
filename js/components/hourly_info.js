import React from 'react';

import * as TimeUtils from 'js/utils/timeUtils';

export default class HourlyInfo extends React.Component {
  renderHour(hour) {
    return (
      <div>
        {TimeUtils.getTimeString(hour.time)}
      </div>
    );
  }

  render() {
    const hours = [];
    let a = 0;
    this.props.hourData.forEach((hour) => {
      hours.push(this.renderHour(hour));
      console.log(hour.time - a);
      a = hour.time;
    });

    return (
      <div className="container hourly-info">
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
