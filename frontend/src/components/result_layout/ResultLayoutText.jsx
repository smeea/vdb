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
  PlaytestReportExportButton,
} from '@/components';
import {
  searchResults,
  setCryptCompare,
  setLibraryCompare,
  useApp,
} from '@/context';

const ResultLayoutText = ({
  card,
  setCard,
  handleClose,
  setImageSet,
  forceInventoryMode,
  noClose,
  setIsHotkeysDisabled,
}) => {
  const { isPlaytestAdmin, isMobile, isNarrow } = useApp();
  const cryptCompare = useSnapshot(searchResults).cryptCompare;
  const libraryCompare = useSnapshot(searchResults).libraryCompare;
  const compare = card.Id > 200000 ? cryptCompare : libraryCompare;
  const setCompare = card.Id > 200000 ? setCryptCompare : setLibraryCompare;
  const inCompare = compare
    ? compare.map((i) => i.Id).includes(card.Id)
    : false;

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
    <div className="w-full space-y-3">
      {card.Id > 200000 ? (
        <ResultCryptLayoutText
          card={card}
          setCard={setCard}
          handleClose={handleClose}
          noClose={noClose}
        />
      ) : (
        <ResultLibraryLayoutText
          card={card}
          handleClose={handleClose}
          noClose={noClose}
        />
      )}
      <ResultLayoutTextCommon
        handleClose={handleClose}
        card={card}
        setImageSet={setImageSet}
        forceInventoryMode={forceInventoryMode}
        setIsHotkeysDisabled={setIsHotkeysDisabled}
      />
      <div className="flex justify-between ">
        <div className="flex flex-row space-x-1">
          <ButtonCardCopyUrl cardid={card.Id} />
          <ButtonSearchCardInDecks
            cardid={card.Id}
            target="twd"
            handleClose={noClose ? null : handleClose}
          />
          <ButtonSearchCardInDecks
            cardid={card.Id}
            target="pda"
            handleClose={noClose ? null : handleClose}
          />
          {card.Id < 200000 && card?.Type !== 'Master' && (
            <ButtonPlayableBy
              card={card}
              handleClose={noClose ? null : handleClose}
            />
          )}
          {!isMobile && <ButtonToggleShowImage />}
          <ButtonIconed
            variant={inCompare ? 'third' : 'primary'}
            onClick={handleCompare}
            title={`Add Card to Compare: it will be displayed above search results in ${
              card.Id > 200000 ? 'Crypt' : 'Library'
            }`}
            icon={
              <SearchHeartFill width="16" height="24" viewBox="0 0 16 16" />
            }
          />
          {isPlaytestAdmin && <PlaytestReportExportButton card={card} />}
        </div>
        {!isNarrow && !noClose && (
          <ButtonClose
            handleClick={() => !noClose && handleClose()}
            title="Close"
            text="Close"
          />
        )}
      </div>
    </div>
  );
};

export default ResultLayoutText;
