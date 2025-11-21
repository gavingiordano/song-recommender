import React from 'react';

export default function SearchResults({ searchResults, onSongSelect }) {
    if (searchResults.length === 0) {
        return null;
    }

    return (
        <ul className='search-results'>
            {searchResults.map((track, index) => {
                return(
                    <li className='search-result' key={index} onClick={() => onSongSelect(track)}>
                        <div>
                            <div>{track.name}</div>
                            <div className='artist'>- {track.artist}</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
