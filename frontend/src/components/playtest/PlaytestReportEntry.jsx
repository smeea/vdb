import EyeFill from '@icons/eye-fill.svg?react';
import EyeSlashFill from '@icons/eye-slash-fill.svg?react';
import { Hr, PlaytestScores } from '@/components';
import { SCORE, TEXT } from '@/constants';
import { useApp } from '@/context';

const Report = ({ id, text, score, isPlayed }) => {
  const { hidePlaytestNames, isMobile } = useApp();
  const maxLength = isMobile ? 10 : 25;

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="flex h-6 w-full items-center justify-between">
        <div
          title={id}
          className="text-fgName dark:text-fgNameDark print:dark:text-fgName print:max-w-[150px] print:overflow-hidden print:text-ellipsis"
        >
          {!hidePlaytestNames && (
            <>
              &lt;{id.substring(0, maxLength)}
              {id.length > maxLength && '…'}&gt;
            </>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <PlaytestScores value={score} isSmall disabled />
          <div
            className={isPlayed ? 'print:text-fgPrimary' : 'text-fgRed dark:text-fgRedDark'}
            title={`Was ${isPlayed ? '' : 'not '}seen in play`}
          >
            {isPlayed ? <EyeFill /> : <EyeSlashFill />}
          </div>
        </div>
      </div>
      {text && (
        <div className="print:dark:text-fgPrimary">
          {text.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const PlaytestReportEntry = ({ value }) => {
  return (
    <div className="flex basis-full flex-col gap-4">
      {Object.keys(value)
        .sort((a, b) => value[a][TEXT] < value[b][TEXT])
        .sort((a, b) => value[a][SCORE] < value[b][SCORE])
        .map((id) => {
          return (
            <div key={id} className="group flex flex-col gap-2 sm:gap-3 print:break-inside-avoid">
              <Report
                id={id}
                text={value[id][TEXT]}
                score={value[id][SCORE]}
                isPlayed={value[id].isPlayed}
              />
              <Hr className="group-last:hidden" />
            </div>
          );
        })}
    </div>
  );
};

export default PlaytestReportEntry;
