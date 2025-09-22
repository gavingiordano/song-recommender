import React from 'react';

export default function ChosenSong({chosenSong, handleSongDeselect}) {
    return (
        <div>
            <h3>Find Similar Songs to:</h3>
            {chosenSong && (
                <div>
                    <span>{chosenSong.name} - {chosenSong.artist}</span>
                    <button onClick={handleSongDeselect}>X</button>
                </div>
            )}  
        </div>
    );
}
