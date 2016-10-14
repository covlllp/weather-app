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

  renderDate() {
    const { time } = this.state;
    return (
      <div className="time__date">
        <div className="week">
          {timeUtils.getDayOfWeek(time)}
        </div>
        <div className="date">
          {timeUtils.getDateString(time)}
        </div>
      </div>
    );
  }

  renderTime() {
    return (
      <div className="time__time font-large font-bold">
        {timeUtils.getTimeString(this.state.time)}
      </div>
    );
  }

  render() {
    return (
      <div className="container time">
        {this.renderDate()}
        {this.renderTime()}
      </div>
    );
  }
}
