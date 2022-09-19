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
  noClose,
}) => {
  const { isMobile, isNarrow } = useApp();
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

    !noClose && handleClose();
  };

  return (
    <>
      {card.Id > 200000 ? (
        <ResultCryptLayoutText
          card={card}
          setCard={setCard}
          setImageSet={setImageSet}
          forceInventoryMode={forceInventoryMode}
        />
      ) : (
        <ResultLibraryLayoutText
          card={card}
          setImageSet={setImageSet}
          forceInventoryMode={forceInventoryMode}
        />
      )}
      <div className="d-flex justify-content-between pt-3">
        <Stack direction="horizontal" gap={1}>
          <ButtonCardCopyUrl cardid={card.Id} />
          <ButtonSearchCardInDecks cardid={card.Id} target="twd" />
          <ButtonSearchCardInDecks cardid={card.Id} target="pda" />
          {!isMobile && !noClose && <ButtonToggleShowImage />}
          <ButtonIconed
            variant={cardInCompare ? 'third' : 'primary'}
            onClick={() => handleCompare()}
            title={`Add Card to Compare: it will be displayed above search results in ${
              card.Id > 200000 ? 'Crypt' : 'Library'
            }`}
            icon={
              <SearchHeartFill width="16" height="24" viewBox="0 0 16 16" />
            }
          />
        </Stack>
        {!isNarrow && !noClose && (
          <ButtonIconed
            variant="primary"
            onClick={() => !noClose && handleClose()}
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
