import InboxesFill from "@icons/inboxes-fill.svg?react";
import { useState } from "react";
import {
  ButtonIconed,
  CardImage,
  DeckCrypt,
  FlexGapped,
  Modal,
  PlaytestReportEntryWrapper,
} from "@/components";
import { ID, NAME } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportsOneButton = ({ value, isPrecon = false }) => {
  const { isMobile } = useApp();
  const [show, setShow] = useState();

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
                    <DeckCrypt deck={value.deck} noDisciplines />
                  </div>
                ) : (
                  <CardImage card={value} onClick={() => setShow(false)} />
                ))}
            </div>
            <PlaytestReportEntryWrapper id={value[ID]} isPrecon={isPrecon} />
          </FlexGapped>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportsOneButton;
