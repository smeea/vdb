import { twMerge } from "tailwind-merge";
import {
  CardPopover,
  ConditionalTooltip,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultMiscImage,
  ResultName,
  TwdCardsHistoryCardAppearance,
} from "@/components";
import { BLOOD, BURN, CLAN, DECKID, DISCIPLINE, PLAYER, TYPE } from "@/constants";
import { useApp } from "@/context";

const TwdCardsHistoryLibraryRow = ({ card, players, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <>
      <div
        className={twMerge(
          "flex min-w-[30px] items-center justify-center max-sm:hidden",
          card[BLOOD] && "pb-1",
        )}
        onClick={handleClick}
      >
        <ResultLibraryCost card={card} />
      </div>
      <div
        className="flex min-w-[40px] items-center justify-center max-sm:hidden"
        onClick={handleClick}
      >
        <ResultLibraryTypeImage value={card[TYPE]} />
      </div>
      <div
        className="flex min-w-[32px] items-center justify-center gap-1.5 sm:min-w-[80px]"
        onClick={handleClick}
      >
        <ResultLibraryClan value={card[CLAN]} />
        <ResultLibraryDisciplines value={card[DISCIPLINE]} />
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
      <div
        className="flex min-w-[30px] items-center justify-center max-sm:hidden"
        onClick={handleClick}
      >
        {card[BURN] && <ResultMiscImage value={BURN} />}
      </div>
      <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card[PLAYER]]} />
    </>
  );
};

export default TwdCardsHistoryLibraryRow;
