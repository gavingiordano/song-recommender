import React, { useState } from 'react';
import Search from './components/Search';
import RecommendationList from './components/RecommendationList';

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  const handleGenerateRecs = (song) => {
    setSelectedSong(song);
    setGenerateButtonClicked(true);
  };

  return (
    <>
      <h1>SIMILAR SONG FINDER</h1>
      <Search onGenerateClicked={handleGenerateRecs} />
      {generateButtonClicked && (
        <RecommendationList selectedSong={selectedSong} />
      )}
    </>
  );
}

export default App
