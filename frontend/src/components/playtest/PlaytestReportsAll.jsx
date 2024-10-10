import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Download from '@/assets/images/icons/download.svg?react';
import Arrow90DegLeft from '@/assets/images/icons/arrow-90deg-left.svg?react';
import {
  ButtonIconed,
  FlexGapped,
  Hr,
  PlaytestReportsAllCardsWrapper,
  PlaytestReportsAllPreconsWrapper,
  SortButton,
} from '@/components';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';
import { playtestServices } from '@/services';
import {
  ALL,
  CARDS,
  CLAN_DISCIPLINE,
  CRYPT,
  GENERAL,
  LIBRARY,
  NAME,
  PRECONS,
  XLSX,
} from '@/utils/constants';

const PlaytestReportsAll = () => {
  const { preconDecks, cryptCardBase, libraryCardBase } = useApp();
  const navigate = useNavigate();
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: 'N',
    [CLAN_DISCIPLINE]: 'C/D',
  };

  const exportReports = async (target, format) => {
    let file;

    if (format === XLSX) {
      const data = await playtestServices.exportXlsx(
        value,
        cryptCardBase,
        libraryCardBase,
        preconDecks,
      );
      file = new File([data], `${target}.xlsx`, {
        type: 'application/octet-stream',
      });
    } else {
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

      file = new File([exportText], `Reports - ${target == PRECONS ? 'Precons' : 'Cards'}.txt`, {
        type: 'text/plain;charset=utf-8',
      });
    }

    let { saveAs } = await import('file-saver');
    saveAs(file);
  };

  const url = `${import.meta.env.VITE_API_URL}/playtest/export/all/all`;
  const { value } = useFetch(url, {}, []);

  return (
    <div className="playtest-reports-container mx-auto">
      <div className="flex flex-col gap-3 max-sm:p-2 sm:gap-4">
        <div className="flex justify-between gap-1 sm:gap-4">
          <div className="flex justify-between gap-1 max-sm:w-full max-sm:flex-col sm:gap-4">
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(PRECONS)}
              title="Save Precons - Text"
              text="Save Precons - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(CARDS)}
              title="Save Cards - Text"
              text="Save Cards - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(GENERAL)}
              title="Save General - Text"
              text="Save General - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(ALL, XLSX)}
              title="Save All - Excel"
              text="Save All - Excel"
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
        <PlaytestReportsAllCardsWrapper reports={value} target={CRYPT} sortMethod={sortMethod} />
        <Hr isThick />
        <PlaytestReportsAllCardsWrapper reports={value} target={LIBRARY} sortMethod={sortMethod} />
        <Hr isThick />
        <PlaytestReportsAllPreconsWrapper reports={value} />
        <Hr isThick />
        <FlexGapped className="max-sm:flex-col">
          <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark sm:min-w-[320px]">
            GENERAL OPINIONS
          </div>
          <div className="flex basis-full flex-col gap-4">
            {value?.[GENERAL] &&
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
