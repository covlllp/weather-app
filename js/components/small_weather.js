import React from 'react';

export default class SmallWeather extends React.Component {
  renderDays() {
    return <div />;
  }

  render() {
    console.log(this.props);
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
