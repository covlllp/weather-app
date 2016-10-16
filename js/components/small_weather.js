import React from 'react';

import WeatherInfo from 'js/components/weather_info';

export default class SmallWeather extends React.Component {
  renderDays() {
    return this.props.days.map((day, index) => (
      <WeatherInfo
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
    return (
      <div className="container future">
        {this.renderDays()}
      </div>
    );
  }
}

SmallWeather.propTypes = {
  days: React.PropTypes.array,
};
