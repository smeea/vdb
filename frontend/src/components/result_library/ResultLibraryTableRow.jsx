import React from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  UsedPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  ConditionalOverlayTrigger,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';
import { getHardTotal, getSoftMax } from 'utils';
import {
  useApp,
  deckStore,
  inventoryStore,
  usedStore,
  deckCardChange,
} from 'context';

const ResultLibraryTableRow = ({ card, handleClick, idx, placement }) => {
  const { addMode, inventoryMode, isMobile, isDesktop } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const inDeck = deck?.library[card.Id]?.q || 0;

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (addMode && inDeck > 0) {
        deckCardChange(deck.deckid, card, inDeck - 1);
      }
    },
    onSwipedLeft: () => {
      if (addMode) {
        deckCardChange(deck.deckid, card, inDeck + 1);
      }
    },
  });

  let softUsedMax = 0;
  let hardUsedTotal = 0;
  let inInventory = 0;
  if (inventoryMode) {
    if (inventoryLibrary[card.Id]) {
      inInventory = inventoryLibrary[card.Id].q;
    }
    softUsedMax = getSoftMax(usedLibrary.soft[card.Id]);
    hardUsedTotal = getHardTotal(usedLibrary.hard[card.Id]);
  }

  return (
    <tr {...swipeHandlers} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
      {deck?.isAuthor && addMode && (
        <td className="quantity-add pe-1">
          <ButtonAddCard deckid={deck.deckid} card={card} inDeck={inDeck} />
        </td>
      )}
      {inventoryMode && (
        <OverlayTrigger
          placement={isDesktop ? 'left' : 'bottom'}
          overlay={<UsedPopover cardid={card.Id} />}
        >
          <td className="used">
            {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
              <div
                className={`d-flex align-items-center justify-content-between used px-1 ms-1 ${
                  inInventory < softUsedMax + hardUsedTotal
                    ? 'inv-miss-full'
                    : ''
                }
                  `}
              >
                {inInventory}
                <div
                  className={`small ${
                    inInventory >= softUsedMax + hardUsedTotal
                      ? 'gray'
                      : 'white'
                  } ps-1`}
                >
                  {inInventory >= softUsedMax + hardUsedTotal
                    ? `+${inInventory - softUsedMax - hardUsedTotal}`
                    : inInventory - softUsedMax - hardUsedTotal}
                </div>
              </div>
            )}
          </td>
        </OverlayTrigger>
      )}
      <td
        className={card[BLOOD_COST] ? 'cost blood px-1' : 'cost px-1'}
        onClick={() => handleClick(idx)}
      >
        <ResultLibraryCost
          valueBlood={card[BLOOD_COST]}
          valuePool={card[POOL_COST]}
        />
      </td>
      <td className="type px-1" onClick={() => handleClick(idx)}>
        <ResultLibraryTypeImage value={card.Type} />
      </td>
      <td className="disciplines px-1" onClick={() => handleClick(idx)}>
        <ResultLibraryClan value={card.Clan} />
        {card.Discipline && card.Clan && '+'}
        <ResultLibraryDisciplines value={card.Discipline} />
      </td>
      <ConditionalOverlayTrigger
        placement={placement}
        overlay={<CardPopover card={card} />}
        disabled={isMobile}
      >
        <td className="name px-1" onClick={() => handleClick(idx)}>
          <ResultLibraryName card={card} />
        </td>
      </ConditionalOverlayTrigger>
      <td className="burn px-1" onClick={() => handleClick(idx)}>
        <ResultLibraryBurn value={card[BURN_OPTION]} />
        <ResultLibraryTrifle card={card} />
      </td>
    </tr>
  );
};

export default ResultLibraryTableRow;
