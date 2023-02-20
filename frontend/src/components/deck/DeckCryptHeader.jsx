import React, { useState } from 'react';
import InfoCircle from '@/assets/images/icons/info-circle.svg';
import {
  DeckCryptTotalInfo,
  DeckNewCard,
  Banned,
  Button,
  SortButton,
} from '@/components';
import { useApp } from '@/context';
import { useKeyDisciplines, useDeckCrypt } from '@/hooks';

const DeckCryptHeader = ({
  deckid,
  showInfo,
  setShowInfo,
  inMissing,
  isEditable,
  sortMethods,
  sortMethod,
  setSortMethod,
  cardChange,
  cards,
}) => {
  const { isMobile } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const { disciplinesDetailed } = useKeyDisciplines(cards);
  const { hasBanned, cryptTotal, cryptGroups } = useDeckCrypt(
    cards,
    null,
    null
  );

  return (
    <>
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
        <div className="space-x-2 p-2 font-bold">
          <div className="inline">
            Crypt [{cryptTotal}
            {!inMissing && cryptTotal < 12 && ' of 12+'}]
          </div>
          {!inMissing && cryptGroups && (
            <div className="inline">{cryptGroups}</div>
          )}
          {!inMissing && hasBanned && <Banned />}
        </div>
        <div className="flex space-x-1">
          {!inMissing && (
            <SortButton
              sortMethods={sortMethods}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          )}
          <Button
            title="Additional Info"
            variant="primary"
            onClick={() => setShowInfo(!showInfo)}
          >
            <InfoCircle />
          </Button>
          {isEditable && !isMobile && (
            <Button
              title="Add Card"
              variant="primary"
              onClick={() => setShowAdd(!showAdd)}
            >
              +
            </Button>
          )}
        </div>
      </div>
      {showInfo && (
        <div className="bg-bgSecondary p-2 dark:bg-bgSecondaryDark">
          <DeckCryptTotalInfo
            disciplinesDetailed={disciplinesDetailed}
            cards={cards}
          />
        </div>
      )}
      {showAdd && (
        <DeckNewCard
          handleClose={() => setShowAdd(false)}
          cards={cards}
          deckid={deckid}
          target="crypt"
          cardChange={cardChange}
        />
      )}
    </>
  );
};

export default DeckCryptHeader;
