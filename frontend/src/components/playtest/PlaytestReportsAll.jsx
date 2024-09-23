import React, { useState } from 'react';
import Download from '@/assets/images/icons/download.svg?react';
import {
  ButtonIconed,
  CardImage,
  DeckCrypt,
  FlexGapped,
  Hr,
  PlaytestReportEntry,
  SortButton,
} from '@/components';
import { cryptSort, librarySort } from '@/utils';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';
import { NAME, CLAN, CLAN_DISCIPLINE } from '@/utils/constants';

const PlaytestReportsAll = () => {
  const { isMobile, preconDecks, cryptCardBase, libraryCardBase } = useApp();
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: 'N',
    [CLAN_DISCIPLINE]: 'C/D',
  };

  const playtestCrypt = cryptSort(
    Object.values(cryptCardBase).filter((i) => {
      return i.Id > 210000;
    }),
    sortMethod,
  );

  const playtestLibrary = librarySort(
    Object.values(libraryCardBase).filter((i) => {
      return i.Id > 110000;
    }),
    sortMethod == CLAN ? CLAN_DISCIPLINE : sortMethod,
  );

  const playtestPrecons = Object.values(preconDecks).filter((i) => {
    return i.deckid.includes('PLAYTEST:');
  });

  const exportReports = async (isPrecon) => {
    let exportText = '';
    Object.keys(value)
      .filter((id) => {
        if (isPrecon) {
          return isNaN(id);
        }
        return !isNaN(id);
      })
      .forEach((id, idx) => {
        const name = isPrecon
          ? preconDecks[`PLAYTEST:${id}`].name
          : id > 200000
            ? cryptCardBase[id].Name
            : libraryCardBase[id].Name;

        exportText += `${isPrecon ? 'Precon' : id > 200000 ? 'Crypt' : 'Library'}: ${name}\n\n`;
        Object.keys(value[id]).forEach((user, uIdx) => {
          exportText += `User: <${user}>\n`;
          exportText += `Score: ${value[id][user].score}\n`;
          exportText += `Seen in Play: ${value[id][user].isPlayed ? 'Yes' : 'No'}\n`;
          exportText += `${value[id][user].text}\n`;
          if (uIdx + 1 < Object.keys(value[id]).length) {
            exportText += '\n-----\n\n';
          }
        });
        if (idx + 1 < Object.keys(value).length) {
          exportText += '\n=====\n\n';
        }
      });

    const file = new File([exportText], `Reports - ${isPrecon ? 'Precons' : 'Cards'}.txt`, {
      type: 'text/plain;charset=utf-8',
    });

    let { saveAs } = await import('file-saver');
    saveAs(file);
  };

  const url = `${import.meta.env.VITE_API_URL}/playtest/export/all/all`;
  const { value } = useFetch(url, {}, []);

  return (
    <div className="playtest-manage-container mx-auto">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex justify-between gap-3 sm:gap-4">
          <ButtonIconed
            className="w-full"
            onClick={() => exportReports(true)}
            title="Save Precons"
            text="Save Precons"
            icon={<Download />}
          />
          <ButtonIconed
            className="w-full"
            onClick={() => exportReports()}
            title="Save Cards"
            text="Save Cards"
            icon={<Download />}
          />
          <SortButton
            className="min-w-[80px]"
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        </div>
        {[...playtestCrypt, ...playtestLibrary, ...playtestPrecons].map((i, idx) => {
          const playtestPrecon =
            i.deckid && i.deckid.includes('PLAYTEST:') && i.deckid.replace('PLAYTEST:', '');
          const id = playtestPrecon ?? i.Id;
          const name = playtestPrecon ? i.name : i.Name;

          return (
            <React.Fragment key={id}>
              <FlexGapped className="max-sm:flex-col">
                <div className="flex flex-col gap-2 sm:gap-4">
                  {isMobile ? (
                    <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">
                      {name}
                    </div>
                  ) : (
                    <>
                      {playtestPrecon ? (
                        <div className="flex w-[320px] flex-col gap-1">
                          <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark">
                            {i.name}
                          </div>
                          <DeckCrypt deck={i} noDisciplines inMissing />
                        </div>
                      ) : (
                        <CardImage card={i} size="sm" />
                      )}
                    </>
                  )}
                </div>
                {value?.[id] && <PlaytestReportEntry value={value[id]} />}
              </FlexGapped>
              {idx + 1 < playtestCrypt.length + playtestLibrary.length + playtestPrecons.length && (
                <Hr isThick />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PlaytestReportsAll;
