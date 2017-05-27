import React from 'react';
import ReactDOM from 'react-dom';

import App from 'js/components/app';

import 'scss/style';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-content')
  );
});
