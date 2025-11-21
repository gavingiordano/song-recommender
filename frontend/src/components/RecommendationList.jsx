import React, { useEffect, useState } from 'react';

export default function RecommendationList({ selectedSong }) {
    const [recs, setRecs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedSong) {
            fetchRecommendations();
        } else {
            setRecs([]);
            setLoading(false);
        }
    }, [selectedSong]);

    const fetchRecommendations = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/tracks/recommendations?track=${selectedSong.name}&artist=${selectedSong.artist}`);
            const data = await response.json();
            setTimeout(() => {
                setRecs(data);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div className='recommendations-div'>
            <h2>Songs similar to:</h2>
            <h2>⭐️ {selectedSong.name} - {selectedSong.artist} ⭐️</h2>
            {loading && (
                <p>Loading recommendations...</p>
            )}
            {recs.length > 0 ? (
                <ul className='recs-list'>
                    {recs.map((rec, index) => (
                        <li key={index}>
                            {rec.name} - {rec.artist}
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && (
                    <p>No recommendations found</p>
                )
            )}
        </div>
    );
}
