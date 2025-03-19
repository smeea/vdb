import {
  CardImage,
  DeckCrypt,
  FlexGapped,
  Hr,
  PlaytestReportEntry,
  PlaytestScores,
  PlaytestScoresChart,
} from '@/components';
import { NAME, SCORE } from '@/constants';
import { useApp } from '@/context';

const PlaytestReportsAllCardOrPrecon = ({ product, isPrecon, report, maxSameScore }) => {
  const { isMobile } = useApp();

  const q = report && Object.keys(report).length;
  const score = report && Object.values(report).reduce((acc, value) => acc + value[SCORE], 0) / q;
  const scoreRounded = Math.round(score * 10) / 10;
  const scoreRoundedHalf = Math.round(score * 2) / 2;

  return (
    <>
      <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          {isMobile ? (
            <div className="text-fgSecondary dark:text-fgSecondaryDark flex font-bold">
              {product[NAME]}
            </div>
          ) : (
            <FlexGapped className="w-[320px] flex-col print:max-w-[250px]">
              <div className="flex flex-col gap-1">
                <div className="text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary flex font-bold">
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
                    className="print:max-w-[250px] print:min-w-[250px]"
                  />
                )}
              </div>
              {score > 0 && (
                <FlexGapped className="flex-col">
                  <div className="flex items-center justify-center">
                    <PlaytestScores value={scoreRoundedHalf} disabled />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <PlaytestScoresChart value={report} maxSameScore={maxSameScore} />
                    </div>
                    <div className="flex justify-between">
                      <div className="text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary min-w-[80px] font-bold">
                        Avg. score:
                      </div>
                      <div className="print:dark:text-fgPrimary">{scoreRounded}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary font-bold">
                        Reports:
                      </div>
                      <div className="print:dark:text-fgPrimary">{q}</div>
                    </div>
                  </div>
                </FlexGapped>
              )}
            </FlexGapped>
          )}
        </div>
        {report && <PlaytestReportEntry value={report} />}
      </FlexGapped>
      <Hr isThick className="last:hidden print:hidden" />
    </>
  );
};

export default PlaytestReportsAllCardOrPrecon;
