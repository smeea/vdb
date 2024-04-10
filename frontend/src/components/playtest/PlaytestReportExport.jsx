import React from 'react';
import { Spinner, Hr, PlaytestScores } from '@/components';
import { useFetch } from '@/hooks';

const Report = ({ id, text, score }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full justify-between items-center">
        <div title={id} className="text-fgName dark:text-fgNameDark">
          &lt;{id.substring(0, 15)}
          {id.length > 15 && '...'}&gt;
        </div>{' '}
        <div className="flex justify-end">
          <PlaytestScores value={score} isSmall />
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

const PlaytestReportExport = ({ id, isPrecon = false }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const { value } = useFetch(url, {}, [id]);

  return (
    <div className="flex basis-full flex-col gap-4">
      {value ? (
        Object.keys(value).map((id, idx) => {
          return (
            <React.Fragment key={id}>
              <Report id={id} text={value[id].text} score={value[id].score} />
              {idx + 1 < Object.keys(value).length && <Hr />}
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center pt-5">
          <Spinner className="size-7" />
        </div>
      )}
    </div>
  );
};

export default PlaytestReportExport;
