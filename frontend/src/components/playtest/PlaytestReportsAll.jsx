import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Download from '@/assets/images/icons/download.svg?react';
import Arrow90DegLeft from '@/assets/images/icons/arrow-90deg-left.svg?react';
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
import { GENERAL, PRECONS, CARDS, NAME, CLAN, CLAN_DISCIPLINE } from '@/utils/constants';

const PlaytestReportsAll = () => {
  const { isMobile, preconDecks, cryptCardBase, libraryCardBase } = useApp();
  const navigate = useNavigate();
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: 'N',
    [CLAN_DISCIPLINE]: 'C/D',
  };

  const playtestCrypt = cryptSort(
    Object.values(cryptCardBase || {}).filter((i) => {
      return i.Id > 210000;
    }),
    sortMethod,
  );

  const playtestLibrary = librarySort(
    Object.values(libraryCardBase || {}).filter((i) => {
      return i.Id > 110000;
    }),
    sortMethod == CLAN ? CLAN_DISCIPLINE : sortMethod,
  );

  const playtestPrecons = Object.values(preconDecks || {}).filter((i) => {
    return i.deckid.includes('PLAYTEST:');
  });

  const exportReports = async (target) => {
    let exportText = '';
    Object.keys(value).forEach((id, idx) => {
      let name;
      switch (target) {
        case PRECONS:
          if (id == GENERAL || !isNaN(id)) return;
          name = preconDecks[`PLAYTEST:${id}`].name;
          exportText += `Precon: ${name}\n\n`;
          break;
        case CARDS:
          if (isNaN(id)) return;
          name = id > 200000 ? cryptCardBase[id].Name : libraryCardBase[id].Name;
          exportText += `${id > 200000 ? 'Crypt' : 'Library'}: ${name}\n\n`;
          break;
        default:
          if (id != GENERAL) return;
          exportText += 'General Opinions\n\n';
      }

      Object.keys(value[id]).forEach((user, uIdx) => {
        exportText += `User: <${user}>\n`;
        switch (target) {
          case GENERAL:
            if (value[id][user]) exportText += `${value[id][user]}\n`;
            break;
          default:
            exportText += `Score: ${value[id][user].score}\n`;
            exportText += `Seen in Play: ${value[id][user].isPlayed ? 'Yes' : 'No'}\n`;
            if (value[id][user].text) exportText += `${value[id][user].text}\n`;
        }
        if (uIdx + 1 < Object.keys(value[id]).length) {
          exportText += '\n-----\n\n';
        }
      });
      if (idx + 1 < Object.keys(value).length) {
        exportText += '\n=====\n\n';
      }
    });

    const file = new File(
      [exportText],
      `Reports - ${target == PRECONS ? 'Precons' : 'Cards'}.txt`,
      {
        type: 'text/plain;charset=utf-8',
      },
    );

    let { saveAs } = await import('file-saver');
    saveAs(file);
  };

  const url = `${import.meta.env.VITE_API_URL}/playtest/export/all/all`;
  const { value } = useFetch(url, {}, []);

  return (
    <div className="playtest-manage-container mx-auto">
      <div className="flex flex-col gap-3 max-sm:p-2 sm:gap-4">
        <div className="flex justify-between gap-1 sm:gap-4">
          <div className="flex justify-between gap-1 max-sm:w-full max-sm:flex-col sm:gap-4">
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(PRECONS)}
              title="Save Precons"
              text="Save Precons"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(CARDS)}
              title="Save Cards"
              text="Save Cards"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(GENERAL)}
              title="Save General"
              text="Save General"
              icon={<Download />}
            />
          </div>
          <div className="flex justify-between gap-1 max-sm:flex-col sm:gap-4">
            <ButtonIconed
              onClick={() => navigate('/playtest')}
              title="Back"
              icon={<Arrow90DegLeft />}
              text="Back"
            />
            <SortButton
              className="h-full min-w-[80px]"
              sortMethods={sortMethods}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </div>
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
        <Hr isThick />
        <FlexGapped className="max-sm:flex-col">
          <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark sm:min-w-[320px]">
            GENERAL OPINIONS
          </div>
          <div className="flex basis-full flex-col gap-4">
            {value &&
              Object.entries(value?.[GENERAL])
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
                      {idx + 1 < Object.keys(value?.[GENERAL]).length && <Hr />}
                    </React.Fragment>
                  );
                })}
          </div>
        </FlexGapped>
      </div>
    </div>
  );
};

export default PlaytestReportsAll;
