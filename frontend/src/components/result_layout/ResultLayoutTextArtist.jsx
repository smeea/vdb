import React from 'react';
import { useNavigate } from 'react-router-dom';
import { searchLibraryForm, searchCryptForm, clearSearchForm } from '@/context';
import { CRYPT, LIBRARY } from '@/utils/constants';

const ResultLayoutTextArtist = ({ handleClose, inCrypt, artists }) => {
  const navigate = useNavigate();

  const handleClick = (value) => {
    clearSearchForm(inCrypt ? CRYPT : LIBRARY);
    inCrypt ? (searchCryptForm.artist = value) : (searchLibraryForm.artist = value);
    navigate(
      `/${inCrypt ? CRYPT : LIBRARY}?q=${encodeURIComponent(JSON.stringify({ artist: value }))}`,
    );
    handleClose();
  };

  return (
    <>
      {artists.map((artist, idx) => {
        return (
          <div
            className="inline-block whitespace-nowrap text-fgSecondary hover:underline dark:text-fgSecondaryDark"
            key={idx}
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
