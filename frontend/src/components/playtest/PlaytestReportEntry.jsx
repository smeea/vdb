import React from 'react';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
import { Hr, PlaytestScores } from '@/components';
import { useApp } from '@/context';
import { TEXT } from '@/constants';

const Report = ({ id, text, score, isPlayed }) => {
  const { hidePlaytestNames, isMobile } = useApp();
  const maxLength = isMobile ? 10 : 25;

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="flex h-6 w-full items-center justify-between">
        <div
          title={id}
          className="text-fgName dark:text-fgNameDark print:max-w-[150px] print:overflow-hidden print:text-ellipsis print:dark:text-fgName"
        >
          {!hidePlaytestNames && (
            <>
              &lt;{id.substring(0, maxLength)}
              {id.length > maxLength && '…'}&gt;
            </>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <PlaytestScores value={score} isSmall />
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
        .sort((a, b) => value[a].score < value[b].score)
        .map((id, idx) => {
          return (
            <div key={id} className="flex flex-col gap-2 sm:gap-3 print:break-inside-avoid">
              <Report
                id={id}
                text={value[id][TEXT]}
                score={value[id].score}
                isPlayed={value[id].isPlayed}
              />
              {idx + 1 < Object.keys(value).length && <Hr />}
            </div>
          );
        })}
    </div>
  );
};

export default PlaytestReportEntry;
