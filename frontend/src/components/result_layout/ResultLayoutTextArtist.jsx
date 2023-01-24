import React from 'react';
import { useApp, searchCryptForm, clearSearchForm } from 'context';

const ResultLayoutTextArtist = ({ artists }) => {
  const handleClick = (target, value) => {
    clearSearchForm('crypt');
    searchCryptForm.artist = value;
    navigate(
      `/crypt?q=${encodeURIComponent(JSON.stringify({ author: value }))}`
    );
  };

  return (
    <>
      {artists.map((artist, idx) => {
        return (
          <div
            className="inline-block whitespace-nowrap"
            key={idx}
            onClick={() => handleClick('author', deck['location'])}
          >
            {artist}
          </div>
        );
      })}
    </>
  );
};

export default ResultLayoutTextArtist;
