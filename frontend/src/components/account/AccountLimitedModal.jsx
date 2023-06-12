import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import { setMany } from 'idb-keyval';
import Download from '@/assets/images/icons/download.svg';
import Upload from '@/assets/images/icons/upload.svg';
import {
  ResultCryptTable,
  ResultLibraryTable,
  AccountLimitedSet,
  NewCardSelect,
  Modal,
  ButtonIconed,
} from '@/components';
import {
  limitedSetChange,
  limitedCardChange,
  limitedFullStore,
  useApp,
} from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const AccountLimitedModal = ({ setShow }) => {
  const { setLimitedFormat, cryptCardBase, libraryCardBase } = useApp();
  const limitedSets = useSnapshot(limitedFullStore).sets;
  const limitedAllowedCrypt = useSnapshot(limitedFullStore).allowed.crypt;
  const limitedAllowedLibrary = useSnapshot(limitedFullStore).allowed.library;
  const limitedBannedCrypt = useSnapshot(limitedFullStore).banned.crypt;
  const limitedBannedLibrary = useSnapshot(limitedFullStore).banned.library;
  const BCP_START = '2018-01-01';
  const fileInput = useRef();

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

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importFormat = (fileInput) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      const formatText = reader.result;
      const f = JSON.parse(formatText);

      setLimitedFormat(
        f.allowed.crypt,
        f.allowed.library,
        f.banned.crypt,
        f.banned.library,
        f.sets
      );

      setMany([
        ['limitedAllowedCrypt', f.allowed.crypt],
        ['limitedAllowedLibrary', f.allowed.library],
        ['limitedBannedCrypt', f.banned.crypt],
        ['limitedBannedLibrary', f.banned.library],
        ['limitedSets', f.sets],
      ]);
    };
  };

  const minifyFormat = () => {
    const minified = {
      sets: limitedSets,
      allowed: {
        crypt: {},
        library: {},
      },
      banned: {
        crypt: {},
        library: {},
      },
    };
    Object.keys(limitedAllowedCrypt).map((c) => {
      minified.allowed.crypt[c] = true;
    });
    Object.keys(limitedAllowedLibrary).map((c) => {
      minified.allowed.library[c] = true;
    });
    Object.keys(limitedBannedCrypt).map((c) => {
      minified.banned.crypt[c] = true;
    });
    Object.keys(limitedBannedLibrary).map((c) => {
      minified.banned.library[c] = true;
    });
    return minified;
  };

  const exportFormat = async () => {
    let { saveAs } = await import('file-saver');
    const fileName = `Limited Format [${
      new Date().toISOString().split('T')[0]
    }].txt`;
    const formatText = JSON.stringify(minifyFormat(), null, '  ');
    const file = new File([formatText], fileName, {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(file, fileName);
  };

  return (
    <Modal
      handleClose={() => setShow(false)}
      size="lg"
      title="Manage Limited Format"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
            Sets:
          </div>
          <div className="flex gap-3 max-sm:flex-col sm:gap-5">
            <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
              {Object.keys(setsAndPrecons)
                .filter(
                  (i) => i !== 'PLAYTEST' && setsAndPrecons[i].date > BCP_START
                )
                .map((i) => {
                  return (
                    <AccountLimitedSet
                      key={i}
                      isChecked={limitedSets[i]}
                      handleSetChange={limitedSetChange}
                      setid={i}
                    />
                  );
                })}
            </div>
            <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
              {Object.keys(setsAndPrecons)
                .filter(
                  (i) => i !== 'PLAYTEST' && setsAndPrecons[i].date < BCP_START
                )
                .map((i) => {
                  return (
                    <AccountLimitedSet
                      key={i}
                      isChecked={limitedSets[i]}
                      handleSetChange={limitedSetChange}
                      setid={i}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="inline text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
              Allowed Cards{' '}
            </div>
            <div className="inline text-fgSecondary underline dark:text-fgSecondaryDark">
              (in addition to Set selection):
            </div>
          </div>
          <div className="flex gap-3 max-sm:flex-col sm:gap-5">
            <div className="flex basis-full flex-col gap-2 sm:basis-7/12">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <NewCardSelect target="crypt" onChange={allowedAdd} />
              {Object.keys(limitedAllowedCrypt).length > 0 && (
                <ResultCryptTable
                  resultCards={Object.values(cryptCardBase).filter(
                    (c) => limitedAllowedCrypt[c.Id]
                  )}
                  inLimited="allowed"
                />
              )}
            </div>
            <div className="flex basis-full flex-col gap-2 sm:basis-5/12">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>
              <NewCardSelect target="library" onChange={allowedAdd} />
              {Object.keys(limitedAllowedLibrary).length > 0 && (
                <ResultLibraryTable
                  resultCards={Object.values(libraryCardBase).filter(
                    (c) => limitedAllowedLibrary[c.Id]
                  )}
                  inLimited="allowed"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="inline text-lg font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
              Banned Cards{' '}
            </div>
            <div className="inline text-fgSecondary underline dark:text-fgSecondaryDark">
              (overwrite all):
            </div>
          </div>
          <div className="flex gap-3 max-sm:flex-col sm:gap-5">
            <div className="flex basis-full flex-col gap-2 sm:basis-7/12">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Crypt:
              </div>
              <NewCardSelect target="crypt" onChange={bannedAdd} />
              {Object.keys(limitedBannedCrypt).length > 0 && (
                <ResultCryptTable
                  resultCards={Object.values(cryptCardBase).filter(
                    (c) => limitedBannedCrypt[c.Id]
                  )}
                  inLimited="banned"
                />
              )}
            </div>
            <div className="flex basis-full flex-col gap-2 sm:basis-5/12">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Library:
              </div>
              <NewCardSelect target="library" onChange={bannedAdd} />
              {Object.keys(limitedBannedLibrary).length > 0 && (
                <ResultLibraryTable
                  resultCards={Object.values(libraryCardBase).filter(
                    (c) => limitedBannedLibrary[c.Id]
                  )}
                  inLimited="banned"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <ButtonIconed
            variant="primary"
            onClick={handleFileInputClick}
            title="Import Format"
            icon={<Upload />}
            text="Import Format"
          />

          <ButtonIconed
            variant="primary"
            onClick={exportFormat}
            title="Export Format"
            icon={<Download />}
            text="Export Format"
          />
        </div>
      </div>
      <input
        ref={fileInput}
        accept=".txt"
        type="file"
        onChange={() => importFormat(fileInput)}
        style={{ display: 'none' }}
      />
    </Modal>
  );
};

export default AccountLimitedModal;
