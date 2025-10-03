import { twMerge } from "tailwind-merge";
import {
  CardImage,
  DeckCrypt,
  FlexGapped,
  Hr,
  PlaytestReportEntry,
  PlaytestScores,
} from "@/components";
import { NAME } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportsAllCardOrPrecon = ({ product, isPrecon, report, maxSameScore }) => {
  const { isMobile } = useApp();

  return (
    <>
      <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          {isMobile ? (
            <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">
              {product[NAME]}
            </div>
          ) : (
            <FlexGapped
              className={twMerge(
                "w-[320px] flex-col",
                isPrecon ? "print:max-w-[320px]" : "print:max-w-[250px]",
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                  {product[NAME]}
                </div>
                {isPrecon ? (
                  <div className="print:text-sm">
                    <DeckCrypt deck={product} noDisciplines inMissing />
                  </div>
                ) : (
                  <CardImage
                    card={product}
                    size="sm"
                    className="print:min-w-[250px] print:max-w-[250px]"
                  />
                )}
              </div>
            </FlexGapped>
          )}
          <PlaytestScores report={report} maxSameScore={maxSameScore} />
        </div>
        <Hr isThick className="print:hidden" />
        {report && <PlaytestReportEntry value={report} />}
      </FlexGapped>
      <Hr isThick className="last:hidden print:hidden" />
    </>
  );
};

export default PlaytestReportsAllCardOrPrecon;
