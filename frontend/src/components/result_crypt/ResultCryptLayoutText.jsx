import React from 'react';
import { useApp } from 'context';
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
}) => {
  const { inventoryMode, isMobile, cryptCardBase } = useApp();

  return (
    <>
      <div className="flex items-center justify-between whitespace-nowrap ">
        <div className="flex items-center whitespace-nowrap">
          <ResultClanImage value={card.Clan} />
          <div className="name  font-bold">
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
        <div>
          <ResultCryptGroup value={card.Group} />
        </div>
      </div>
      <hr />
      <div>
        <ResultLayoutTextText text={card['Card Text']} />
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity value={card.Capacity} />
      </div>
      <hr />
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
        <>
          <b>Rulings:</b>
          <div className="text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr />
          <div>
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={card.Id} />
        </>
      )}
    </>
  );
};

export default ResultCryptLayoutText;
