import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';

export default class MainWeather extends React.Component {
  getRainProbability() {
    const rainPercentage = Math.round(this.props.precipProb * 100);
    return `${rainPercentage}%`;
  }

  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;

    return (
      <div className="icon">
        <img src={getIconSrc(icon)} alt={icon} />
      </div>
    );
  }

  renderHighLow() {
    return (
      <div className="high-low">
        <span className="high font-bold">
          {this.props.maxTemp}
        </span>
        <span className="low">
          {this.props.minTemp}
        </span>
      </div>
    );
  }

  renderInfo() {
    const currentTemp = `${this.props.currentTemp}\u00B0`;
    return (
      <div className="info flex flex-column">
        <div className="temp font-large font-bold">
          {currentTemp}
        </div>
        {this.renderHighLow()}
        <div className="rain">
          <i className="fa fa-tint" aria-hidden="true" />
          <span className="precip">
            {this.getRainProbability()}
          </span>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.currentTemp) return null;
    return (
      <div className="container weather flex">
        {this.renderIcon()}
        {this.renderInfo()}
      </div>
    );
  }

}

MainWeather.propTypes = {
  maxTemp: React.PropTypes.number,
  minTemp: React.PropTypes.number,
  currentTemp: React.PropTypes.number,
  icon: React.PropTypes.string,
  precipProb: React.PropTypes.number,
};
