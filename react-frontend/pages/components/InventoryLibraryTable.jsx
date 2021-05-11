import React, { useState, useContext, useMemo } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import InventoryCardQuantity from './InventoryCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryLibraryTable(props) {
  const { usedLibraryCards, nativeLibrary, isMobile } = useContext(AppContext);
  let resultTrClass;

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const handleModalCardChange = (d) => {
    const maxIdx = props.cards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardRows = useMemo(() =>
    props.cards.map((card, index) => {
      const handleClick = () => {
        setModalCardIdx(index);
        isMobile && props.setShowFloatingButtons(false);
        setModalInventory({
          inInventory: card.q,
          usedDescription: {
            soft: SoftUsedDescription,
            hard: HardUsedDescription,
          },
          softUsedMax: softUsedMax,
          hardUsedTotal: hardUsedTotal,
        });
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

      let softUsedMax = 0;
      let hardUsedTotal = 0;
      let SoftUsedDescription;
      let HardUsedDescription;

      if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          usedLibraryCards.soft[card.c['Id']]
        ).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={card.c['Id']}
              q={usedLibraryCards.soft[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          usedLibraryCards.hard[card.c['Id']]
        ).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={card.c['Id']}
              q={usedLibraryCards.hard[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
              t="h"
            />
          );
        });
      }

      return (
        <React.Fragment key={card.c['Id']}>
          <tr className={resultTrClass}>
            <td className="quantity">
              {isMobile ? (
                <div>
                  <InventoryCardQuantity
                    cardid={card.c['Id']}
                    q={card.q}
                    cardChange={props.cardChange}
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                  />
                </div>
              ) : (
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <UsedPopover
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                      inInventory={card.q}
                      SoftUsedDescription={SoftUsedDescription}
                      HardUsedDescription={HardUsedDescription}
                    />
                  }
                >
                  <div>
                    <InventoryCardQuantity
                      cardid={card.c['Id']}
                      q={card.q}
                      cardChange={props.cardChange}
                      softUsedMax={softUsedMax}
                      hardUsedTotal={hardUsedTotal}
                    />
                  </div>
                </OverlayTrigger>
              )}
            </td>
            <td className="used">
              {softUsedMax > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pr-1">
                    <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {softUsedMax}
                </div>
              )}
              {hardUsedTotal > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pr-1">
                    <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {hardUsedTotal}
                </div>
              )}
            </td>
            {!isMobile ? (
              <OverlayTrigger
                placement={props.placement ? props.placement : 'right'}
                overlay={<CardPopover card={card.c} />}
              >
                <td className="name px-1" onClick={() => handleClick()}>
                  <ResultLibraryName card={card.c} />
                </td>
              </OverlayTrigger>
            ) : (
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultLibraryName card={card.c} />
              </td>
            )}
            <td className="cost" onClick={() => handleClick()}>
              <ResultLibraryCost
                valueBlood={card.c['Blood Cost']}
                valuePool={card.c['Pool Cost']}
              />
            </td>
            <td className="disciplines" onClick={() => handleClick()}>
              {DisciplineOrClan}
            </td>
            <td className="burn" onClick={() => handleClick()}>
              <ResultLibraryBurn value={card.c['Burn Option']} />
              <ResultLibraryTrifle
                value={nativeLibrary[card.c.Id]['Card Text']}
              />
            </td>
          </tr>
        </React.Fragment>
      );
    })
  );

  return (
    <>
      <table className="inventory-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={props.cards[modalCardIdx].c}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          inventoryState={modalInventory}
        />
      )}
    </>
  );
}

export default InventoryLibraryTable;
