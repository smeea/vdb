import InboxesFill from "@icons/inboxes-fill.svg?react";
import { lazy, useState } from "react";
import {
  ButtonIconed,
  CardImage,
  DeckCrypt,
  FlexGapped,
  Modal,
  PlaytestReportEntry,
} from "@/components";
import { CARDS, DECK, ID, NAME, PRECONS } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";

const PlaytestScores = lazy(() => import("./PlaytestScores"));

const PlaytestReportsOneButton = ({ value, isPrecon = false }) => {
  const { isMobile } = useApp();
  const [show, setShow] = useState();
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${isPrecon ? PRECONS : CARDS}/${value[ID]}`;
  const { value: report } = useFetch(url, {}, [value[ID]]);

  return (
    <>
      <ButtonIconed
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && (
        <Modal size="lg" title={value[NAME]} handleClose={() => setShow(false)}>
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

              <PlaytestScores report={report} />
            </div>
            {report && <PlaytestReportEntry value={report} />}
          </FlexGapped>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportsOneButton;
