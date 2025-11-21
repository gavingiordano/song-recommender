import React from 'react';

export default function SelectedSong({selectedSong, onSongDeselect}) {
    return (
        <div>
            {selectedSong && (
                <div>
                    <span>{selectedSong.name} - {selectedSong.artist}</span>
                    <button className='x-button' onClick={onSongDeselect}><strong>X</strong></button>
                </div>
            )}  
        </div>
    );
}
