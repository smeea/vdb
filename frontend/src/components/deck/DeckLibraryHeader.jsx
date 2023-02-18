import React, { useState } from 'react';
import InfoCircle from '@/assets/images/icons/info-circle.svg';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg';
import {
  Button,
  DeckNewCard,
  DeckLibraryTotalInfo,
  ResultLibraryCost,
} from '@/components';
import { useApp } from '@/context';

const DeckLibraryHeader = ({
  libraryTotal,
  inMissing,
  bloodTotal,
  poolTotal,
  hasBanned,
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
  const { isMobile } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
        <div className="space-x-2 p-2 font-bold">
          <div className="inline">
            Library [{libraryTotal}
            {!inMissing &&
              (libraryTotal < 60 || libraryTotal > 90) &&
              ' of 60-90'}
            ]
          </div>
          {!inMissing && hasBanned && (
            <div className="inline items-center text-fgRed dark:text-fgRedDark">
              <Exclamation
                width="17"
                heigth="17"
                viewBox="0 2 16 16"
                className="inline pr-1"
              />
              BANNED
            </div>
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
        <div className="flex space-x-1">
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
          <DeckLibraryTotalInfo
            byDisciplines={byDisciplines}
            byTypes={byTypes}
            byClans={byClans}
          />
        </div>
      )}
      {showAdd && (
        <DeckNewCard
          setShowAdd={setShowAdd}
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
