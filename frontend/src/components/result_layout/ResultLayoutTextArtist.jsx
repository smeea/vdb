import React from 'react';

const ResultLayoutTextArtist = (props) => {
  return (
    <>
      {props.artists.length > 1
        ? props.artists.map((artist, index) => {
            return (
              <div className="inline-block whitespace-nowrap " key={index}>
                {artist}
              </div>
            );
          })
        : props.artists}
    </>
  );
};

export default ResultLayoutTextArtist;
