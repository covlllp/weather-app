import React from 'react';

import * as NewsUtils from 'js/utils/newsUtils';
import { NewsConstants } from 'js/constants';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    NewsUtils.getNewsTitles().then((titles) => {
      this.setState({ items: titles });
    });
  }

  renderItem(title, key) {
    return (
      <div
        className="news__item"
        key={key}
      >
        <i className="fa fa-ellipsis-h fa-fw news__icon" aria-hidden="true" />
        {title}
      </div>
    );
  }

  renderItems() {
    const items = [];
    const maxItems = Math.min(NewsConstants.maxItems, this.state.items.length);
    for (let i = 0; i < maxItems; i++) {
      const item = this.state.items[i];
      items.push(this.renderItem(item, i));
    }
    return items;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="news container">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}
