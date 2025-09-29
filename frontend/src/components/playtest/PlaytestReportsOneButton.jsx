import InboxesFill from "@icons/inboxes-fill.svg?react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useFetch } from "@/hooks";
import {
  ButtonIconed,
  CardImage,
  DeckCrypt,
  FlexGapped,
  Modal,
  PlaytestScores,
  PlaytestScoresChart,
  PlaytestReportEntry,
} from "@/components";
import { SCORE, PRECONS, ID, CARDS, NAME, DECK } from "@/constants";
import { useApp } from "@/context";


const PlaytestReportsOneButton = ({ value, isPrecon = false }) => {
  const { isMobile } = useApp();
  const [show, setShow] = useState();
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${isPrecon ? PRECONS : CARDS}/${value[ID]}`;
  const { value: report } = useFetch(url, {}, [value[ID]]);


  // TODO refactor with DRY => PlaytestReportsAllCardOrPrecon
  const q = report && Object.values(report).filter((i) => i[SCORE] > 0).length;
  const score = report && Object.values(report).reduce((acc, value) => acc + value[SCORE], 0) / q;
  const scoreRounded = Math.round(score * 10) / 10;
  const scoreRoundedHalf = Math.round(score * 2) / 2;

  return (
    <>
      <ButtonIconed
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && (
        <Modal
          size="lg"
          title={`Playtest Report - ${value[NAME]}`}
          handleClose={() => setShow(false)}
        >
          <FlexGapped className="max-sm:flex-col">
            <div className="flex flex-col gap-2 sm:gap-4">
              {!isMobile &&
               (isPrecon ? (
                 <div className="w-[358px]">
                   <DeckCrypt deck={value[DECK]} noDisciplines />
                 </div>
               ) : (
                 <CardImage card={value} onClick={() => setShow(false)} />
               ))}
              {score > 0 && (
                <FlexGapped className="flex-col">
                  <div className="flex items-center justify-center">
                    <PlaytestScores value={scoreRoundedHalf} disabled />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <PlaytestScoresChart value={report} />
                    </div>
                    <div className="flex justify-between">
                      <div className="min-w-[80px] font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                        Avg. score:
                      </div>
                      <div className="print:dark:text-fgPrimary">{scoreRounded}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark print:dark:text-fgSecondary">
                        Reports:
                      </div>
                      <div className="print:dark:text-fgPrimary">{q}</div>
                    </div>
                  </div>
                </FlexGapped>
              )}
            </div>

            {report && <PlaytestReportEntry value={report} />}
          </FlexGapped>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportsOneButton;
