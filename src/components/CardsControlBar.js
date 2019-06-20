import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import '../styles/cardsControlBar.css';

export default withRouter(class CardsControlBar extends Component {
  categoryChangeHandler = e => {
    this.pushHistoryHandler({...this.searchQueries, category: e.target.value});
  };
  prevPageHandler = () => {
    if (this.searchQueries.page !== '1') {
      this.pushHistoryHandler({...this.searchQueries, page: this.searchQueries.page - 1 + ''});
    }
  };
  nxtPageHandler = () => {
    if (this.searchQueries.page * 1 < this.props.maxPage) {
      this.pushHistoryHandler({...this.searchQueries, page: this.searchQueries.page * 1 + 1 + ''});
    }
  };
  pushHistoryHandler = path => {
    let newPath = Object.keys(path).reduce((acc, currentKey) => {
      acc += `${currentKey}=${path[currentKey]}&`;
      return acc;
    }, `${this.props.location.pathname}?`);
    newPath = newPath.slice(0, newPath.length - 1);
    this.props.history.push(newPath);
  }
  render() {
    const defaultSearchQueries = {category: 'all', page: '1'};
    if (this.props.location.search) {
      this.searchQueries = this.props.location.search.slice(1).split('&').reduce((acc, currentQuery) => {
        const splitIndex = currentQuery.indexOf('=');
        acc = {...acc, [currentQuery.slice(0, splitIndex)] : currentQuery.slice(splitIndex + 1)};
        return acc;
      }, defaultSearchQueries);
    }
    else {
      this.searchQueries = defaultSearchQueries;
    }
    const categories = ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    return <div className='cards_control_bar'>
      <div>Category: </div>
      <select value={this.searchQueries.category} onChange={this.categoryChangeHandler}>
        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
      </select>
      <div className='prev_button' onClick={this.prevPageHandler}/>
      <div>Page {this.searchQueries.page}</div>
      <div className='nxt_button' onClick={this.nxtPageHandler}/>
    </div>;
  }
});