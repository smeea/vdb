import { twMerge } from "tailwind-merge";
import {
  CardPopover,
  ConditionalTooltip,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultName,
  TwdCardsHistoryCardAppearance,
} from "@/components";
import { CLAN, DECKID, DISCIPLINES, GROUP, PLAYER, TITLE } from "@/constants";
import { useApp } from "@/context";

const TwdCardsHistoryCryptRow = ({ card, players, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <>
      <div
        className="flex min-w-[32px] items-center justify-center sm:min-w-[40px]"
        onClick={handleClick}
      >
        <ResultCryptCapacity card={card} />
      </div>
      <div
        className="flex min-w-[170px] items-center max-sm:hidden lg:min-w-[180px]"
        onClick={handleClick}
      >
        <ResultCryptDisciplines value={card[DISCIPLINES]} />
      </div>
      <div
        className={twMerge(
          "flex w-full cursor-pointer items-center justify-start",
          !card[DECKID] && "font-bold",
        )}
        onClick={handleClick}
      >
        <ConditionalTooltip
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
          noPadding
          noClick
        >
          <ResultName card={card} />
        </ConditionalTooltip>
      </div>
      <div className="min-w-[60px] max-sm:hidden" onClick={handleClick}>
        <div className="flex justify-center">
          <ResultClanImage value={card[CLAN]} />
        </div>
        <div className="flex justify-center gap-1 text-sm">
          <div className="flex w-full justify-end font-bold">
            {card[TITLE] && <ResultCryptTitle value={card[TITLE]} />}
          </div>
          <div className="w-full">
            <ResultCryptGroup value={card[GROUP]} />
          </div>
        </div>
      </div>
      <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card[PLAYER]]} />
    </>
  );
};

export default TwdCardsHistoryCryptRow;
