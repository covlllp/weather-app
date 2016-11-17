import React from 'react';

import Weather from 'js/components/weather';
import SmallWeather from 'js/components/small_weather';
import Poncho from 'js/components/poncho';
import Time from 'js/components/time';

import * as FlickrUtils from 'js/utils/flickrUtils';
import * as PonchoUtils from 'js/utils/ponchoUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImageSrc: null,
      ponchoData: {},
      weather: null,
      days: [],
      today: {},
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.interval = setInterval(this.getData, 60 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData() {
    this.getBackgroundSrc();
    this.getWeatherData();
  }

  getBackgroundSrc() {
    FlickrUtils.getGroupId('Project Weather')
    .then((groupId) => {
      const imageTags = [
        this.state.weather,
        PonchoUtils.getSeason(),
        PonchoUtils.getTimeOfDay(),
      ];
      return FlickrUtils.getRandomImageUrl(groupId, imageTags);
    }).then((imageSrc) => {
      this.setState({ backgroundImageSrc: imageSrc });
    });
  }

  getWeatherData() {
    PonchoUtils.getInitialWeatherData().then((weatherData) => {
      this.setState(weatherData);
    });
    PonchoUtils.getDailyWeatherData().then((dailyWeatherData) => {
      this.setState({ days: dailyWeatherData });
    });
    PonchoUtils.getCurrentWeather().then((currentData) => {
      this.setState({ today: currentData });
    });
  }

  getBackgroundStyle() {
    const { backgroundImageSrc } = this.state;
    if (backgroundImageSrc) {
      return { backgroundImage: `url(${backgroundImageSrc})` };
    }
    return {};
  }

  getTodaySummary() {
    if (this.state.days.length) return this.state.days[0];
    return {};
  }

  getFutureDays() {
    return this.state.days.slice(1, 5);
  }

  render() {
    const { today, ponchoData } = this.state;
    const todaySummary = this.getTodaySummary();

    return (
      <div
        style={this.getBackgroundStyle()}
        id="app"
      >
        <div className="flex">
          <Weather
            maxTemp={todaySummary.maxTemp}
            minTemp={todaySummary.minTemp}
            currentTemp={today.temp}
            icon={today.icon}
            precipProb={todaySummary.precipProb}
          />
          <Time />
        </div>
        <SmallWeather days={this.getFutureDays()} />
        <Poncho
          subject={ponchoData.subject}
          opener={ponchoData.opener}
          content={ponchoData.content}
          media={ponchoData.media}
        />
      </div>
    );
  }
}
