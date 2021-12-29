import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import ArrowUp from 'assets/images/icons/arrow-up.svg';
import Dash from 'assets/images/icons/dash.svg';
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
} from 'components';

import { drawProbability } from 'utils';
import { useApp } from 'context';

function DiffLibraryTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
    deckCardChange,
  } = useApp();

  let resultTrClass;

  const [modalDraw, setModalDraw] = useState(undefined);

  const cardRows = props.cards.map((card) => {
    const handleClick = () => {
      props.handleModalCardOpen(card.c);
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      if (inventoryLibrary[card.c['Id']]) {
        inInventory = inventoryLibrary[card.c['Id']].q;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
        Object.keys(usedLibraryCards.soft[card.c['Id']]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
          }
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
        Object.keys(usedLibraryCards.hard[card.c['Id']]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
        });
      }
    }

    const qFrom = props.cardsFrom[card.c.Id] ? props.cardsFrom[card.c.Id].q : 0;
    const qTo = props.cardsTo[card.c.Id] ? props.cardsTo[card.c.Id].q : 0;

    const DiffStatus = () => {
      if (qFrom == qTo) {
        return '';
      } else if (qTo == 0) {
        return (
          <div className="red">
            <Dash viewBox="0 0 12 12" />
          </div>
        );
      } else if (qFrom > qTo) {
        return (
          <div className="red">
            <ArrowDown /> {qFrom - qTo}
          </div>
        );
      } else if (qFrom < qTo) {
        return (
          <div className="green">
            <ArrowUp /> {qTo - qFrom}
          </div>
        );
      }
    };

    return (
      <React.Fragment key={card.c['Id']}>
        <tr className={resultTrClass}>
          {props.isAuthor ? (
            <>
              {inventoryMode && decks ? (
                <OverlayTrigger
                  placement="right"
                  overlay={<UsedPopover cardid={card.c['Id']} />}
                >
                  <td className="quantity">
                    <DeckCardQuantity
                      cardid={card.c['Id']}
                      q={qFrom}
                      deckid={props.deckid}
                      cardChange={deckCardChange}
                      inInventory={inInventory}
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                      inventoryType={decks[props.deckid].inventory_type}
                    />
                  </td>
                </OverlayTrigger>
              ) : (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card.c['Id']}
                    q={qFrom}
                    deckid={props.deckid}
                    cardChange={deckCardChange}
                  />
                </td>
              )}
            </>
          ) : (
            <td className="quantity-no-buttons px-1">{qFrom ? qFrom : null}</td>
          )}
          <td className={`diff-status ${!isMobile && 'ps-1'}`}>
            <DiffStatus />
          </td>

          <ConditionalOverlayTrigger
            placement={props.placement}
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
          {props.showInfo && (
            <td className="prob px-1">
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card.c['Name'],
                      prob: (
                        <DeckDrawProbabilityText
                          N={props.libraryTotal}
                          n={7}
                          k={card.q}
                        />
                      ),
                    })
                  }
                >
                  {`${Math.floor(
                    drawProbability(1, props.libraryTotal, 7, card.q) * 100
                  )}%`}
                </div>
              ) : (
                <OverlayTooltip
                  placement="right"
                  text={
                    <DeckDrawProbabilityText
                      N={props.libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  }
                >
                  <div>{`${Math.floor(
                    drawProbability(1, props.libraryTotal, 7, card.q) * 100
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
      <table
        className={
          props.inAdvSelect
            ? 'adv-deck-table deck-library-table'
            : 'deck-library-table'
        }
      >
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
}

export default DiffLibraryTable;
