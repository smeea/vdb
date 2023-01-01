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
    <div className="space-y-2">
      <div className="flex items-center justify-between whitespace-nowrap ">
        <div className="flex items-center whitespace-nowrap">
          <ResultClanImage value={card.Clan} />
          <div className="name font-bold text-fgName  dark:text-fgNameDark">
            <ResultCryptName card={card} />
            {card.Adv[1] && (
              <ConditionalTooltip
                placement={placement}
                overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                disabled={isMobile}
              >
                <span
                  className="adv "
                  onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                >
                  [see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]
                </span>
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
      <hr className="border-1 border-neutral-500" />
      <div>
        <ResultLayoutTextText text={card['Card Text']} />
      </div>
      <hr className="border-1 border-neutral-500" />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity value={card.Capacity} />
      </div>
      <hr className="border-1 border-neutral-500" />
      <div>
        <b>Sets: </b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div>
        <b>Artist: </b>
        <div className="inline ">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <div>
          <b>Rulings:</b>
          <div className="text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </div>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr className="border-1 border-neutral-500" />
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
