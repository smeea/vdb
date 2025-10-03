import { FlexGapped, PlaytestScoresChart, PlaytestScoresStars } from "@/components";
import { SCORE } from "@/constants";

const PlaytestScores = ({ report, maxSameScore }) => {
  const q = report && Object.values(report).filter((i) => i[SCORE] > 0).length;
  const score = report && Object.values(report).reduce((acc, value) => acc + value[SCORE], 0) / q;
  const scoreRounded = Math.round(score * 10) / 10;
  const scoreRoundedHalf = Math.round(score * 2) / 2;

  return (
    <>
      {score > 0 && (
        <FlexGapped className="flex-col">
          <div className="flex items-center justify-center">
            <PlaytestScoresStars value={scoreRoundedHalf} disabled />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <PlaytestScoresChart value={report} maxSameScore={maxSameScore} />
            </div>
            <div className="flex justify-between">
              <div className="min-w-[80px] font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                Avg. score:
              </div>
              <div className="print:dark:text-fgPrimary">{scoreRounded}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                Reports:
              </div>
              <div className="print:dark:text-fgPrimary">{q}</div>
            </div>
          </div>
        </FlexGapped>
      )}
    </>
  );
};

export default PlaytestScores;
