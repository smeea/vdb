import { twMerge } from "tailwind-merge";
import {
  CardImage,
  DeckCrypt,
  FlexGapped,
  Hr,
  PlaytestReportEntry,
  PlaytestReportForm,
  PlaytestScores,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
} from "@/components";
import { DECKID, ID, NAME, PLAYTEST } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportsAllCardOrPrecon = ({ product, isPrecon, report, maxSameScore }) => {
  const { showPlaytestImages, isPlaytestAdmin, isMobile } = useApp();

  return (
    <>
      <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          <FlexGapped
            className={twMerge(
              "w-[320px] flex-col max-sm:w-full",
              isPrecon ? "print:max-w-[320px]" : "print:max-w-[250px]",
            )}
          >
            <div className="flex flex-col gap-1 max-sm:w-full">
              {isPrecon ||
                (showPlaytestImages && (
                  <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                    {product[NAME]}
                  </div>
                ))}
              {isPrecon ? (
                <div className="print:text-sm">
                  <DeckCrypt deck={product} noDisciplines inMissing />
                </div>
              ) : showPlaytestImages ? (
                <CardImage
                  card={product}
                  size="sm"
                  className="max-sm:w-full sm:print:min-w-[250px] sm:print:max-w-[250px]"
                />
              ) : product[ID] > 200000 ? (
                <ResultCryptLayoutText card={product} />
              ) : (
                <ResultLibraryLayoutText card={product} />
              )}
            </div>
          </FlexGapped>
          {isPlaytestAdmin && <PlaytestScores report={report} maxSameScore={maxSameScore} />}
        </div>
        {!isMobile && <Hr isThick className="print:hidden" />}
        <div className="flex basis-full flex-col gap-3">
          <div
            className={twMerge(
              "flex print:hidden",
              isPlaytestAdmin &&
                "rounded-md border-[3px] border-fgSecondary border-dashed p-2.5 dark:border-fgSecondaryDark",
            )}
          >
            <PlaytestReportForm
              isPrecon={isPrecon}
              deck={product}
              id={isPrecon ? product[DECKID].replace(`${PLAYTEST}:`, "") : product[ID]}
              isUnfolded={!isPlaytestAdmin}
              inAllReports
              rows={isMobile ? 5 : 8}
            />
          </div>
          {report && <PlaytestReportEntry value={report} />}
        </div>
      </FlexGapped>
      <Hr isThick className="last:hidden print:hidden" />
    </>
  );
};

export default PlaytestReportsAllCardOrPrecon;
