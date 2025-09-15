import { ResultPathImage, ResultClanImage, ResultCryptGroup, ResultCryptSect, ResultCryptTitle } from "@/components";
import { CLAN, PATH, GROUP, SECT, TITLE } from "@/constants";

const ResultCryptClanGroupTitle = ({ card }) => {
  return (
    <>
      <div className="flex items-center gap-1 justify-center">
        {card[PATH] && <ResultPathImage size="xs" value={card[PATH]} />}
        <ResultClanImage value={card[CLAN]} />
      </div>
      <div className="flex justify-between gap-1 font-bold text-sm">
        <div className="flex w-[16px] gap-0.5 justify-center">
          {card[TITLE]
           ? <ResultCryptTitle value={card[TITLE]} />
           : <ResultCryptSect value={card[SECT]} />
          }
        </div>
        <ResultCryptGroup value={card[GROUP]} />
      </div>
    </>
  );
};

export default ResultCryptClanGroupTitle;
