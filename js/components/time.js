import React from 'react';

import * as timeUtils from 'js/utils/timeUtils';

export default class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime() {
    this.setState({ time: new Date() });
  }

  render() {
    const { time } = this.state;

    return (
      <div className="container time">
        <div className="time__week">
          {timeUtils.getDayOfWeek(time)}
        </div>
        <div className="time__date">
          {timeUtils.getDateString(time)}
        </div>
        <div className="time__time">
          {timeUtils.getTimeString(time)}
        </div>
      </div>
    );
  }
}
