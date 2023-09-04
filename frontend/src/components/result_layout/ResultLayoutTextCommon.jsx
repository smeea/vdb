import React from 'react';
import { useApp } from '@/context';
import {
  ResultLayoutTextInventory,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  ResultLayoutTextArtist,
  Hr,
} from '@/components';

const ResultLayoutTextCommon = ({
  handleClose,
  card,
  setImageSet,
  forceInventoryMode,
  inPopover,
}) => {
  const { inventoryMode } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <b>Sets:</b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div className="flex gap-2">
        <b>Artist:</b>
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
          <b>Rulings:</b>
          <ResultLayoutTextRulings rulings={card['Rulings']} />
        </div>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <Hr />
          <div className="flex flex-col gap-1">
            <b>Inventory:</b>
            <ResultLayoutTextInventory card={card} inPopover={inPopover} />
          </div>
        </>
      )}
    </div>
  );
};

export default ResultLayoutTextCommon;
