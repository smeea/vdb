import React, { useState } from 'react';
import InfoCircle from '@/assets/images/icons/info-circle.svg?react';
import PlusLg from '@/assets/images/icons/plus-lg.svg?react';
import {
  Button,
  DeckNewCard,
  DeckLibraryTotalInfo,
  ResultLibraryCost,
  Warning,
  Header,
} from '@/components';
import { useApp } from '@/context';

const DeckLibraryHeader = ({
  libraryTotal,
  inMissing,
  bloodTotal,
  poolTotal,
  hasBanned,
  hasLimited,
  isEditable,
  cards,
  deckid,
  cardChange,
  showInfo,
  setShowInfo,
  byClans,
  byTypes,
  byDisciplines,
}) => {
  const { limitedMode, isMobile } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <Header>
        <div className="space-x-2 p-2 font-bold">
          <div className="inline">
            Library [{libraryTotal}
            {!inMissing &&
              (libraryTotal < 60 || libraryTotal > 90) &&
              ' of 60-90'}
            ]
          </div>
          {!inMissing && (
            <>
              {hasBanned && <Warning value="BANNED" />}
              {limitedMode && hasLimited && <Warning value="LIMITED" />}
            </>
          )}
        </div>
        {!inMissing && (
          <div className="flex space-x-3">
            <div
              className="flex items-center space-x-1"
              title="Total Blood Cost"
            >
              <ResultLibraryCost valueBlood="X" className="h-[30px] pb-1" />
              <b>{bloodTotal}</b>
            </div>
            <div
              className="flex items-center space-x-1"
              title="Total Pool Cost"
            >
              <ResultLibraryCost valuePool="X" className="h-[30px]" />
              <b>{poolTotal}</b>
            </div>
          </div>
        )}
        <div className="flex space-x-1 min-h-[38px]">
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
          <DeckLibraryTotalInfo
            byDisciplines={byDisciplines}
            byTypes={byTypes}
            byClans={byClans}
          />
        </div>
      )}
      {showAdd && (
        <DeckNewCard
          handleClose={() => setShowAdd(false)}
          cards={cards}
          deckid={deckid}
          target="library"
          cardChange={cardChange}
        />
      )}
    </>
  );
};

export default DeckLibraryHeader;
