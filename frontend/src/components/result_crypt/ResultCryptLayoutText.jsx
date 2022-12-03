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
  ConditionalOverlayTrigger,
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
      <div className="flex whitespace-nowrap justify-between items-center pb-1">
        <div className="flex whitespace-nowrap items-center">
          <ResultClanImage value={card.Clan} />
          <div className="name font-bold ps-2">
            <ResultCryptName card={card} />
            {card.Adv[1] && (
              <ConditionalOverlayTrigger
                placement={placement}
                overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                disabled={isMobile}
              >
                <span
                  className="adv ps-2"
                  onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                >
                  [see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]
                </span>
              </ConditionalOverlayTrigger>
            )}
          </div>
        </div>
        <div className="ps-1">
          <ResultCryptGroup value={card.Group} />
        </div>
      </div>
      <hr className="mx-0" />
      <div className="py-2">
        <ResultLayoutTextText text={card['Card Text']} />
      </div>
      <hr className="mx-0" />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity value={card.Capacity} />
      </div>
      <hr className="mx-0" />
      <div className="py-1">
        <b>Sets: </b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div className="py-1">
        <b>Artist: </b>
        <div className="d-inline px-1">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings:</b>
          </div>
          <div className="text-xs pb-1">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr className="mx-0" />
          <div className="py-1">
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={card.Id} />
        </>
      )}
    </>
  );
};

export default ResultCryptLayoutText;
