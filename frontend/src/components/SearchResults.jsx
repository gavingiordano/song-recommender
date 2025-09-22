import React from 'react';

export default function SearchResults({ searchResults, onSongSelect }) {
    if (searchResults.length === 0) {
        return null;
    }

    return (
        <ul>
            {searchResults.map((track, index) => {
                return(
                    <li key={index} onClick={() => onSongSelect(track)}>
                        <div>
                            <div>{track.name}</div>
                            <div>{track.artist}</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
