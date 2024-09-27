import React from 'react';
import { CardImage, DeckCrypt, FlexGapped, Hr, PlaytestReportEntry } from '@/components';
import { useApp } from '@/context';

const PlaytestReportsAllCardOrPrecon = ({ product, isPrecon, report, withHr }) => {
  const { isMobile } = useApp();
  const name = isPrecon ? product.name : product.Name;

  return (
    <>
      <FlexGapped className="max-sm:flex-col">
        <div className="flex flex-col gap-2 sm:gap-4">
          {isMobile ? (
            <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">{name}</div>
          ) : (
            <>
              {isPrecon ? (
                <div className="flex w-[320px] flex-col gap-1">
                  <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">
                    {name}
                  </div>
                  <DeckCrypt deck={product} noDisciplines inMissing />
                </div>
              ) : (
                <CardImage card={product} size="sm" />
              )}
            </>
          )}
        </div>
        {report && <PlaytestReportEntry value={report} />}
      </FlexGapped>
      {withHr && <Hr isThick />}
    </>
  );
};

export default PlaytestReportsAllCardOrPrecon;
