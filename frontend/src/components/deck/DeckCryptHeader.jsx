import React, { useState } from 'react';
import InfoCircle from '@/assets/images/icons/info-circle.svg?react';
import PlusLg from '@/assets/images/icons/plus-lg.svg?react';
import {
  DeckCryptTotalInfo,
  DeckNewCard,
  Warning,
  Button,
  SortButton,
  Header,
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
  const { limitedMode, isMobile } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const { disciplinesDetailed } = useKeyDisciplines(cards);
  const { hasBanned, hasLimited, cryptTotal, hasWrongGroups, cryptGroups } =
    useDeckCrypt(cards, null, null);

  return (
    <>
      <Header>
        <div className="flex gap-1.5 p-2 font-bold">
          <div className="inline">
            Crypt [{cryptTotal}
            {!inMissing && cryptTotal < 12 && ' of 12+'}]
          </div>
          {!inMissing && (
            <>
              {hasWrongGroups ? (
                <Warning value="GROUPS" />
              ) : (
                <div className="inline">{cryptGroups}</div>
              )}
              {hasBanned && <Warning value="BANNED" />}
              {limitedMode && hasLimited && <Warning value="LIMITED" />}
            </>
          )}
        </div>
        <div className="flex space-x-1 min-h-[38px]">
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
              <PlusLg width="15" height="15" viewBox="0 0 16 16" />
            </Button>
          )}
        </div>
      </Header>
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
