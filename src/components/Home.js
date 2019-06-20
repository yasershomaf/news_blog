import React, { Component, Fragment } from 'react';

import CardsControlBar from './CardsControlBar';
import ArticleCard from './ArticleCard';

import '../styles/home.css';

export default class Home extends Component {
  componentDidMount() {
    this.articlesFetchHandler();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.location.search !== this.props.location.search) {
      this.articlesFetchHandler();
    }
  }
  articlesFetchHandler = () => {
    const defaultSearchQueries = {category: 'general', page: '1'};
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
    fetch(
      `https://newsapi.org/v2/top-headlines?country=nl&apiKey=d64511a0d5c2408f8f8f5ae1ff72c38b&pageSize=12&page=${
        this.searchQueries.page
      }&category=${this.searchQueries.category}`
    )
    .then(res => res.json())
    .then(results => {
      if (results.status === 'ok') {
        this.setState(results);
      }
    });
  };
  render() {
    return <Fragment>
      {this.state && this.state.totalResults ?
        <CardsControlBar maxPage={Math.ceil(this.state.totalResults / 12)}/> :
        ''
      }
      <div className='articles_container'>
        {this.state && this.state.articles ? this.state.articles.map((article, index) => <ArticleCard
          key={index}
          index={index}
          searchQueries={this.searchQueries}
          article={article}
        />) : ''}
      </div>
    </Fragment>;
  }
};