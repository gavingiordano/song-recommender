import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import SelectedSong from './SelectedSong';

export default function Search({ onGenerateClicked }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        if (query.length > 0) {
            fetchSearchResults(query);
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const fetchSearchResults = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/tracks?search=${searchQuery}`);
            const data = await response.json();
            setTimeout(() => {
                setSearchResults(data)
                setLoading(false)
            }, 500);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSongSelect = (song) => {
        setSelectedSong(song);
    }

    const handleSongDeselect = () => {
        setSelectedSong(null);
    }

    const handleGenerateClicked = () => {
        if (selectedSong) {
            onGenerateClicked(selectedSong);
        }
    }

    return (
        <div className='search-div'>
            <SearchInput onInputChange={handleInputChange} query={query} />
            {loading && (<p>Loading...</p>)}
            {(query && !loading) && (
                <SearchResults onSongSelect={handleSongSelect} searchResults={searchResults} />
            )}
            {(query && searchResults.length === 0 && !loading) && (
                <p>No results found for "{query}"</p>
            )}
            <div>
                <button className='generate-button' disabled={!selectedSong} onClick={handleGenerateClicked}><strong>GENERATE</strong></button>
            </div>
            <SelectedSong onSongDeselect={handleSongDeselect} selectedSong={selectedSong} />
        </div>
    );
}
