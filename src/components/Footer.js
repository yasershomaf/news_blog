import React from 'react';

import '../styles/footer.css';

export default function Footer() {
  return <div className='footer_container'>
    <div className='app_container footer_nav_container'>
      <a href='/about'>About</a>
      <a href='#'>Careers</a>
      <a href='#'>Contact</a>
      <a href='https://newsapi.org/'>Powered by News API</a>
    </div>
  </div>;
};
