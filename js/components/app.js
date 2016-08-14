import React from 'react';

import Background from 'js/components/background';

export default class App extends React.Component {
  render() {
    return (
      <Background
        location='New York City'
        weather='sunny'
      />
    );
  }

}
