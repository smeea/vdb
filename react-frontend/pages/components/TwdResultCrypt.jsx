import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function TwdResultCrypt(props) {
  let resultTrClass = 'result-even';

  const [modalCardIdx, setModalCardIdx] = useState(undefined);

  const handleModalCardChange = (d) => {
    const maxIdx = sortedCards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.crypt).map((card, index) => {
    if (props.crypt[card].c['Group'] == 'ANY') {
      return;
    }
    if (
      props.crypt[card].c['Group'] < cryptGroupMin ||
      cryptGroupMin == undefined
    ) {
      cryptGroupMin = props.crypt[card].c['Group'];
    }

    if (
      props.crypt[card].c['Group'] > cryptGroupMax ||
      cryptGroupMax == undefined
    ) {
      cryptGroupMax = props.crypt[card].c['Group'];
    }
  });

  let cryptTotal = 0;
  for (const card in props.crypt) {
    if (card) {
      cryptTotal += props.crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantityCapacity = (a, b) => {
    if (a.q > b.q) {
      return -1;
    } else if (a.q == b.q) {
      if (a.c['Capacity'] > b.c['Capacity']) return -1;
      else return 1;
    } else {
      return 1;
    }
  };

  const sortedCards = Object.values(props.crypt).sort(SortByQuantityCapacity);

  const cardLines = sortedCards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      props.isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (props.inventoryMode) {
      if (Object.keys(props.inventoryCrypt).includes(card.c['Id'].toString())) {
        inInventory = props.inventoryCrypt[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (props.usedCards && props.usedCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          props.usedCards.soft[card.c['Id']]
        ).map((id, index) => {
          if (softUsedMax < props.usedCards.soft[card.c['Id']][id]) {
            softUsedMax = props.usedCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.soft[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        });
      }

      if (props.usedCards && props.usedCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          props.usedCards.hard[card.c['Id']]
        ).map((id, index) => {
          hardUsedTotal += props.usedCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.hard[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        });
      }
    }

    return (
      <tr key={index} className={resultTrClass}>
        {props.inventoryMode ? (
          <OverlayTrigger
            placement="right"
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
            <td className="quantity-no-buttons px-1">
              <div
                className={
                  inInventory < card.q
                    ? 'quantity px-1 mx-1 bg-red'
                    : inInventory - hardUsedTotal < card.q
                    ? 'quantity px-1 mx-1 bg-yellow'
                    : 'quantity px-1'
                }
              >
                {card.q}
              </div>
            </td>
          </OverlayTrigger>
        ) : (
          <td className="quantity-no-buttons px-1">{card.q}</td>
        )}
        <td className="capacity px-1" onClick={() => handleClick()}>
          <ResultCryptCapacity value={card.c['Capacity']} />
        </td>
        {!props.isMobile ? (
          <OverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card.c} showImage={props.showImage} />}
          >
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </OverlayTrigger>
        ) : (
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultCryptName card={card.c} />
          </td>
        )}
        <td className="clan px-1" onClick={() => handleClick()}>
          <ResultCryptClan value={card.c['Clan']} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
        </b>
      </div>
      <table className="twd-crypt-table">
        <tbody>{cardLines}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultCryptModal
          card={sortedCards[modalCardIdx].c}
          handleModalCardChange={handleModalCardChange}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCardIdx(undefined);
            props.isMobile && props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default TwdResultCrypt;
