import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Arrow90DegLeft from "@icons/arrow-90deg-left.svg?react";
import Download from "@icons/download.svg?react";
import Printer from "@icons/printer.svg?react";
import ky from "ky";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ButtonIconed,
  FlexGapped,
  Hr,
  PlaytestReportsAllCardsWrapper,
  PlaytestReportsAllGeneral,
  PlaytestReportsAllPreconsWrapper,
  SortButton,
  TabButton,
  Toggle,
} from "@/components";
import {
  ALL,
  CARDS,
  CLAN_DISCIPLINE,
  CRYPT,
  GENERAL,
  LIBRARY,
  NAME,
  PLAYTEST,
  PLAYTEST_OLD,
  PRECONS,
  SCORE,
  TEXT,
  XLSX,
} from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import { playtestServices } from "@/services";
import { capitalize, getIsPlaytest } from "@/utils";

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
    [NAME]: "N",
    [CLAN_DISCIPLINE]: "C/D",
  };

  const exportReports = async (target, format) => {
    const reports = {
      ...reportsCrypt,
      ...reportsLibrary,
      ...reportsPrecons,
      [GENERAL]: reportsGeneral,
    };

    let file;
    let exportText = "";

    switch (format) {
      case XLSX: {
        const urlUsers = `${import.meta.env.VITE_API_URL}/playtest/users`;
        const users = await ky(urlUsers).json();
        const data = await playtestServices.exportXlsx(
          reports,
          users,
          cryptCardBase,
          libraryCardBase,
          preconDecks,
        );
        file = new File([data], `${target}.xlsx`, {
          type: "application/octet-stream",
        });
        break;
      }
      default:
        Object.keys(reports).forEach((id, idx) => {
          let name;
          switch (target) {
            case PRECONS:
              if (id === GENERAL || Number.isInteger(Number.parseInt(id))) return;
              name = preconDecks[`${PLAYTEST}:${id}`][NAME];
              exportText += `Precon: ${name}\n\n`;
              break;
            case CARDS:
              if (!Number.isInteger(Number.parseInt(id))) return;
              try {
                name = id > 200000 ? cryptCardBase[id][NAME] : libraryCardBase[id][NAME];
              } catch {
                console.log(`Skipping (not in this Round) - ${id}`);
                break;
              }
              exportText += `${id > 200000 ? "Crypt" : "Library"}: ${name}\n\n`;
              break;
            default:
              if (id !== GENERAL) return;
              exportText += "General Opinions\n\n";
          }

          Object.keys(reports[id]).forEach((user, uIdx) => {
            exportText += `User: <${user}>\n`;
            switch (target) {
              case GENERAL:
                if (reports[id][user]) exportText += `${reports[id][user]}\n`;
                break;
              default:
                exportText += `Score: ${reports[id][user][SCORE]}\n`;
                exportText += `Seen in Play: ${reports[id][user].isPlayed ? "Yes" : "No"}\n`;
                if (reports[id][user][TEXT]) exportText += `${reports[id][user][TEXT]}\n`;
            }
            if (uIdx + 1 < Object.keys(reports[id]).length) {
              exportText += "\n-----\n\n";
            }
          });
          if (idx + 1 < Object.keys(reports).length) {
            exportText += "\n=====\n\n";
          }
        });

        file = new File([exportText], `Reports - ${capitalize(target)}.txt`, {
          type: "text/plain;charset=utf-8",
        });
    }

    const { saveAs } = await import("file-saver");
    saveAs(file);
  };

  const urlReportsCrypt = `${import.meta.env.VITE_API_URL}/playtest/export/${CRYPT}/all`;
  const urlReportsLibrary = `${import.meta.env.VITE_API_URL}/playtest/export/${LIBRARY}/all`;
  const urlReportsPrecons = `${import.meta.env.VITE_API_URL}/playtest/export/${PRECONS}/all`;
  const urlReportsGeneral = `${import.meta.env.VITE_API_URL}/playtest/export/${GENERAL}/all`;
  const { value: reportsCrypt } = useFetch(urlReportsCrypt, {}, [isPlaytestAdmin]);
  const { value: reportsLibrary } = useFetch(urlReportsLibrary, {}, [isPlaytestAdmin]);
  const { value: reportsPrecons } = useFetch(urlReportsPrecons, {}, [isPlaytestAdmin]);
  const { value: reportsGeneral } = useFetch(urlReportsGeneral, {}, [isPlaytestAdmin]);

  Object.keys(reportsCrypt || {}).forEach((id) => {
    if (!getIsPlaytest(id) || cryptCardBase[id][PLAYTEST_OLD]) delete reportsCrypt[id];
  });

  Object.keys(reportsLibrary || {}).forEach((id) => {
    if (!getIsPlaytest(id) || libraryCardBase[id][PLAYTEST_OLD]) delete reportsLibrary[id];
  });

  Object.keys(reportsPrecons || {}).forEach((id) => {
    const ptDeckid = `${PLAYTEST}:${id}`;
    if (!preconDecks[ptDeckid] || preconDecks?.[ptDeckid]?.[PLAYTEST_OLD])
      delete reportsPrecons[id];
  });

  const getMaxReportsSameScore = (data) => {
    return Object.entries(data).reduce((acc, value) => {
      const scoresDistribution = Object.values(value[1]).reduce((acc2, value2) => {
        acc2[value2[SCORE] - 1] += 1;
        return acc2;
      }, Array(10).fill(0));

      const maxSameScore = Math.max.apply(Math, scoresDistribution);
      return maxSameScore > acc ? maxSameScore : acc;
    }, 0);
  };

  const maxReportsSameScoreCrypt = reportsCrypt && getMaxReportsSameScore(reportsCrypt);
  const maxReportsSameScoreLibrary = reportsLibrary && getMaxReportsSameScore(reportsLibrary);
  const maxReportsSameScorePrecons = reportsPrecons && getMaxReportsSameScore(reportsPrecons);

  return (
    <div className="playtest-reports-container mx-auto print:dark:bg-bgPrimary">
      <div className="flex flex-col gap-3 max-sm:p-2 sm:gap-4">
        <div className="flex justify-between gap-1 sm:gap-4 print:hidden">
          <div className="flex gap-1 max-sm:w-full max-sm:flex-col">
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(CARDS)}
              title="Cards - Text"
              text="Cards - Text"
              icon={<Download />}
            />
            <ButtonIconed
              className="w-full whitespace-nowrap"
              onClick={() => exportReports(PRECONS)}
              title="Precons - Text"
              text="Precons - Text"
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
              onClick={() => print()}
              title="PDF"
              text="PDF"
              icon={<Printer width="18" height="18" viewBox="0 0 18 16" />}
            />
          </div>
          <div className="flex gap-1 max-sm:flex-col max-sm:justify-between sm:gap-3">
            <div className="flex justify-between gap-1 max-sm:flex-col">
              <ButtonIconed
                onClick={() => navigate("/playtest")}
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
            <div className="flex justify-end">
              <Toggle
                isOn={hidePlaytestNames}
                handleClick={() => setHidePlaytestNames(!hidePlaytestNames)}
              >
                Hide Usernames
              </Toggle>
            </div>
          </div>
        </div>
        <TabGroup manual className="flex flex-col gap-3 sm:gap-4">
          <TabList className="flex gap-1.5 print:hidden">
            <TabButton>Crypt</TabButton>
            <TabButton>Library</TabButton>
            <TabButton>General / Precons</TabButton>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PlaytestReportsAllCardsWrapper
                maxSameScore={maxReportsSameScoreCrypt}
                reports={reportsCrypt}
                target={CRYPT}
                sortMethod={sortMethod}
              />
            </TabPanel>
            <TabPanel>
              <PlaytestReportsAllCardsWrapper
                maxSameScore={maxReportsSameScoreLibrary}
                reports={reportsLibrary}
                target={LIBRARY}
                sortMethod={sortMethod}
              />
            </TabPanel>
            <TabPanel>
              <FlexGapped className="flex-col">
                <PlaytestReportsAllGeneral reports={reportsGeneral} />
                <Hr isThick className="print:hidden" />
                <PlaytestReportsAllPreconsWrapper
                  reports={reportsPrecons}
                  maxSameScore={maxReportsSameScorePrecons}
                />
              </FlexGapped>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default PlaytestReportsAll;
