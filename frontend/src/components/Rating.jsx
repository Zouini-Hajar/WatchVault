import React from 'react';

const Rating = ({rating}) => {
  return (
    <div className="flex items-center my-4">
      <svg className="w-4 h-4 text-yellow-500 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <p className="ms-1 text-sm font-bold text-gray-900">{rating}</p>
      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
      <a href="https://www.imdb.com">
        <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png" alt="IMDB Logo" className='w-7' />
      </a>
    </div>

  );
}

export default Rating;
