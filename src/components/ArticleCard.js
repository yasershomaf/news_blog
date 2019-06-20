import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/articleCard.css';

export default function ArticleCard({article, searchQueries, index}) {
  let searchQueriesString = Object.keys(searchQueries).reduce((acc, currentKey) => {
    acc += `${currentKey}=${searchQueries[currentKey]}&`;
    return acc;
  }, '');
  searchQueriesString += `index=${index}`;
  return <Link to={{
    pathname: `/article/?${searchQueriesString}`,
    state: {
      article: article
    }
  }} className='article_card'>
    {article.urlToImage ? <img className='card_image' src={article.urlToImage}/> : ''}
    {article.title ? <h1 className='card_title'>{article.title}</h1> : ''}
    <div className='card_author'>
      {article.author ? `${article.author} - ` : ''}
      {article.publishedAt ? new Date(article.publishedAt).toDateString() : ''}
    </div>
    {article.description ? <p className='card_description'>{article.description}</p> : ''}
  </Link>;
};
