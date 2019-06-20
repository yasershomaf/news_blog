import React from 'react';
import {Link} from 'react-router-dom';

import '../styles/articleCard.css';

export default function ArticleCard({article}) {
  return <Link to={{
    pathname: '/article',
    state: {
      article: article
    }
  }} className='article_card'>
    {article.urlToImage ? <img alt='Article pic' className='card_image' src={article.urlToImage}/> : ''}
    {article.title ? <h1 className='card_title'>{article.title}</h1> : ''}
    <div className='card_author'>
      {article.author ? `${article.author} - ` : ''}
      {article.source && article.source.name ? `Source: ${article.source.name} - ` : ''}
      {article.publishedAt ? new Date(article.publishedAt).toDateString() : ''}
    </div>
    {article.description ? <p className='card_description'>{article.description}</p> : ''}
  </Link>;
};
