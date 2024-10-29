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
import { LIBRARY, LIMITED, BANNED, LEGAL, PLAYTEST } from '@/utils/constants';

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
        <div className="flex basis-full justify-between">
          <div className="flex basis-full items-center justify-between gap-2 px-2 font-bold">
            <div className="flex">
              Library [{libraryTotal}
              {!inMissing && (libraryTotal < 60 || libraryTotal > 90) && ' of 60-90'}]
            </div>
            <div className="flex gap-2">
              {!inMissing && (
                <>
                  {hasBanned && <Warning type={BANNED} />}
                  {limitedMode && hasLimited && <Warning type={LIMITED} />}
                  {hasPlaytest && <Warning type={PLAYTEST} />}
                  {hasIllegalDate && <Warning value={hasIllegalDate} type={LEGAL} />}
                </>
              )}
            </div>
            {!inMissing && (
              <div className="flex gap-3">
                <div className="flex items-center gap-1" title="Total Blood Cost">
                  <ResultLibraryCost valueBlood="X" className="h-[30px] pb-1" />
                  <b>{bloodTotal}</b>
                </div>
                <div className="flex items-center gap-1" title="Total Pool Cost">
                  <ResultLibraryCost valuePool="X" className="h-[30px]" />
                  <b>{poolTotal}</b>
                </div>
              </div>
            )}
          </div>
          <div className="flex min-h-10 items-center gap-1">
            <Button
              className="min-h-10"
              title="Additional Info"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoCircle />
            </Button>
            {isEditable && !isMobile && (
              <Button className="min-h-10" title="Add Card" onClick={() => setShowAdd(!showAdd)}>
                <PlusLg width="15" height="15" viewBox="0 0 16 16" />
              </Button>
            )}
          </div>
        </div>
      </Header>
      {showInfo && (
        <DeckLibraryTotalInfo byDisciplines={byDisciplines} byTypes={byTypes} byClans={byClans} />
      )}
      {showAdd && (
        <DeckNewCard
          handleClose={() => setShowAdd(false)}
          cards={cards}
          deckid={deckid}
          target={LIBRARY}
          cardChange={cardChange}
        />
      )}
    </>
  );
};

export default DeckLibraryHeader;
