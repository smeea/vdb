import React from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCryptTable,
  ResultLibraryTable,
  AccountLimitedSet,
  NewCardSelect,
  Modal,
} from '@/components';
import {
  limitedSetChange,
  limitedCardChange,
  limitedFullStore,
  useApp,
} from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const AccountLimitedModal = ({ setShow }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const limitedSets = useSnapshot(limitedFullStore).sets;
  const limitedAllowedCrypt = useSnapshot(limitedFullStore).allowed.crypt;
  const limitedAllowedLibrary = useSnapshot(limitedFullStore).allowed.library;
  const limitedBannedCrypt = useSnapshot(limitedFullStore).banned.crypt;
  const limitedBannedLibrary = useSnapshot(limitedFullStore).banned.library;
  const BCP_START = '2018-01-01';

  const allowedAdd = (e) => {
    const card =
      e.value > 200000 ? cryptCardBase[e.value] : libraryCardBase[e.value];

    limitedCardChange(card, true, true);
  };

  const bannedAdd = (e) => {
    const card =
      e.value > 200000 ? cryptCardBase[e.value] : libraryCardBase[e.value];

    limitedCardChange(card, false, true);
  };

  const setChange = (setid, isAdd) => {
    limitedSetChange(setid, isAdd);
  };

  return (
    <Modal
      handleClose={() => setShow(false)}
      size="lg"
      title="Manage Limited Format"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="underline text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Sets:
          </div>
          <div className="flex gap-3 sm:gap-5 max-sm:flex-col">
            <div className="flex flex-col gap-2 basis-full sm:basis-1/2">
              {Object.keys(setsAndPrecons)
                .filter(
                  (i) => i !== 'PLAYTEST' && setsAndPrecons[i].date > BCP_START
                )
                .map((i) => {
                  return (
                    <AccountLimitedSet
                      key={i}
                      isChecked={limitedSets[i]}
                      handleSetChange={setChange}
                      setid={i}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col gap-2 basis-full sm:basis-1/2">
              {Object.keys(setsAndPrecons)
                .filter(
                  (i) => i !== 'PLAYTEST' && setsAndPrecons[i].date < BCP_START
                )
                .map((i) => {
                  return (
                    <AccountLimitedSet
                      key={i}
                      isChecked={limitedSets[i]}
                      handleSetChange={setChange}
                      setid={i}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="inline underline text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Allowed Cards{' '}
            </div>
            <div className="inline underline text-fgSecondary dark:text-fgSecondaryDark">
              (in addition to Set selection):
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 max-sm:flex-col">
            <div className="flex flex-col basis-full sm:basis-7/12 gap-2">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <NewCardSelect target="crypt" onChange={allowedAdd} />
              {Object.keys(limitedAllowedCrypt).length > 0 && (
                <ResultCryptTable
                  resultCards={Object.values(limitedAllowedCrypt)}
                  inLimited="allowed"
                />
              )}
            </div>
            <div className="flex flex-col basis-full sm:basis-5/12 gap-2">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>
              <NewCardSelect target="library" onChange={allowedAdd} />
              {Object.keys(limitedAllowedLibrary).length > 0 && (
                <ResultLibraryTable
                  resultCards={Object.values(limitedAllowedLibrary)}
                  inLimited="allowed"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="inline underline text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Banned Cards{' '}
            </div>
            <div className="inline underline text-fgSecondary dark:text-fgSecondaryDark">
              (overwrite all):
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 max-sm:flex-col">
            <div className="flex flex-col basis-full sm:basis-7/12 gap-2">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <NewCardSelect target="crypt" onChange={bannedAdd} />
              {Object.keys(limitedBannedCrypt).length > 0 && (
                <ResultCryptTable
                  resultCards={Object.values(limitedBannedCrypt)}
                  inLimited="banned"
                />
              )}
            </div>
            <div className="flex flex-col basis-full sm:basis-5/12 gap-2">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>
              <NewCardSelect target="library" onChange={bannedAdd} />
              {Object.keys(limitedBannedLibrary).length > 0 && (
                <ResultLibraryTable
                  resultCards={Object.values(limitedBannedLibrary)}
                  inLimited="banned"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountLimitedModal;
