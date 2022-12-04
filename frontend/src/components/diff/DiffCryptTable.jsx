import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  DeckCryptDisciplines,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ResultCryptDisciplines,
  ResultCryptCapacity,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  Tooltip,
  ConditionalTooltip,
  DiffQuantityDiff,
} from 'components';
import { getSoftMax, getHardTotal, drawProbability } from 'utils';
import {
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
  deckCardChange,
} from 'context';

const DiffCryptTable = ({
  cardChange,
  deckid,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inReview,
}) => {
  const { inventoryMode, isMobile, isWide, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 20;
  const [modalDraw, setModalDraw] = useState(undefined);

  let maxDisciplines = 0;
  cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const cardRows = cards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(card.c);
      setShowFloatingButtons(false);
    };

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode && !inReview) {
      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      if (usedCrypt) {
        softUsedMax = getSoftMax(usedCrypt.soft[card.Id]);
        hardUsedTotal = getHardTotal(usedCrypt.hard[card.Id]);
      }
    }

    const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
    const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {isEditable ? (
            <>
              {!inReview && inventoryMode && decks ? (
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
            <td className="quantity-no-buttons px-1">{qFrom ? qFrom : null}</td>
          )}
          <td
            className={`min-w-[35px] w-[42px] text-lg ${!isMobile && 'ps-1'}`}
          >
            <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
          </td>
          <td
            className={isMobile ? 'capacity' : 'capacity pe-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
              <DeckCryptDisciplines
                value={card.c.Disciplines}
                disciplinesSet={disciplinesSet}
                keyDisciplines={keyDisciplines}
                nonKeyDisciplines={nonKeyDisciplines}
              />
            ) : (
              <ResultCryptDisciplines
                value={card.c.Disciplines}
                maxDisciplines={maxDisciplines}
              />
            )}
          </td>

          <ConditionalTooltip
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalTooltip>
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card.c.Title} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultClanImage value={card.c.Clan} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c.Group} />
              </td>
            </>
          ) : (
            <>
              <td className="clan-group" onClick={() => handleClick()}>
                <div>
                  <ResultClanImage value={card.c.Clan} />
                </div>
                <div className="flex text-xs justify-end">
                  <div className="font-bold text-blue">
                    <ResultCryptTitle value={card.c.Title} />
                  </div>
                  <ResultCryptGroup value={card.c.Group} />
                </div>
              </td>
            </>
          )}
          {showInfo && (
            <td className="text-blue text-right w-9 px-1">
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={cryptTotal}
                          n={4}
                          k={card.q}
                        />
                      ),
                    })
                  }
                >
                  {`${Math.floor(
                    drawProbability(1, cryptTotal, 4, card.q) * 100
                  )}%`}
                </div>
              ) : (
                <Tooltip
                  placement="right"
                  text={
                    <DeckDrawProbabilityText N={cryptTotal} n={4} k={card.q} />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, cryptTotal, 4, card.q) * 100
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
      <table className="deck-crypt-table">
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

export default DiffCryptTable;
