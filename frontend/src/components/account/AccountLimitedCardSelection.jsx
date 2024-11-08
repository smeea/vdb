import React from 'react';
import { useSnapshot } from 'valtio';
import { FlexGapped, ResultCryptTable, ResultLibraryTable, NewCardSelect } from '@/components';
import { limitedCardChange, limitedFullStore, useApp } from '@/context';
import { ID, CRYPT, LIBRARY, BANNED, ALLOWED } from '@/constants';

const AccountLimitedCardSelection = ({ inBanned }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const limitedCrypt = useSnapshot(limitedFullStore)[inBanned ? BANNED : ALLOWED][CRYPT];
  const limitedLibrary = useSnapshot(limitedFullStore)[inBanned ? BANNED : ALLOWED][LIBRARY];

  const cardAdd = (e) => {
    const card = e.value > 200000 ? cryptCardBase[e.value] : libraryCardBase[e.value];

    limitedCardChange(card, !inBanned, true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="inline text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
          {inBanned ? <>Banned Cards </> : <>Allowed Cards </>}
        </div>
        <div className="inline text-fgSecondary underline dark:text-fgSecondaryDark">
          {inBanned ? <>(overwrite all):</> : <>(in addition to Set selection):</>}
        </div>
      </div>
      <FlexGapped className="max-sm:flex-col">
        <div className="flex flex-col gap-2 sm:basis-5/9">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Crypt:</div>
          <NewCardSelect target={CRYPT} onChange={cardAdd} />
          {Object.keys(limitedCrypt).length > 0 && (
            <ResultCryptTable
              resultCards={Object.values(cryptCardBase).filter((c) => limitedCrypt[c[ID]])}
              inLimited={inBanned ? BANNED : ALLOWED}
            />
          )}
        </div>
        <div className="flex basis-full flex-col gap-2 sm:basis-4/9">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Library:</div>
          <NewCardSelect target={LIBRARY} onChange={cardAdd} />
          {Object.keys(limitedLibrary).length > 0 && (
            <ResultLibraryTable
              resultCards={Object.values(libraryCardBase).filter((c) => limitedLibrary[c[ID]])}
              inLimited={inBanned ? BANNED : ALLOWED}
            />
          )}
        </div>
      </FlexGapped>
    </div>
  );
};

export default AccountLimitedCardSelection;
