import React from 'react';
import { useSnapshot } from 'valtio';
import {
  FlexGapped,
  ResultCryptTable,
  ResultLibraryTable,
  NewCardSelect,
} from '@/components';
import { limitedCardChange, limitedFullStore, useApp } from '@/context';

const AccountLimitedCardSelection = ({ inBanned }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const limitedCrypt = inBanned
    ? useSnapshot(limitedFullStore).banned.crypt
    : useSnapshot(limitedFullStore).allowed.crypt;
  const limitedLibrary = inBanned
    ? useSnapshot(limitedFullStore).banned.library
    : useSnapshot(limitedFullStore).allowed.library;

  const cardAdd = (e) => {
    const card =
      e.value > 200000 ? cryptCardBase[e.value] : libraryCardBase[e.value];

    limitedCardChange(card, !inBanned, true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="inline text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
          {inBanned ? <>Banned Cards </> : <>Allowed Cards </>}
        </div>
        <div className="inline text-fgSecondary underline dark:text-fgSecondaryDark">
          {inBanned ? (
            <>(overwrite all):</>
          ) : (
            <>(in addition to Set selection):</>
          )}
        </div>
      </div>
      <FlexGapped className="sm:flex-col">
        <div className="flex basis-full flex-col gap-2 sm:basis-7/12">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Crypt:
          </div>
          <NewCardSelect target="crypt" onChange={cardAdd} />
          {Object.keys(limitedCrypt).length > 0 && (
            <ResultCryptTable
              resultCards={Object.values(cryptCardBase).filter(
                (c) => limitedCrypt[c.Id]
              )}
              inLimited={inBanned ? 'banned' : 'allowed'}
            />
          )}
        </div>
        <div className="flex basis-full flex-col gap-2 sm:basis-5/12">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Library:
          </div>
          <NewCardSelect target="library" onChange={cardAdd} />
          {Object.keys(limitedLibrary).length > 0 && (
            <ResultLibraryTable
              resultCards={Object.values(libraryCardBase).filter(
                (c) => limitedLibrary[c.Id]
              )}
              inLimited={inBanned ? 'banned' : 'allowed'}
            />
          )}
        </div>
      </FlexGapped>
    </div>
  );
};

export default AccountLimitedCardSelection;
