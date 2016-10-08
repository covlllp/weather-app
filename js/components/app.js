import React from 'react';

import Weather from 'js/components/weather';
import Poncho from 'js/components/poncho';
import Time from 'js/components/time';
import News from 'js/components/news';

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
  }

  componentDidMount() {
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

  render() {
    let dayInfo = {};
    if (this.state.days.length) dayInfo = this.state.days[0];
    const { today, ponchoData } = this.state;

    return (
      <div
        style={this.getBackgroundStyle()}
        id="app"
      >
        <div className="flex">
          <Weather
            ponchoData={ponchoData}
            maxTemp={dayInfo.maxTemp}
            minTemp={dayInfo.minTemp}
            currentTemp={today.temp}
            icon={today.icon}
            precipProb={dayInfo.precipProb}
          />
          <Time />
        </div>
        <Poncho
          subject={ponchoData.subject}
          opener={ponchoData.opener}
          content={ponchoData.content}
          media={ponchoData.media}
        />
        <News />
      </div>
    );
  }
}
