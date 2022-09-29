import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  OverlayTooltip,
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
  ConditionalOverlayTrigger,
  DiffQuantityDiff
} from 'components';
import { drawProbability } from 'utils';
import { useApp } from 'context';

const DiffLibraryTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isPublic,
  isAuthor,
  placement,
  showInfo,
  libraryTotal,
  handleModalCardOpen,
  inReview,
}) => {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
    deckCardChange,
    setShowFloatingButtons,
  } = useApp();

  const [modalDraw, setModalDraw] = useState(undefined);

  const cardRows = cards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(card.c);
      setShowFloatingButtons(false);
    };

    let DisciplineOrClan;
    if (card.c.Clan) {
      DisciplineOrClan = <ResultLibraryClan value={card.c.Clan} />;
    } else {
      DisciplineOrClan = <ResultLibraryDisciplines value={card.c.Discipline} />;
    }

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode && !inReview) {
      if (inventoryLibrary[card.c.Id]) {
        inInventory = inventoryLibrary[card.c.Id].q;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c.Id]) {
        Object.keys(usedLibraryCards.soft[card.c.Id]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c.Id][id]) {
            softUsedMax = usedLibraryCards.soft[card.c.Id][id];
          }
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c.Id]) {
        Object.keys(usedLibraryCards.hard[card.c.Id]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c.Id][id];
        });
      }
    }

    const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
    const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {isAuthor && !isPublic ? (
            <>
              {inventoryMode && decks && !inReview ? (
                <OverlayTrigger
                  placement="right"
                  overlay={<UsedPopover cardid={card.c.Id} />}
                >
                  <td className="quantity">
                    <DeckCardQuantity
                      cardid={card.c.Id}
                      q={qFrom}
                      deckid={cardChange ? null : deckid}
                      cardChange={cardChange ? cardChange : deckCardChange}
                      inInventory={inInventory}
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                      inventoryType={decks[deckid].inventory_type}
                    />
                  </td>
                </OverlayTrigger>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c.Id}
                    q={qFrom}
                    deckid={cardChange ? null : deckid}
                    cardChange={cardChange ? cardChange : deckCardChange}
                  />
                </td>
              )}
            </>
          ) : (
            <td className="quantity-no-buttons px-1">{qFrom ? qFrom : null}</td>
          )}
          <td className={`diff-status ${!isMobile && 'ps-1'}`}>
            <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
          </td>

          <ConditionalOverlayTrigger
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          <td
            className={card.c['Blood Cost'] ? 'cost blood' : 'cost'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle
              value={nativeLibrary[card.c.Id]['Card Text']}
            />
          </td>
          {showInfo && (
            <td className="prob px-1">
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
                <OverlayTooltip
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
                </OverlayTooltip>
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
