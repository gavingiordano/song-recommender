import React from 'react';

export default function SelectedSong({selectedSong, onSongDeselect}) {
    return (
        <div>
            {selectedSong && (
                <div>
                    <span>{selectedSong.name} - {selectedSong.artist}</span>
                    <button onClick={onSongDeselect}>X</button>
                </div>
            )}  
        </div>
    );
}
