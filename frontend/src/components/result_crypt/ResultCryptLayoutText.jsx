import { twMerge } from "tailwind-merge";
import {
  ButtonCloseModal,
  CardPopover,
  ConditionalTooltip,
  Hr,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultCryptSect,
  ResultCryptTitle,
  ResultLayoutTextText,
  ResultName,
  ResultNameAka,
  ResultPathImage,
} from "@/components";
import {
  ADV,
  AKA,
  BANNED,
  CLAN,
  DISCIPLINES,
  GROUP,
  ID,
  PATH,
  PLAYTEST,
  SECT,
  TITLE,
} from "@/constants";
import { useApp } from "@/context";
import { getLegality } from "@/utils";

const ResultCryptLayoutText = ({ card, setCard, handleClose, noClose, inPopover }) => {
  const { isNarrow, isMobile, cryptCardBase } = useApp();
  const legalRestriction = getLegality(card);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={twMerge(
          "flex justify-between gap-3 whitespace-nowrap",
          card[AKA] ? "items-start" : "items-center",
        )}
      >
        <div className="flex items-center justify-between">
          <div
            className={twMerge(
              (isMobile || inPopover) && "flex-col",
              "flex justify-between gap-1 whitespace-nowrap sm:gap-3",
            )}
          >
            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <ResultClanImage value={card[CLAN]} />
                <div className="flex gap-2 font-bold">
                  <ResultName card={card} />
                  {card[ADV][1] && (
                    <ConditionalTooltip
                      overlay={<CardPopover card={cryptCardBase[card[ADV][1]]} />}
                      disabled={isMobile}
                      noPadding
                    >
                      <div
                        className="inline text-fgSecondary dark:text-fgSecondaryDark"
                        onClick={() => setCard(cryptCardBase[card[ADV][1]])}
                      >
                        {inPopover ? (
                          !card[ADV][0] && (
                            <div className="inline-flex items-center">
                              [has
                              <img
                                aria-label="Advanced"
                                className="ml-1 inline-flex items-center"
                                src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
                                title="Advanced"
                                width="12"
                              />
                              ]
                            </div>
                          )
                        ) : (
                          <div className="cursor-pointer">
                            [see {card[ADV][0] ? "Base" : "Adv"}]
                          </div>
                        )}
                      </div>
                    </ConditionalTooltip>
                  )}
                </div>
              </div>
            </div>
            {card[AKA] && <ResultNameAka card={card} />}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ResultCryptGroup value={card[GROUP]} />
          <div
            className={
              noClose || inPopover || isNarrow
                ? "hidden max-h-0 max-w-0 opacity-0"
                : "flex justify-center"
            }
          >
            <ButtonCloseModal handleClick={handleClose} />
          </div>
        </div>
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card[ID]} />
      </div>
      <Hr />
      <div className="flex justify-between gap-2">
        <div className="flex items-center gap-2">
          <ResultCryptCapacity card={card} />
          <ResultCryptDisciplines value={card[DISCIPLINES]} />
        </div>
        <div className="flex items-center gap-2">
          <ResultCryptTitle value={card[TITLE]} />
          {card[PATH] ? (
            <ResultPathImage value={card[PATH]} />
          ) : (
            <ResultCryptSect value={card[SECT]} />
          )}
        </div>
      </div>
      <Hr />
      {card[BANNED] && (
        <div className="text-fgRed dark:text-fgRedDark" title={`Banned in ${card[BANNED]}`}>
          Banned in {card[BANNED]}
        </div>
      )}
      {legalRestriction && legalRestriction !== PLAYTEST && (
        <div
          className="text-fgRed dark:text-fgRedDark"
          title={`Not Tournament Legal until ${legalRestriction}`}
        >
          Not Tournament Legal until {legalRestriction}
        </div>
      )}
    </div>
  );
};

export default ResultCryptLayoutText;
