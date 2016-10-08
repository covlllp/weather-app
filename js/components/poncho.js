import React from 'react';

export default function Poncho(props) {
  return (
    <div className="container poncho">
      <div className="poncho__header">
        {props.subject}
      </div>
      <div className="poncho__body">
        {props.opener}
        {props.content}
      </div>
      <img src={props.media} alt="poncho-img" />
    </div>
  );
}

Poncho.propTypes = {
  subject: React.PropTypes.string,
  opener: React.PropTypes.string,
  content: React.PropTypes.string,
  media: React.PropTypes.string,
};
