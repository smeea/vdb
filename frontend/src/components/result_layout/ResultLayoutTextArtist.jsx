import React from 'react';

const ResultLayoutTextArtist = ({ artists }) => {
  return (
    <>
      {artists.map((artist, idx) => {
        return (
          <div className="inline-block whitespace-nowrap" key={idx}>
            {artist}
          </div>
        );
      })}
    </>
  );
};

export default ResultLayoutTextArtist;
