import React from 'react';
import { useApp } from '@/context';
import { FlexGapped, Hr } from '@/components';

const PlaytestReportsAllGeneral = ({ reports }) => {
  const { hidePlaytestNames } = useApp();

  return (
    <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
      <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark sm:min-w-[320px]">
        General Opinions
      </div>
      <div className="flex basis-full flex-col gap-4">
        {reports &&
          Object.entries(reports)
            .filter((i) => i[1])
            .map((i, idx) => {
              const name = i[0];
              const text = i[1];
              return (
                <React.Fragment key={name}>
                  <div className="flex flex-col gap-3">
                    {!hidePlaytestNames && (
                      <div className="flex w-full items-center text-fgName dark:text-fgNameDark print:dark:text-fgName">
                        &lt;{name}&gt;
                      </div>
                    )}
                    <div>
                      {text.split('\n').map((line, lineIdx) => (
                        <div key={lineIdx}>{line}</div>
                      ))}
                    </div>
                  </div>
                  {idx + 1 < Object.keys(reports).length && <Hr />}
                </React.Fragment>
              );
            })}
      </div>
    </FlexGapped>
  );
};

export default PlaytestReportsAllGeneral;
