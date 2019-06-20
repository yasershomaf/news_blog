import React, { Component, Fragment } from 'react';

import '../styles/article.css';

export default class Article extends Component {
  componentDidMount() {
    if (this.props.location.state.article) {
      this.setState(this.props.location.state.article);
    }
    else {

    }
  }
  render() {
    const article = this.state;
    return <Fragment>
      {article ? <Fragment>
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
        
      </Fragment> : ''}
    </Fragment>;
  }
};
