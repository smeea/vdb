import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCryptTable,
  ResultLibraryTable,
  Checkbox,
  Button,
  QuickSelect,
  Modal,
} from '@/components';
import {
  limitedSetChange,
  limitedCardChange,
  limitedFullStore,
  useApp,
} from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const AccountLimitedSet = ({ isChecked, handleSetChange, setid }) => {
  return (
    <div className="flex gap-1">
      <Checkbox
        name={setid}
        label={
          <div className="flex gap-1.5">
            {setsAndPrecons[setid].name}{' '}
            {setsAndPrecons[setid].date && (
              <div className="text-fgSecondary dark:text-fgSecondaryDark">
                [{setsAndPrecons[setid].date}]
              </div>
            )}
          </div>
        }
        checked={isChecked ?? false}
        value={setid}
        onChange={() => handleSetChange(setid, !isChecked)}
      />
    </div>
  );
};

const AccountLimitedModal = ({ setShow }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const limitedSets = useSnapshot(limitedFullStore).sets;
  const limitedAllowedCrypt = useSnapshot(limitedFullStore).allowed.crypt;
  const limitedAllowedLibrary = useSnapshot(limitedFullStore).allowed.library;
  const limitedBannedCrypt = useSnapshot(limitedFullStore).banned.crypt;
  const limitedBannedLibrary = useSnapshot(limitedFullStore).banned.library;

  const allowedAdd = (card) => {
    limitedCardChange(card, true, true);
  };

  const bannedAdd = (card) => {
    limitedCardChange(card, false, true);
  };

  const setChange = (setid, isAdd) => {
    limitedSetChange(setid, isAdd);
  };

  const handleClose = () => setShow(false);

  return (
    <Modal handleClose={handleClose} title="Manage Limited Format">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="underline text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Sets:
          </div>
          <div className="flex flex-col gap-2">
            {Object.keys(setsAndPrecons)
              .filter((i) => i !== 'PLAYTEST')
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
        <div className="flex flex-col gap-2">
          <div>
            <div className="inline underline text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Allowed Cards{' '}
            </div>
            <div className="inline underline text-fgSecondary dark:text-fgSecondaryDark">
              (in addition to Set selection):
            </div>
          </div>
          <QuickSelect setCard={allowedAdd} />
          {Object.keys(limitedAllowedCrypt).length > 0 && (
            <div>
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <ResultCryptTable
                resultCards={Object.values(limitedAllowedCrypt)}
              />
            </div>
          )}
          {Object.keys(limitedAllowedLibrary).length > 0 && (
            <div>
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>

              <ResultLibraryTable
                resultCards={Object.values(limitedAllowedLibrary)}
              />
            </div>
          )}
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
          <QuickSelect setCard={bannedAdd} />
          {Object.keys(limitedBannedCrypt).length > 0 && (
            <div>
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <ResultCryptTable
                resultCards={Object.values(limitedBannedCrypt)}
              />
            </div>
          )}
          {Object.keys(limitedBannedLibrary).length > 0 && (
            <div>
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>
              <ResultLibraryTable
                resultCards={Object.values(limitedBannedLibrary)}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AccountLimitedModal;
