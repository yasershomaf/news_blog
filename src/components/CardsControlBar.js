import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import '../styles/cardsControlBar.css';

export default withRouter(class CardsControlBar extends Component {
  categoryChangeHandler = e => {
    this.pushHistoryHandler({...this.searchQueries, category: e.target.value});
  };
  sortChangeHandler = e => {
    this.pushHistoryHandler({...this.searchQueries, sort: e.target.value});
  }
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
  pushHistoryHandler = queries => {
    let newPath = Object.keys(queries).reduce((acc, currentKey) => {
      acc += `${currentKey}=${queries[currentKey]}&`;
      return acc;
    }, `${this.props.location.pathname}?`);
    newPath = newPath.slice(0, newPath.length - 1);
    this.props.history.push(newPath);
  }
  render() {
    const defaultSearchQueries = {category: 'general', page: '1', sort: 'newfirst'};
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
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    return <div className='cards_control_bar'>
      <div>Category:</div>
      <select value={this.searchQueries.category} onChange={this.categoryChangeHandler}>
        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
      </select>
      <div>Sort by:</div>
      <select value={this.searchQueries.sort} onChange={this.sortChangeHandler}>
        <option value='newfirst'>New first</option>
        <option value='oldfirst'>Old first</option>
      </select>
      <div className='prev_button' onClick={this.prevPageHandler}/>
      <div>Page {this.searchQueries.page}</div>
      <div className='nxt_button' onClick={this.nxtPageHandler}/>
    </div>;
  }
});