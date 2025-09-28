import {
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptSect,
  ResultCryptTitle,
  ResultPathImage,
} from "@/components";
import { CLAN, GROUP, PATH, SECT, TITLE } from "@/constants";

const ResultCryptClanGroupTitle = ({ card }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-1">
        {card[PATH] && <ResultPathImage size="xs" value={card[PATH]} />}
        <ResultClanImage value={card[CLAN]} />
      </div>
      <div className="flex justify-between gap-1 font-bold text-sm">
        <div className="flex w-[22px] justify-center">
          {card[TITLE] ? (
            <ResultCryptTitle value={card[TITLE]} />
          ) : (
            <ResultCryptSect value={card[SECT]} />
          )}
        </div>
        <div className="flex justify-center pe-0.5">
          <ResultCryptGroup value={card[GROUP]} />
        </div>
      </div>
    </>
  );
};

export default ResultCryptClanGroupTitle;
