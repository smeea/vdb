import React from 'react';
import { useNavigate } from 'react-router';
import { searchLibraryForm, searchCryptForm, clearSearchForm } from '@/context';
import { ARTIST, CRYPT, LIBRARY } from '@/constants';

const ResultLayoutTextArtist = ({ handleClose, inCrypt, artists }) => {
  const navigate = useNavigate();

  const handleClick = (value) => {
    clearSearchForm(inCrypt ? CRYPT : LIBRARY);
    inCrypt ? (searchCryptForm[ARTIST] = value) : (searchLibraryForm[ARTIST] = value);
    navigate(
      `/${inCrypt ? CRYPT : LIBRARY}?q=${encodeURIComponent(JSON.stringify({ artist: value }))}`,
    );
    handleClose();
  };

  return (
    <>
      {artists.map((artist) => {
        return (
          <div
            className="inline-block whitespace-nowrap text-fgSecondary hover:underline dark:text-fgSecondaryDark"
            key={artist}
            onClick={() => handleClick(artist)}
          >
            {artist}
          </div>
        );
      })}
    </>
  );
};

export default ResultLayoutTextArtist;
