import React from 'react';
import {
  PlaytestScores,
  CardImage,
  DeckCrypt,
  FlexGapped,
  Hr,
  PlaytestReportEntry,
  PlaytestScoresChart,
} from '@/components';
import { useApp } from '@/context';

const PlaytestReportsAllCardOrPrecon = ({ product, isPrecon, report, withHr, maxSameScore }) => {
  const { isMobile } = useApp();
  const name = isPrecon ? product.name : product.Name;

  const q = report && Object.keys(report).length;
  const score = report && Object.values(report).reduce((acc, value) => acc + value.score, 0) / q;
  const scoreRounded = Math.round(score * 10) / 10;
  const scoreRoundedHalf = Math.round(score * 2) / 2;

  return (
    <>
      <FlexGapped className="max-sm:flex-col">
        <div className="flex flex-col gap-2 sm:gap-4">
          {isMobile ? (
            <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">{name}</div>
          ) : (
            <div className="flex w-[320px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">
                  {name}
                </div>
                {isPrecon ? (
                  <DeckCrypt deck={product} noDisciplines inMissing />
                ) : (
                  <CardImage card={product} size="sm" />
                )}
              </div>
              {score && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <PlaytestScores value={scoreRoundedHalf} />
                  </div>
                  <div className="flex items-center">
                    <PlaytestScoresChart value={report} maxSameScore={maxSameScore} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="min-w-[80px] font-bold text-fgSecondary dark:text-fgSecondaryDark">
                        Avg. score:
                      </div>
                      <div className="flex items-center">{scoreRounded}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                        Reports:
                      </div>
                      <div>{q}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {report && <PlaytestReportEntry value={report} />}
      </FlexGapped>
      {withHr && <Hr isThick />}
    </>
  );
};

export default PlaytestReportsAllCardOrPrecon;
