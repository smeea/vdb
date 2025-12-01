import { differenceInYears } from "date-fns";
import {
  ResultCryptTableRowCommon,
  ResultLibraryTableRowCommon,
  Tr,
  TwdOpenDeckButton,
} from "@/components";
import { DECKID, ID, RELEASE_DATE, TWD_DATE } from "@/constants";
import { useApp } from "@/context";

const TwdHallFameCardsCard = ({ card, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <Tr>
      {card[ID] > 200000 ? (
        <ResultCryptTableRowCommon card={card} handleClick={handleClick} noDisciplines={isMobile} />
      ) : (
        <ResultLibraryTableRowCommon card={card} handleClick={handleClick} noBurn={isMobile} />
      )}
      <td className="min-w-[60px] text-center max-sm:hidden" onClick={() => handleClick(card)}>
        {card[RELEASE_DATE].slice(0, 4)}
      </td>
      <td className="min-w-[60px] text-center" onClick={() => handleClick(card)}>
        {card[TWD_DATE].slice(0, 4)}
      </td>
      <td className="min-w-[25px] text-center sm:min-w-[60px]">
        {differenceInYears(card[TWD_DATE], card[RELEASE_DATE])}
      </td>
      <td className="min-w-[45px] sm:min-w-[110px]">
        {card[DECKID] && (
          <div>
            <TwdOpenDeckButton deckid={card[DECKID]} noText={isMobile} />
          </div>
        )}
      </td>
    </Tr>
  );
};

export default TwdHallFameCardsCard;
