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
  Toggle,
} from '@/components';
import { useCardImageUrl, useFetch } from '@/hooks';
import { useApp } from '@/context';
import { playtestServices } from '@/services';
import { capitalize } from '@/utils';
import {
  ALL,
  ASCII_NAME,
  CARDS,
  CLAN_DISCIPLINE,
  CRYPT,
  GENERAL,
  LIBRARY,
  NAME,
  PRECONS,
  XLSX,
  PDF,
} from '@/utils/constants';

const PlaytestReportsAll = () => {
  const {
    hidePlaytestNames,
    setHidePlaytestNames,
    isPlaytestAdmin,
    preconDecks,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const navigate = useNavigate();
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: 'N',
    [CLAN_DISCIPLINE]: 'C/D',
  };

  const exportReports = async (target, format) => {
    let file;
    let exportText = '';

    switch (format) {
      case XLSX: {
        const data = await playtestServices.exportXlsx(
          reports,
          users,
          cryptCardBase,
          libraryCardBase,
          preconDecks,
        );
        file = new File([data], `${target}.xlsx`, {
          type: 'application/octet-stream',
        });
        break;
      }
      case PDF: {
        const sheetW = format == 'letter' ? 215.9 : 210;
        const sheetH = format == 'letter' ? 279.4 : 297;
        const cardW = 63;
        const cardH = 88;
        const marginSides = 15;
        const gap = 5;
        const miniGap = 2;

        let { jsPDF } = await import('jspdf');
        const pdf = new jsPDF('p', 'mm', [sheetW, sheetH]);
        pdf.setDrawColor(200, 200, 200);

        Object.keys(reports).forEach((id, idx) => {
          let name;
          if (isNaN(id)) {
            name = id == GENERAL ? capitalize(GENERAL) : preconDecks[`PLAYTEST:${id}`].name;
          } else {
            try {
              const card = id > 200000 ? cryptCardBase[id] : libraryCardBase[id];
              name = card[ASCII_NAME];

              const img = new Image();
              img.src = `${useCardImageUrl(card, undefined, undefined).baseUrl}.jpg`;
              pdf.addImage(img, 'JPEG', marginSides, marginSides + gap, cardW, cardH);
            } catch {
              return;
            }
          }

          pdf.setFontSize(14);
          pdf.text(name, marginSides, marginSides);

          const textX = marginSides + cardW + gap;
          let textY = marginSides + gap + 4;
          const maxWidth = sheetW - marginSides * 2 - cardW - gap;

          Object.values(reports[id]).forEach((value, uIdx) => {
            if (isNaN(id)) return;
            let starX = textX;

            const neededY =
              textY + gap + miniGap + pdf.getTextDimensions(value.text, { maxWidth: maxWidth }).h;

            if (neededY > sheetH - marginSides) {
              pdf.addPage();
              textY = marginSides;
            }

            Array.apply(null, Array(10)).forEach((_, i) => {
              if (i < value.score) {
                pdf.text('+', starX, textY, {
                  maxWidth: maxWidth,
                });
              } else {
                pdf.text('-', starX, textY, {
                  maxWidth: maxWidth,
                });
              }
              starX += gap;
            });
            textY += gap;

            if (value.text) {
              textY += miniGap;
              pdf.setFontSize(11);
              pdf.text(value.text, textX, textY, {
                maxWidth: maxWidth,
              });
              textY += pdf.getTextDimensions(value.text, { maxWidth: maxWidth }).h + miniGap;
            }

            // switch (target) {
            //   case GENERAL:
            //     if (reports[id][user]) {
            //       exportText += `${reports[id][user]}\n`;
            //     }
            //     break;
            //   default:
            //   exportText += `Score: ${reports[id][user].score}\n`;
            //   exportText += `Seen in Play: ${reports[id][user].isPlayed ? 'Yes' : 'No'}\n`;
            //   if (reports[id][user].text) exportText += `${reports[id][user].text}\n`;
            // }
            if (uIdx + 1 < Object.keys(reports[id]).length) {
              pdf.line(textX, textY, sheetW - marginSides, textY);
              textY += gap + miniGap;
            }
          });
          if (idx + 1 < Object.keys(reports).length) {
            pdf.addPage();
          }
        });

        pdf.save(`file.pdf`);
        return;
      }
      default:
        Object.keys(reports).forEach((id, idx) => {
          let name;
          switch (target) {
            case PRECONS:
              if (id == GENERAL || !isNaN(id)) return;
              name = preconDecks[`PLAYTEST:${id}`].name;
              exportText += `Precon: ${name}\n\n`;
              break;
            case CARDS:
              if (isNaN(id)) return;
              try {
                name = id > 200000 ? cryptCardBase[id].Name : libraryCardBase[id].Name;
              } catch {
                console.log(`Skipping (not in this Round) - ${id}`);
                break;
              }
              exportText += `${id > 200000 ? 'Crypt' : 'Library'}: ${name}\n\n`;
              break;
            default:
              if (id != GENERAL) return;
              exportText += 'General Opinions\n\n';
          }

          Object.keys(reports[id]).forEach((user, uIdx) => {
            exportText += `User: <${user}>\n`;
            switch (target) {
              case GENERAL:
                if (reports[id][user]) exportText += `${reports[id][user]}\n`;
                break;
              default:
                exportText += `Score: ${reports[id][user].score}\n`;
                exportText += `Seen in Play: ${reports[id][user].isPlayed ? 'Yes' : 'No'}\n`;
                if (reports[id][user].text) exportText += `${reports[id][user].text}\n`;
            }
            if (uIdx + 1 < Object.keys(reports[id]).length) {
              exportText += '\n-----\n\n';
            }
          });
          if (idx + 1 < Object.keys(reports).length) {
            exportText += '\n=====\n\n';
          }
        });

        file = new File([exportText], `Reports - ${capitalize(target)}.txt`, {
          type: 'text/plain;charset=utf-8',
        });
    }

    let { saveAs } = await import('file-saver');
    saveAs(file);
  };

  const urlReports = `${import.meta.env.VITE_API_URL}/playtest/export/all/all`;
  const urlUsers = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value: reports } = useFetch(urlReports, {}, [isPlaytestAdmin]);
  const { value: users } = useFetch(urlUsers, {}, [isPlaytestAdmin]);

  return (
    <div className="playtest-reports-container mx-auto">
      <div className="flex flex-col gap-3 max-sm:p-2 sm:gap-4">
        <div className="flex justify-between gap-1 sm:gap-4">
          <div className="flex justify-between gap-1 max-sm:w-full max-sm:flex-col sm:gap-4">
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(PRECONS)}
              title="Precons - Text"
              text="Precons - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(CARDS)}
              title="Cards - Text"
              text="Cards - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(GENERAL)}
              title="General - Text"
              text="General - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(ALL, XLSX)}
              title="Excel"
              text="Excel"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(ALL, PDF)}
              title="PDF"
              text="PDF"
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
        <div className="flex justify-end">
          <Toggle
            isOn={hidePlaytestNames}
            handleClick={() => setHidePlaytestNames(!hidePlaytestNames)}
          >
            Hide Usernames
          </Toggle>
        </div>
        <PlaytestReportsAllCardsWrapper reports={reports} target={CRYPT} sortMethod={sortMethod} />
        <Hr isThick />
        <PlaytestReportsAllCardsWrapper
          reports={reports}
          target={LIBRARY}
          sortMethod={sortMethod}
        />
        <Hr isThick />
        <PlaytestReportsAllPreconsWrapper reports={reports} />
        <Hr isThick />
        <FlexGapped className="max-sm:flex-col">
          <div className="flex font-bold text-fgSecondary dark:text-fgSecondaryDark sm:min-w-[320px]">
            GENERAL OPINIONS
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
      </div>
    </div>
  );
};

export default PlaytestReportsAll;
