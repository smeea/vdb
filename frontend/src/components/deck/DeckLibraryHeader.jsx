import React, { useState } from 'react';
import InfoCircle from '@icons/info-circle.svg?react';
import PlusLg from '@icons/plus-lg.svg?react';
import {
  Button,
  DeckNewCard,
  DeckLibraryTotalInfo,
  ResultLibraryCost,
  Warning,
  Header,
} from '@/components';
import { useApp } from '@/context';
import { getIsEditable } from '@/utils';
import { useDeckLibrary } from '@/hooks';
import { DECKID, POOL, BLOOD, X, LIBRARY, LIMITED, BANNED, PLAYTEST } from '@/constants';

const DeckLibraryHeader = ({
  inMissing,
  cardChange,
  showInfo,
  setShowInfo,
  deck,
  libraryTotalDiff,
  poolTotalDiff,
  bloodTotalDiff,
  forceIsEditable,
}) => {
  const { limitedMode, isMobile } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const {
    library,
    hasBanned,
    hasLimited,
    hasPlaytest,
    libraryTotal,
    poolTotal,
    bloodTotal,
    libraryByClansTotal,
    libraryByTypeTotal,
    libraryByDisciplinesTotal,
  } = useDeckLibrary(deck[LIBRARY]);
  const isEditable = forceIsEditable || getIsEditable(deck);

  const rescaledBloodTotal = Math.round((bloodTotal / libraryTotal) * 90);
  const rescaledPoolTotal = Math.round((poolTotal / libraryTotal) * 90);

  return (
    <>
      <Header>
        <div className="flex basis-full justify-between">
          <div className="flex basis-full items-center justify-between gap-2 px-2 font-bold">
            <div className="flex">
              Library [{libraryTotalDiff ?? libraryTotal}
              {!inMissing && (libraryTotal < 60 || libraryTotal > 90) && ' of 60-90'}]
            </div>
            <div className="flex gap-2">
              {!inMissing && (
                <>
                  {hasBanned && <Warning type={BANNED} />}
                  {limitedMode && hasLimited && <Warning type={LIMITED} />}
                  {hasPlaytest && <Warning type={PLAYTEST} />}
                </>
              )}
            </div>
            {!inMissing && (
              <div className="flex gap-3">
                <div className="flex items-center gap-1" title="Total Blood Cost">
                  <ResultLibraryCost card={{ [BLOOD]: X }} className="h-[30px] pb-1" />
                  <b>{bloodTotalDiff ?? bloodTotal}</b>
                  {showInfo && !bloodTotalDiff && libraryTotal < 90 && (
                    <div
                      className="text-midGray dark:text-midGrayDark flex items-end"
                      title="Rescaled for 90 cards library"
                    >
                      ({rescaledBloodTotal}
                      <div className="text-2xs font-normal">90</div>)
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1" title="Total Pool Cost">
                  <ResultLibraryCost card={{ [POOL]: X }} className="h-[30px]" />
                  <b>{poolTotalDiff ?? poolTotal}</b>
                  {showInfo && !poolTotalDiff && libraryTotal < 90 && (
                    <div
                      className="text-midGray dark:text-midGrayDark flex items-end"
                      title="Rescaled for 90 cards library"
                    >
                      ({rescaledPoolTotal}
                      <div className="text-2xs font-normal">90</div>)
                    </div>
                  )}
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
        <DeckLibraryTotalInfo
          byTypes={libraryByTypeTotal}
          byClans={libraryByClansTotal}
          byDisciplines={libraryByDisciplinesTotal}
        />
      )}
      {showAdd && (
        <DeckNewCard
          handleClose={() => setShowAdd(false)}
          cards={library}
          deckid={deck[DECKID]}
          target={LIBRARY}
          cardChange={cardChange}
        />
      )}
    </>
  );
};

export default DeckLibraryHeader;
