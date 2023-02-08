import React from 'react';
import { DeckCrypt, DeckLibrary } from '@/components';

const DeckPreview = ({ deck, setShow }) => {
  const d = { ...deck, isAuthor: false };

  return (
    <div className="flex gap-3">
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) setShow(false);
        }}
        className="h-[80vh] overflow-y-auto basis-5/9"
      >
        <DeckCrypt deck={d} inPreview />
      </div>
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) setShow(false);
        }}
        className="h-[80vh] overflow-y-auto basis-4/9"
      >
        <DeckLibrary deck={d} inPreview />
      </div>
    </div>
  );
};

export default DeckPreview;
