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
  Hr,
} from '@/components';
import { useApp } from '@/context';
import { playtestServices } from '@/services';

const PlaytestReportExportAllButton = () => {
  const { isMobile, preconDecks, cryptCardBase, libraryCardBase } = useApp();
  const [show, setShow] = useState();

  const playtestCrypt = Object.values(cryptCardBase).filter((i) => {
    return i.Id > 210000;
  });
  const playtestLibrary = Object.values(libraryCardBase).filter((i) => {
    return i.Id > 110000;
  });
  const playtestPrecons = Object.values(preconDecks).filter((i) => {
    return i.deckid.includes('PLAYTEST:');
  });

  const exportReports = async (isPrecon) => {
    const result = await playtestServices.getReports({ Id: 'all' }, isPrecon);

    let exportText = '';
    Object.keys(result).forEach((id, idx) => {
      const name = isPrecon
        ? preconDecks[`PLAYTEST:${id}`].name
        : id > 200000
        ? cryptCardBase[id].Name
        : libraryCardBase[id].Name;

      exportText += `${
        isPrecon ? 'Precon' : id > 200000 ? 'Crypt' : 'Library'
      }: ${name}\n\n`;
      Object.keys(result[id]).forEach((user, uIdx) => {
        exportText += `User: <${user}>\n`;
        exportText += `Score: ${result[id][user].score}\n`;
        exportText += `${result[id][user].text}\n`;
        if (uIdx + 1 < Object.keys(result[id]).length) {
          exportText += '\n-----\n\n';
        }
      });
      if (idx + 1 < Object.keys(result).length) {
        exportText += '\n=====\n\n';
      }
    });

    const file = new File(
      [exportText],
      `Reports - ${isPrecon ? 'Precons' : 'Cards'}.txt`,
      {
        type: 'text/plain;charset=utf-8',
      }
    );

    let { saveAs } = await import('file-saver');
    saveAs(file, name);
  };

  return (
    <>
      <ButtonIconed
        className="w-full"
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && (
        <Modal
          size="card"
          title="Playtest Reports"
          handleClose={() => setShow(false)}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex justify-between gap-3 sm:gap-4">
              <ButtonIconed
                className="w-full"
                onClick={() => exportReports(true)}
                title="Save Reports - Precons"
                text="Save Reports - Precons"
                icon={<Download />}
              />
              <ButtonIconed
                className="w-full"
                onClick={() => exportReports()}
                title="Save Reports - Cards"
                text="Save Reports - Cards"
                icon={<Download />}
              />
            </div>
            {[...playtestCrypt, ...playtestLibrary, ...playtestPrecons].map(
              (i, idx) => {
                const playtestPrecon =
                  i.deckid &&
                  i.deckid.includes('PLAYTEST:') &&
                  i.deckid.replace('PLAYTEST:', '');
                const id = playtestPrecon ?? i.Id;

                return (
                  <React.Fragment key={id}>
                    <FlexGapped className="max-sm:flex-col">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {!isMobile && (
                          <>
                            {playtestPrecon ? (
                              <div className="flex flex-col w-[358px] gap-1">
                                <div className="flex text-fgSecondary dark:text-fgSecondaryDark font-bold">
                                  {i.name}
                                </div>
                                <DeckCrypt deck={i} noDisciplines />
                              </div>
                            ) : (
                              <CardImage
                                card={i}
                                onClick={() => setShow(false)}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <PlaytestReportExport
                        id={id}
                        isPrecon={!!playtestPrecon}
                      />
                    </FlexGapped>
                    {idx + 1 <
                      playtestCrypt.length +
                        playtestLibrary.length +
                        playtestPrecons.length && <Hr isThick />}
                  </React.Fragment>
                );
              }
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PlaytestReportExportAllButton;
