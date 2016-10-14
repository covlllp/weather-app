import React from 'react';

function getImageTag(src) {
  if (!src) return null;
  return <img src={src} alt="poncho-img" />;
}

export default function Poncho(props) {
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
      {getImageTag(props.media)}
    </div>
  );
}

Poncho.propTypes = {
  subject: React.PropTypes.string,
  opener: React.PropTypes.string,
  content: React.PropTypes.string,
  media: React.PropTypes.string,
};
