import React from 'react';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
import { Hr, PlaytestScores } from '@/components';

const Report = ({ id, text, score, isPlayed }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div title={id} className="text-fgName dark:text-fgNameDark">
          &lt;{id.substring(0, 15)}
          {id.length > 15 && '…'}&gt;
        </div>{' '}
        <div className="flex items-center justify-end gap-4">
          <PlaytestScores value={score} isSmall />
          <div
            className={isPlayed ? '' : 'text-fgRed dark:text-fgRedDark'}
            title={`Was ${isPlayed ? '' : 'not '}seen in play`}
          >
            {isPlayed ? <EyeFill /> : <EyeSlashFill />}
          </div>
        </div>
      </div>
      <div>
        {text.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
};

const PlaytestReportEntry = ({ value }) => {
  return (
    <div className="flex basis-full flex-col gap-4">
      {Object.keys(value).map((id, idx) => {
        return (
          <React.Fragment key={id}>
            <Report
              id={id}
              text={value[id].text}
              score={value[id].score}
              isPlayed={value[id].isPlayed}
            />
            {idx + 1 < Object.keys(value).length && <Hr />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PlaytestReportEntry;
