import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function ResultCryptTable(props) {
  let resultTrClass;

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const handleModalCardChange = (d) => {
    const maxIdx = props.resultCards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardRows = props.resultCards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      props.isMobile && props.setShowFloatingButtons(false);
      setModalInventory({
        inInventory: inInventory,
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
        usedDescription: {
          soft: SoftUsedDescription,
          hard: HardUsedDescription,
        },
      });
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let inDeck;
    if (props.crypt) {
      Object.keys(props.crypt).map((i, index) => {
        if (i == card['Id']) {
          inDeck = props.crypt[i].q;
        }
      });
    }

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (props.inventoryMode) {
      if (Object.keys(props.inventoryCrypt).includes(card['Id'].toString())) {
        inInventory = props.inventoryCrypt[card['Id']].q;
      } else {
        inInventory = 0;
      }

      if (props.usedCards && props.usedCards.soft[card['Id']]) {
        SoftUsedDescription = Object.keys(props.usedCards.soft[card['Id']]).map(
          (id, index) => {
            if (softUsedMax < props.usedCards.soft[card['Id']][id]) {
              softUsedMax = props.usedCards.soft[card['Id']][id];
            }
            return (
              <UsedDescription
                key={index}
                q={props.usedCards.soft[card['Id']][id]}
                deckName={props.decks[id]['name']}
                t="s"
              />
            );
          }
        );
      }

      if (props.usedCards && props.usedCards.hard[card['Id']]) {
        HardUsedDescription = Object.keys(props.usedCards.hard[card['Id']]).map(
          (id, index) => {
            hardUsedTotal += props.usedCards.hard[card['Id']][id];
            return (
              <UsedDescription
                key={index}
                q={props.usedCards.hard[card['Id']][id]}
                deckName={props.decks[id]['name']}
                t="h"
              />
            );
          }
        );
      }
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.addMode && (
            <td className="quantity-add pr-1">
              <ResultAddCard
                cardAdd={props.cardAdd}
                cardChange={props.cardChange}
                cardid={card['Id']}
                deckid={props.activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {props.inventoryMode && (
            <>
              <OverlayTrigger
                placement="left"
                overlay={
                  <UsedPopover
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                    inInventory={inInventory}
                    SoftUsedDescription={SoftUsedDescription}
                    HardUsedDescription={HardUsedDescription}
                  />
                }
              >
                <td className="quantity">
                  <div
                    className={
                      inInventory < softUsedMax + hardUsedTotal
                        ? 'd-flex align-items-center justify-content-center quantity px-1 ml-1 inv-miss-full'
                        : 'd-flex align-items-center justify-content-center quantity px-1 ml-1'
                    }
                  >
                    {inInventory > 0 && (
                      <>
                        <div className="pr-1 opacity-035">
                          <ArchiveFill
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                          />
                        </div>
                        {inInventory}
                      </>
                    )}
                  </div>
                </td>
              </OverlayTrigger>
            </>
          )}
          <td
            className={props.isMobile ? 'capacity px-1' : 'capacity px-2'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            <ResultCryptDisciplines
              value={card['Disciplines']}
              isMobile={props.isMobile}
            />
          </td>
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} showImage={props.showImage} />}
            >
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultCryptName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultCryptName card={card} />
            </td>
          )}
          {props.isMobile || !props.isWide ? (
            <td className="clan-group" onClick={() => handleClick()}>
              <ResultCryptClan value={card['Clan']} />
              <div className="d-flex small justify-content-end">
                <ResultCryptGroup value={card['Group']} />
              </div>
            </td>
          ) : (
            <>
              <td className="clan" onClick={() => handleClick()}>
                <ResultCryptClan value={card['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card['Group']} />
              </td>
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={props.className}>
        <tbody>{cardRows}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultCryptModal
          card={props.resultCards[modalCardIdx]}
          handleModalCardChange={handleModalCardChange}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCardIdx(undefined);
            props.isMobile && props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={props.inventoryMode}
        />
      )}
    </>
  );
}

export default ResultCryptTable;
