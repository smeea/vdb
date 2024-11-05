import React from 'react';
import { useSnapshot } from 'valtio';
import SearchHeartFill from '@/assets/images/icons/search-heart-fill.svg?react';
import {
  ButtonCardCopyUrl,
  ButtonIconed,
  ButtonClose,
  ButtonPlayableBy,
  ButtonSearchCardInDecks,
  ButtonToggleShowImage,
  ResultCryptLayoutText,
  ResultLayoutTextCommon,
  ResultLibraryLayoutText,
  PlaytestReportsOneButton,
} from '@/components';
import { searchResults, setCryptCompare, setLibraryCompare, useApp } from '@/context';
import { TWD, PDA } from '@/constants';

const ResultLayoutText = ({
  card,
  setCard,
  handleClose,
  forceInventoryMode,
  noClose,
  setIsHotkeysDisabled,
}) => {
  const { isPlaytestAdmin, isMobile, isNarrow } = useApp();
  const { cryptCompare, libraryCompare } = useSnapshot(searchResults);
  const compare = card.Id > 200000 ? cryptCompare : libraryCompare;
  const setCompare = card.Id > 200000 ? setCryptCompare : setLibraryCompare;
  const inCompare = compare ? compare.map((i) => i.Id).includes(card.Id) : false;
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);

  const handleCompare = () => {
    if (!compare) {
      setCompare([card]);
    } else if (!inCompare) {
      setCompare([...compare, card]);
    } else {
      const result = compare.filter((c) => c.Id !== card.Id);
      setCompare(result.length > 0 ? result : undefined);
    }

    !noClose && handleClose();
  };

  return (
    <div className="grid h-full w-full content-between gap-3">
      <div className="flex flex-col gap-3">
        {card.Id > 200000 ? (
          <ResultCryptLayoutText
            card={card}
            setCard={setCard}
            handleClose={handleClose}
            noClose={noClose}
          />
        ) : (
          <ResultLibraryLayoutText card={card} handleClose={handleClose} noClose={noClose} />
        )}
        <ResultLayoutTextCommon
          handleClose={handleClose}
          card={card}
          forceInventoryMode={forceInventoryMode}
          setIsHotkeysDisabled={setIsHotkeysDisabled}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <ButtonCardCopyUrl cardid={card.Id} />
          <ButtonSearchCardInDecks
            cardid={card.Id}
            target={TWD}
            handleClose={noClose ? null : handleClose}
          />
          <ButtonSearchCardInDecks
            cardid={card.Id}
            target={PDA}
            handleClose={noClose ? null : handleClose}
          />
          {card.Id < 200000 && card?.Type !== 'Master' && (
            <ButtonPlayableBy card={card} handleClose={noClose ? null : handleClose} />
          )}
          {!isMobile && <ButtonToggleShowImage />}
          <ButtonIconed
            variant={inCompare ? 'third' : 'primary'}
            onClick={handleCompare}
            title={`Add Card to Compare: it will be displayed above search results in ${
              card.Id > 200000 ? 'Crypt' : 'Library'
            }`}
            icon={<SearchHeartFill width="16" height="24" viewBox="0 0 16 16" />}
          />
          {isPlaytestAdmin && isPlaytest && <PlaytestReportsOneButton value={card} />}
        </div>
        {!isNarrow && !noClose && (
          <ButtonClose handleClick={() => !noClose && handleClose()} title="Close" text="Close" />
        )}
      </div>
    </div>
  );
};

export default ResultLayoutText;
