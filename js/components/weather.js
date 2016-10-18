import React from 'react';

import { getIconSrc } from 'js/utils/ponchoUtils';

export default class Weather extends React.Component {
  getRainProbability() {
    const rainPercentage = Math.round(this.props.precipProb * 100);
    return `${rainPercentage}%`;
  }

  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;

    return (
      <div className="weather__icon">
        <img src={getIconSrc(icon)} alt={icon} />
      </div>
    );
  }

  renderHighLow() {
    return (
      <div className="info__high-low">
        <span className="info__high font-bold">
          {this.props.maxTemp}
        </span>
        <span className="info__low">
          {this.props.minTemp}
        </span>
      </div>
    );
  }

  renderInfo() {
    const currentTemp = `${this.props.currentTemp}\u00B0`;
    return (
      <div className="weather__info info">
        <div className="info__temp font-large font-bold">
          {currentTemp}
        </div>
        {this.renderHighLow()}
        <div className="info__rain">
          &#9730;
          <span className="info__prob precip-prob">
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

Weather.propTypes = {
  maxTemp: React.PropTypes.number,
  minTemp: React.PropTypes.number,
  currentTemp: React.PropTypes.number,
  icon: React.PropTypes.string,
  precipProb: React.PropTypes.number,
};
