import React from 'react';
import { useApp } from '@/context';
import {
  ResultLayoutTextInventory,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  ResultLayoutTextArtist,
  PlaytestReportForm,
  PlaytestReportExportButton,
  Hr,
} from '@/components';

const ResultLayoutTextCommon = ({
  handleClose,
  card,
  setImageSet,
  forceInventoryMode,
  inPopover,
  setIsHotkeysDisabled,
}) => {
  const { isPlaytestAdmin, isPlaytester, inventoryMode } = useApp();
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Sets:
        </div>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div className="flex gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Artist:
        </div>
        <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
          <ResultLayoutTextArtist
            handleClose={handleClose}
            inCrypt={card.Id > 200000}
            artists={card['Artist']}
          />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <div className="space-y-1">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Rulings:
          </div>
          <ResultLayoutTextRulings rulings={card['Rulings']} />
        </div>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <Hr />
          <div className="flex flex-col gap-1">
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Inventory:
            </div>
            <ResultLayoutTextInventory card={card} inPopover={inPopover} />
          </div>
        </>
      )}
      {!inPopover && isPlaytester && isPlaytest && (
        <>
          <Hr />
          <PlaytestReportForm
            id={card.Id}
            setIsHotkeysDisabled={setIsHotkeysDisabled}
          />
          {isPlaytestAdmin && <PlaytestReportExportButton card={card} />}
        </>
      )}
    </div>
  );
};

export default ResultLayoutTextCommon;
