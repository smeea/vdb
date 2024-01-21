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
  ResultLegalIcon,
} from '@/components';
import { useApp } from '@/context';
import { PLAYTEST } from '@/utils/constants';

const DeckLibraryHeader = ({
  libraryTotal,
  inMissing,
  bloodTotal,
  poolTotal,
  hasBanned,
  hasLimited,
  hasPlaytest,
  hasIllegalDate,
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
        <div className="flex gap-1.5 p-2 font-bold">
          <div className="inline">
            Library [{libraryTotal}
            {!inMissing &&
              (libraryTotal < 60 || libraryTotal > 90) &&
              ' of 60-90'}
            ]
          </div>
          {!inMissing && (
            <>
              {hasBanned && (
                <Warning
                  value="BANNED"
                  icon={<ResultLegalIcon value={'BANNED'} className="flex" />}
                />
              )}
              {limitedMode && hasLimited && <Warning value="LIMITED" />}
              {hasPlaytest && (
                <Warning
                  value="PLAYTEST"
                  icon={<ResultLegalIcon value={PLAYTEST} className="flex" />}
                />
              )}
              {hasIllegalDate && (
                <Warning
                  value="LEGAL DATE"
                  icon={
                    <ResultLegalIcon value={hasIllegalDate} className="flex" />
                  }
                />
              )}
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
        <div className="flex items-center gap-1 min-h-[44px]">
          <Button
            className="min-h-[44px]"
            title="Additional Info"
            variant="primary"
            onClick={() => setShowInfo(!showInfo)}
          >
            <InfoCircle />
          </Button>
          {isEditable && !isMobile && (
            <Button
              className="min-h-[44px]"
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
