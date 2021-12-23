import React, { useState } from 'react';
import {
  CardPopover,
  UsedPopover,
  ResultCryptName,
  ResultCryptCapacity,
  ResultClanImage,
  ResultCryptModal,
  ConditionalOverlayTrigger,
} from 'components';
import { useApp } from 'context';

function TwdResultCrypt(props) {
  const { inventoryMode, inventoryCrypt, usedCryptCards, isMobile } = useApp();

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
  let hasBanned = false;

  Object.keys(props.crypt).map((card) => {
    if (props.crypt[card].c['Banned']) {
      hasBanned = true;
    }
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
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (inventoryMode) {
      if (inventoryCrypt[card.c['Id']]) {
        inInventory = inventoryCrypt[card.c['Id']].q;
      }

      if (usedCryptCards && usedCryptCards.soft[card.c['Id']]) {
        Object.keys(usedCryptCards.soft[card.c['Id']]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card.c['Id']][id]) {
            softUsedMax = usedCryptCards.soft[card.c['Id']][id];
          }
        });
      }

      if (usedCryptCards && usedCryptCards.hard[card.c['Id']]) {
        Object.keys(usedCryptCards.hard[card.c['Id']]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card.c['Id']][id];
        });
      }
    }

    return (
      <tr key={card.c['Id']} className={resultTrClass}>
        {inventoryMode ? (
          <ConditionalOverlayTrigger
            overlay={<UsedPopover cardid={card.c['Id']} />}
            disabled={isMobile}
          >
            <td className="quantity-no-buttons px-1">
              <div
                className={
                  inInventory < card.q
                    ? 'inv-miss-full'
                    : inInventory - hardUsedTotal < card.q
                    ? 'inv-miss-part'
                    : null
                }
              >
                {card.q}
              </div>
            </td>
          </ConditionalOverlayTrigger>
        ) : (
          <td className="quantity-no-buttons px-1">{card.q}</td>
        )}
        <td className="capacity px-1" onClick={() => handleClick()}>
          <ResultCryptCapacity value={card.c['Capacity']} />
        </td>

        <ConditionalOverlayTrigger
          placement={props.placement}
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultCryptName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>

        <td className="clan px-1" onClick={() => handleClick()}>
          <ResultClanImage value={card.c['Clan']} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
          {hasBanned && ' - WITH BANNED'}
        </b>
      </div>
      <table className="twd-crypt-table">
        <tbody>{cardLines}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultCryptModal
          card={sortedCards[modalCardIdx].c}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
        />
      )}
    </>
  );
}

export default TwdResultCrypt;
