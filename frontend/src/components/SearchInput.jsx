import React from 'react';

export default function SearchInput({ query, onInputChange }) {
  return (
    <div className='search-input'>
        <input
            autoFocus
            onChange={onInputChange}
            placeholder='Enter a song...'
            type="text"
            value={query}
        />
    </div>
  )
}
