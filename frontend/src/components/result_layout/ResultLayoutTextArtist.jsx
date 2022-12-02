import React from 'react';

const ResultLayoutTextArtist = (props) => {
  return (
    <>
      {props.artists.length > 1
        ? props.artists.map((artist, index) => {
            return (
              <div className="d-inline-block whitespace-nowrap px-1" key={index}>
                {artist}
              </div>
            );
          })
        : props.artists}
    </>
  );
};

export default ResultLayoutTextArtist;
