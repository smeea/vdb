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
  ResultLegalIcon,
} from '@/components';
import { useApp } from '@/context';
import { useKeyDisciplines, useDeckCrypt } from '@/hooks';
import { BANNED, LEGAL, PLAYTEST } from '@/utils/constants';

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
  const {
    hasBanned,
    hasLimited,
    hasPlaytest,
    hasIllegalDate,
    cryptTotal,
    hasWrongGroups,
    cryptGroups,
  } = useDeckCrypt(cards, null, null);

  return (
    <>
      <Header>
        <div className="flex basis-full justify-between">
          <div className="flex basis-full items-center justify-between gap-2 px-2 font-bold">
            <div className="flex">
              Crypt [{cryptTotal}
              {!inMissing && cryptTotal < 12 && ' of 12+'}] {cryptGroups}
            </div>
            <div className="flex gap-2">
              {!inMissing && (
                <>
                  {hasWrongGroups && <Warning value="GROUPS" />}
                  {hasBanned && (
                    <Warning
                      value="BANNED"
                      icon={
                        <ResultLegalIcon
                          type={BANNED}
                          value={BANNED}
                          className="flex"
                        />
                      }
                    />
                  )}
                  {limitedMode && hasLimited && <Warning value="LIMITED" />}
                  {hasPlaytest && (
                    <Warning
                      value="PLAYTEST"
                      icon={
                        <ResultLegalIcon type={PLAYTEST} className="flex" />
                      }
                    />
                  )}
                  {hasIllegalDate && (
                    <Warning
                      value="LEGAL DATE"
                      icon={
                        <ResultLegalIcon
                          type={LEGAL}
                          value={hasIllegalDate}
                          className="flex"
                        />
                      }
                    />
                  )}
                </>
              )}
            </div>
            <div />
          </div>
          <div className="flex items-center gap-1 min-h-[44px]">
            {!inMissing && (
              <SortButton
                className="min-h-[44px]"
                sortMethods={sortMethods}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
              />
            )}
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
