import React from 'react';
import { connect } from 'react-redux';

import { dispatchActions } from 'js/actions';

import MainWeather from 'js/components/main_weather';
import DailyInfo from 'js/components/daily_info';
import { dailyPropShape } from 'js/components/weather_day';
import HourlyInfo, { hourlyPropShape } from 'js/components/hourly_info';
import Poncho from 'js/components/poncho';
import Time from 'js/components/time';

const pt = React.PropTypes;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    this.updateInfo();
    this.interval = setInterval(this.updateInfo, 60 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBackgroundStyle() {
    const { background } = this.props;
    if (background) {
      return { backgroundImage: `url(${background})` };
    }
    return {};
  }

  updateInfo() {
    Promise.all([
      this.props.actions.fetchMainPonchoData(),
      this.props.actions.fetchDailyPonchoData(),
      this.props.actions.fetchHourlyPonchoData(),
      this.props.actions.fetchFlickrGroupId(),
    ]).then(() => {
      this.props.actions.setBackgroundImage({
        weather: this.props.today.weather,
        groupId: this.props.flickrId,
      });
    });
  }

  get today() {
    if (this.props.hourly.length && this.props.daily.length) {
      const dailyData = this.props.daily[0];
      const hourlyData = this.props.hourly[0];
      return {
        maxTemp: dailyData.maxTemp,
        minTemp: dailyData.minTemp,
        currentTemp: hourlyData.temp,
        icon: hourlyData.icon,
        precipProb: dailyData.precipProb,
      };
    }
    return {};
  }

  render() {
    const { today } = this;
    const { poncho, hourly, daily } = this.props;
    return (
      <div
        style={this.getBackgroundStyle()}
        id="app"
      >
        <div className="flex parent">
          <MainWeather
            maxTemp={today.maxTemp}
            minTemp={today.minTemp}
            currentTemp={today.currentTemp}
            icon={today.icon}
            precipProb={today.precipProb}
          />
          <Time />
        </div>
        <DailyInfo days={daily.slice(0, 5)} />
        <HourlyInfo hourData={hourly.slice(0, 12)} />
        <Poncho
          subject={poncho.subject}
          opener={poncho.opener}
          content={poncho.content}
          media={poncho.media}
        />
      </div>
    );
  }
}

App.propTypes = {
  actions: pt.objectOf(pt.func),
  today: pt.object,
  poncho: pt.object,
  daily: pt.arrayOf(pt.shape(dailyPropShape)),
  hourly: pt.arrayOf(pt.shape(hourlyPropShape)),
  background: pt.string,
  flickrId: pt.string,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  const boundDispatchActions = {};
  Object.keys(dispatchActions).forEach(key => {
    const action = dispatchActions[key];
    boundDispatchActions[key] = action.bind(this, dispatch);
  });
  return { actions: boundDispatchActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
