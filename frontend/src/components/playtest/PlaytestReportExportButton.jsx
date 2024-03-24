import React, { useState } from 'react';
import Download from '@/assets/images/icons/download.svg?react';
import InboxesFill from '@/assets/images/icons/inboxes-fill.svg?react';
import {
  CardImage,
  FlexGapped,
  ButtonIconed,
  Modal,
  PlaytestReportExport,
  DeckCrypt,
} from '@/components';
import { useApp } from '@/context';
import { playtestServices } from '@/services';

const PlaytestReportExportButton = ({ value, isPrecon = false }) => {
  const { isMobile, isDesktop } = useApp();
  const [show, setShow] = useState();

  const exportReports = async () => {
    const result = await playtestServices.getReports(value, isPrecon);

    let exportText = '';
    Object.keys(result).forEach((id, idx) => {
      exportText += `User: <${id}>\n`;
      exportText += `Score: ${result[id].score}\n`;
      exportText += `${result[id].text}\n`;
      if (idx + 1 < Object.keys(result).length) {
        exportText += '\n-----\n\n';
      }
    });

    const file = new File([exportText], `${value.Name}.txt`, {
      type: 'text/plain;charset=utf-8',
    });

    let { saveAs } = await import('file-saver');
    saveAs(file, name);
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop && isPrecon ? 'secondary' : 'primary'}
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && (
        <Modal
          size="cardPlus"
          title={`Playtest Report - ${value.Name}`}
          handleClose={() => setShow(false)}
        >
          <FlexGapped className="max-sm:flex-col">
            <div className="flex flex-col gap-2 sm:gap-4">
              {!isMobile && (
                <>
                  {isPrecon ? (
                    <div className="w-[370px]">
                      <DeckCrypt deck={value.deck} noDisciplines />
                    </div>
                  ) : (
                    <CardImage card={value} onClick={() => setShow(false)} />
                  )}
                </>
              )}
              <ButtonIconed
                onClick={() => exportReports()}
                title="Save Reports"
                text="Save Reports"
                icon={<Download />}
              />
            </div>
            <PlaytestReportExport id={value.Id} isPrecon={isPrecon} />
          </FlexGapped>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportExportButton;
