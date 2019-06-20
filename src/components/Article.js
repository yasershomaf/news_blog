import React, { Component, Fragment } from 'react';

import ArticleCard from './ArticleCard';

import '../styles/article.css';

export default class Article extends Component {
  constructor() {
    super();
    this.state = {
      article: {},
      relevantArticles: []
    }
  }
  componentDidMount() {
    this.setState({article: this.props.location.state.article});
    this.fetchRelevantArticles(this.props.location.state.article.title);
  }
  componentDidUpdate(oldProps) {
    if (oldProps.location.state.article.title !== this.props.location.state.article.title) {
      this.componentDidMount();
    }
  }
  fetchRelevantArticles = (keyWords) => {
    fetch(
      `https://newsapi.org/v2/everything?apiKey=d64511a0d5c2408f8f8f5ae1ff72c38b&q=${
        keyWords.match(/\b[A-Z]\w+\b/g).join(' OR ')
      }&sortBy=relevancy`
    )
    .then(res => res.json())
    .then(results => {
      if (results.status === 'ok') {
        const articles = results.articles;
        let counter = 3;
        const relevantArticles = [];
        for (let i=0; i<articles.length; i++) {
          if (articles[i].title !== this.props.location.state.article.title) {
            relevantArticles.push(articles[i]);
            counter--;
            if (counter === 0) {
              break;
            }
          }
        }
        this.setState({relevantArticles: relevantArticles});
      }
    });
  }
  render() {
    const article = this.state.article;
    const relevantArticles = this.state.relevantArticles;
    return <Fragment>
      {article.title ? <h1 className='article_title'>{article.title}</h1> : ''}
      {article.description ? <h2 className='article_description'>{article.description}</h2> : ''}
      {article.urlToImage ? <img
        className='article_image'
        alt='Article pic'
        src={article.urlToImage}
      /> : ''}
      <div className='article_author'>
        {article.author ? `Author: ${article.author} - ` : ''}
        {article.source && article.source.name ? `Source: ${article.source.name} - ` : ''}
        {article.publishedAt ? `Published at: ${
          new Date(article.publishedAt).toDateString()
        }` : ''}
      </div>
      {article.content ? <p>{article.content} {
        article.url ? <a href={article.url} target='_blank'>More info</a> : ''
      }</p> : ''}
      {relevantArticles.length > 0 ? <h1>Relevant articles</h1> : ''}
      {relevantArticles.length > 0 ? <div className='articles_container'>
        {relevantArticles.map((relevantArticle, index) => <ArticleCard
          key={index}
          article={relevantArticle}
        />)}
      </div> : ''}
    </Fragment>;
  }
};
