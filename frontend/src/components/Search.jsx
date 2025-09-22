import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import ChosenSong from './ChosenSong';

export default function Search() {
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
            const response = await fetch(`http://localhost:3000/search?search=${searchQuery}`);
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

    return (
        <div>
            <SearchInput query={query} onInputChange={handleInputChange} />
            {loading && (<p>Loading...</p>)}
            {(query && !loading) && (
                <SearchResults searchResults={searchResults} onSongSelect={handleSongSelect} />
            )}
            {(query && searchResults.length === 0 && !loading) && (
                <p>No results found for "{query}"</p>
            )}
            <ChosenSong chosenSong={selectedSong} handleSongDeselect={handleSongDeselect} />
        </div>
    );
}
