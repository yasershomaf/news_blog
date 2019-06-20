import React from 'react';

import '../styles/articleCard.css';

export default function ArticleCard({details}) {
  console.log(details)
  return <div className='article_card'>
    <img className='article_card_image' src={details.urlToImage}/>
  </div>;
};
