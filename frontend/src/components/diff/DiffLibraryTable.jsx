import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  DiffQuantityDiff,
  Tooltip,
} from 'components';
import { drawProbability, getHardTotal, getSoftMax } from 'utils';
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

  const [modalDraw, setModalDraw] = useState();

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
    const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
    const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;

    const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
    const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

    return (
      <React.Fragment key={card.c.Id}>
        <tr
          className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
            idx % 2
              ? 'bg-bgThird dark:bg-bgThirdDark'
              : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          }`}
        >
          {isEditable || inReview ? (
            <>
              {inventoryMode && decks && !inReview ? (
                <td className="quantity">
                  <Tooltip
                    placement="right"
                    overlay={<UsedPopover cardid={card.c.Id} />}
                  >
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
                  </Tooltip>
                </td>
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

          <ResultLibraryTableRowCommon
            card={card.c}
            handleClick={handleClick}
            placement={placement}
            inDeck
          />
          {showInfo && (
            <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
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
                  overlay={
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
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
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
