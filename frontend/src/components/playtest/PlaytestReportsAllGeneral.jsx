import React from 'react';
import { FlexGapped } from '@/components';
import { GENERAL } from '@/utils/constants';

const PlaytestReportsAllGeneral = ({ reports }) => {
  return (
    <FlexGapped className="max-sm:flex-col">
      <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark sm:min-w-[320px]">
        General Opinions
      </div>
      <div className="flex basis-full flex-col gap-4">
        {reports?.[GENERAL] &&
          Object.entries(reports?.[GENERAL])
            .filter((i) => i[1])
            .map((i, idx) => {
              const name = i[0];
              const text = i[1];
              return (
                <React.Fragment key={name}>
                  <div className="flex flex-col gap-3">
                    <div className="flex w-full items-center text-fgName dark:text-fgNameDark">
                      &lt;{name}&gt;
                    </div>
                    <div>
                      {text.split('\n').map((line, lineIdx) => (
                        <div key={lineIdx}>{line}</div>
                      ))}
                    </div>
                  </div>
                  {idx + 1 < Object.keys(reports?.[GENERAL]).length && <Hr />}
                </React.Fragment>
              );
            })}
      </div>
    </FlexGapped>
  );
};

export default PlaytestReportsAllGeneral;
