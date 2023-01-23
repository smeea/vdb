import React from 'react';
import { useApp } from 'context';
import X from 'assets/images/icons/x.svg';
import {
  CardPopover,
  ResultCryptName,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptGroup,
  ResultCryptDisciplines,
  ResultLayoutTextInventory,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  ResultLayoutTextArtist,
  ResultLayoutTextText,
  ConditionalTooltip,
  Hr,
} from 'components';

const ResultCryptLayoutText = ({
  card,
  placement,
  setCard,
  setImageSet,
  forceInventoryMode,
  handleClose,
  noClose,
}) => {
  const { inventoryMode, isMobile, cryptCardBase } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center whitespace-nowrap space-x-2">
          <ResultClanImage value={card.Clan} />
          <div className="font-bold text-fgName dark:text-fgNameDark">
            <ResultCryptName card={card} />
            {card.Adv[1] && (
              <ConditionalTooltip
                placement={placement}
                overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                disabled={isMobile}
              >
                <div
                  className="inline text-fgSecondary dark:text-fgSecondaryDark"
                  onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                >
                  [see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]
                </div>
              </ConditionalTooltip>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ResultCryptGroup value={card.Group} />
          {!noClose && (
            <button
              onClick={handleClose}
              className="relative before:absolute before:inset-[-6px] before:content-['']"
            >
              <X width="32" height="32" viewBox="0 0 16 16" />
            </button>
          )}
        </div>
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <Hr />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity value={card.Capacity} />
      </div>
      <Hr />
      <div className="space-x-2">
        <b>Sets:</b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div className="space-x-2">
        <b>Artist:</b>
        <div className="inline">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <div className="space-y-1">
          <b>Rulings:</b>
          <div className="text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </div>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <Hr />
          <div>
            <b>Inventory:</b>
            <ResultLayoutTextInventory cardid={card.Id} />
          </div>
        </>
      )}
    </div>
  );
};

export default ResultCryptLayoutText;
