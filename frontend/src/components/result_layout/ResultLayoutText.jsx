import React from 'react';
import { Stack } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
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
import {
  useApp,
  searchResults,
  setCryptCompare,
  setLibraryCompare,
} from 'context';

const ResultLayoutText = ({
  card,
  setCard,
  handleClose,
  setImageSet,
  forceInventoryMode,
  noClose,
}) => {
  const { isMobile, isNarrow } = useApp();
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
            variant={inCompare ? 'third' : 'primary'}
            onClick={handleCompare}
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
