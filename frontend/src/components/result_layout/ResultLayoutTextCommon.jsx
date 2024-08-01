import React from 'react';
import { useApp } from '@/context';
import {
  ResultLayoutTextInventory,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  ResultLayoutTextArtist,
  PlaytestReportForm,
  Hr,
} from '@/components';

const ResultLayoutTextCommon = ({
  handleClose,
  card,
  forceInventoryMode,
  inPopover,
  setIsHotkeysDisabled,
}) => {
  const { isPlaytester, inventoryMode } = useApp();
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Sets:</div>
        <ResultLayoutTextSets card={card} />
      </div>
      <div className="flex gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Artist:</div>
        <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
          <ResultLayoutTextArtist
            handleClose={handleClose}
            inCrypt={card.Id > 200000}
            artists={card['Artist']}
          />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Rulings:</div>
          <ResultLayoutTextRulings rulings={card['Rulings']} />
        </div>
      )}
      {!isPlaytest && (forceInventoryMode || inventoryMode) && (
        <>
          <Hr />
          <div className="flex flex-col gap-1">
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Inventory:</div>
            <ResultLayoutTextInventory card={card} inPopover={inPopover} />
          </div>
        </>
      )}
      {!inPopover && isPlaytester && isPlaytest && (
        <>
          <Hr />
          <PlaytestReportForm id={card.Id} setIsHotkeysDisabled={setIsHotkeysDisabled} />
        </>
      )}
    </div>
  );
};

export default ResultLayoutTextCommon;
