import React from 'react';
import { Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import SearchHeartFill from 'assets/images/icons/search-heart-fill.svg';
import {
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
  ButtonCardCopyUrl,
  ButtonToggleShowImage,
  ButtonSearchCardInDecks,
  ButtonIconed,
} from 'components';
import { useApp, useSearchResults } from 'context';

const ResultLayoutText = ({
  card,
  setCard,
  handleClose,
  setImageSet,
  forceInventoryMode,
}) => {
  const { isMobile } = useApp();
  const { cryptCompare, setCryptCompare, libraryCompare, setLibraryCompare } =
    useSearchResults();

  let compare;
  let setCompare;
  if (card.Id > 200000) {
    compare = cryptCompare;
    setCompare = setCryptCompare;
  } else {
    compare = libraryCompare;
    setCompare = setLibraryCompare;
  }
  const cardInCompare = compare && compare.includes(card);

  const handleCompare = () => {
    setCompare(() => {
      if (!compare) {
        return [card];
      } else if (!compare.includes(card)) {
        return [...compare, card];
      } else {
        return compare.filter((c) => c !== card);
      }
    });

    handleClose();
  };

  return (
    <>
      {card.Id > 200000 ? (
        <ResultCryptLayoutText
          card={card}
          setCard={setCard}
          handleClose={handleClose}
          setImageSet={setImageSet}
          forceInventoryMode={forceInventoryMode}
        />
      ) : (
        <ResultLibraryLayoutText
          card={card}
          handleClose={handleClose}
          setImageSet={setImageSet}
          forceInventoryMode={forceInventoryMode}
        />
      )}
      <div className="d-flex justify-content-between pt-3">
        <Stack direction="horizontal" gap={1}>
          <ButtonCardCopyUrl cardid={card.Id} />
          <ButtonSearchCardInDecks cardid={card.Id} target="twd" />
          <ButtonSearchCardInDecks cardid={card.Id} target="pda" />
          {!isMobile && <ButtonToggleShowImage />}
          <ButtonIconed
            variant={cardInCompare ? 'third' : 'primary'}
            onClick={() => handleCompare()}
            title="Compare Card"
            icon={
              <SearchHeartFill width="16" height="24" viewBox="0 0 16 16" />
            }
          />
        </Stack>
        {!isMobile && (
          <ButtonIconed
            variant="primary"
            onClick={handleClose}
            title="Close"
            icon={<X width="24" height="24" viewBox="0 0 16 16" />}
            text="Close"
          />
        )}
      </div>
    </>
  );
};

export default ResultLayoutText;
