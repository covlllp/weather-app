import React from 'react';

export default class Poncho extends React.Component {
  getImageTag() {
    const { media } = this.props;
    if (!media) return null;
    return (
      <div className="poncho__media">
        <img src={media} alt="poncho-img" className="poncho__img" />
      </div>
    );
  }

  render() {
    const { props } = this;
    return (
      <div className="container poncho">
        <div className="poncho__header font-large font-bold">
          {props.subject}
        </div>
        <div className="poncho__body">
          <div className="poncho__opener">
            {props.opener}
          </div>
          <div className="poncho__content">
            {props.content}
          </div>
        </div>
        {this.getImageTag()}
      </div>
    );
  }
}

Poncho.propTypes = {
  subject: React.PropTypes.string,
  opener: React.PropTypes.string,
  content: React.PropTypes.string,
  media: React.PropTypes.string,
};

