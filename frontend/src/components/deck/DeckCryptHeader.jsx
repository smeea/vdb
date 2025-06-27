import InfoCircle from "@icons/info-circle.svg?react";
import PlusLg from "@icons/plus-lg.svg?react";
import { useState } from "react";
import { Button, DeckCryptTotalInfo, DeckNewCard, Header, SortButton, Warning } from "@/components";
import { BANNED, CRYPT, DECKID, GROUPS, LIMITED, PLAYTEST } from "@/constants";
import { useApp } from "@/context";
import { useDeckCrypt } from "@/hooks";
import { getIsEditable, getKeyDisciplines } from "@/utils";

const DeckCryptHeader = ({
  cardChange,
  cards,
  deck,
  inMissing,
  forceIsEditable,
  setShowInfo,
  cryptTotalDiff,
  setSortMethod,
  showInfo,
  sortMethod,
  sortMethods,
}) => {
  const { limitedMode } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const { disciplinesDetailed } = getKeyDisciplines(cards);
  const isEditable = forceIsEditable || getIsEditable(deck);

  const { hasBanned, hasLimited, hasPlaytest, hasWrongGroups, cryptGroups, cryptTotal } =
    useDeckCrypt(deck[CRYPT], sortMethod);

  return (
    <>
      <Header>
        <div className="flex basis-full justify-between">
          <div className="flex basis-full items-center justify-between gap-2 px-2 font-bold">
            <div className="flex">
              Crypt [{cryptTotalDiff ?? cryptTotal}
              {!inMissing && cryptTotal < 12 && " of 12+"}] {cryptGroups && <>G{cryptGroups}</>}
            </div>
            <div className="flex gap-2">
              {!inMissing && (
                <>
                  {hasWrongGroups && <Warning type={GROUPS} />}
                  {hasBanned && <Warning type={BANNED} />}
                  {limitedMode && hasLimited && (
                    <div className="flex gap-1">
                      <Warning type={LIMITED} />
                      <div
                        className="flex font-normal text-fgRed dark:text-fgRedDark"
                        title="Restricted Cards"
                      >
                        [{Math.round((hasLimited / cryptTotal) * 100)}%]
                      </div>
                    </div>
                  )}
                  {hasPlaytest && <Warning type={PLAYTEST} />}
                </>
              )}
            </div>
            <div />
          </div>
          <div className="flex min-h-10 items-center gap-1">
            {!inMissing && (
              <SortButton
                className="min-h-10"
                sortMethods={sortMethods}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
              />
            )}
            <Button
              className="min-h-10"
              title="Additional Info"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoCircle />
            </Button>
            {isEditable && (
              <Button
                className="min-h-10 max-sm:hidden"
                title="Add Card"
                onClick={() => setShowAdd(!showAdd)}
              >
                <PlusLg width="15" height="15" viewBox="0 0 16 16" />
              </Button>
            )}
          </div>
        </div>
      </Header>
      {showInfo && <DeckCryptTotalInfo disciplinesDetailed={disciplinesDetailed} cards={cards} />}
      {showAdd && (
        <DeckNewCard
          handleClose={() => setShowAdd(false)}
          cards={cards}
          deckid={deck[DECKID]}
          target={CRYPT}
          cardChange={cardChange}
        />
      )}
    </>
  );
};

export default DeckCryptHeader;
