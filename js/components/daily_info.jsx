import React from 'react';

import WeatherDay from 'js/components/weather_day';

export default class DailyInfo extends React.Component {
  renderDays() {
    return this.props.days.map((day, index) => (
      <WeatherDay
        time={day.time}
        icon={day.icon}
        maxTemp={day.maxTemp}
        minTemp={day.minTemp}
        precipProb={day.minTemp}
        key={index}
      />
    ));
  }

  render() {
    if (!this.props.days.length) return null;

    return (
      <div className="container daily-info flex">
        {this.renderDays()}
      </div>
    );
  }
}

DailyInfo.propTypes = {
  days: React.PropTypes.arrayOf(React.PropTypes.shape(WeatherDay.propTypes)),
};
