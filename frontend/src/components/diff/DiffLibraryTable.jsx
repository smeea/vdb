import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ConditionalTooltip,
  DiffQuantityDiff,
  Tooltip,
} from 'components';
import { isTrifle, drawProbability } from 'utils';
import { BURN_OPTION } from 'utils/constants';
import {
  useApp,
  deckStore,
  usedStore,
  inventoryStore,
  deckCardChange,
} from 'context';

const DiffLibraryTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  libraryTotal,
  handleModalCardOpen,
  inReview,
}) => {
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;

  const [modalDraw, setModalDraw] = useState(undefined);

  const cardRows = cards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(card.c);
      setShowFloatingButtons(false);
    };

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode && !inReview) {
      if (inventoryLibrary[card.c.Id]) {
        inInventory = inventoryLibrary[card.c.Id].q;
      }

      if (usedLibrary && usedLibrary.soft[card.c.Id]) {
        Object.keys(usedLibrary.soft[card.c.Id]).map((id) => {
          if (softUsedMax < usedLibrary.soft[card.c.Id][id]) {
            softUsedMax = usedLibrary.soft[card.c.Id][id];
          }
        });
      }

      if (usedLibrary && usedLibrary.hard[card.c.Id]) {
        Object.keys(usedLibrary.hard[card.c.Id]).map((id) => {
          hardUsedTotal += usedLibrary.hard[card.c.Id][id];
        });
      }
    }

    const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
    const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {isEditable ? (
            <>
              {inventoryMode && decks && !inReview ? (
                <Tooltip
                  placement="right"
                  overlay={<UsedPopover cardid={card.c.Id} />}
                >
                  <td className="quantity">
                    <DeckCardQuantity
                      card={card.c}
                      q={qFrom}
                      deckid={cardChange ? null : deckid}
                      cardChange={cardChange ?? deckCardChange}
                      inInventory={inInventory}
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                      inventoryType={decks[deckid].inventoryType}
                    />
                  </td>
                </Tooltip>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    card={card.c}
                    q={qFrom}
                    deckid={cardChange ? null : deckid}
                    cardChange={cardChange ?? deckCardChange}
                  />
                </td>
              )}
            </>
          ) : (
            <td className="quantity-no-buttons">{qFrom ? qFrom : null}</td>
          )}
          <td className={`w-[42px] min-w-[35px] text-lg ${!isMobile && ''}`}>
            <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
          </td>

          <ConditionalTooltip
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          </ConditionalTooltip>

          <td
            className={card.c['Blood Cost'] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
            {card.c.Discipline && card.c.Clan && '+'}
            {card.c.Discipline && (
              <ResultLibraryDisciplines value={card.c.Discipline} />
            )}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            {card.c[BURN_OPTION] && <ResultLibraryBurn />}
            {isTrifle(card.c) && <ResultLibraryTrifle />}
          </td>
          {showInfo && (
            <td className="text-blue w-9 text-right">
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={libraryTotal}
                          n={7}
                          k={card.q}
                        />
                      ),
                    })
                  }
                >
                  {`${Math.floor(
                    drawProbability(1, libraryTotal, 7, card.q) * 100
                  )}%`}
                </div>
              ) : (
                <Tooltip
                  placement="right"
                  text={
                    <DeckDrawProbabilityText
                      N={libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, libraryTotal, 7, card.q) * 100
                  )}%`}</div>
                </Tooltip>
              )}
            </td>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DiffLibraryTable;
