import React, { useState } from 'react';
import {
  CardPopover,
  UsedPopover,
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryClan,
  ResultLibraryModal,
  ConditionalOverlayTrigger,
} from 'components';
import { useApp } from 'context';

function TwdResultLibraryKeyCards(props) {
  const { inventoryLibrary, usedLibraryCards, inventoryMode, isMobile } =
    useApp();

  const [modalCardIdx, setModalCardIdx] = useState(undefined);

  const handleModalCardChange = (d) => {
    const maxIdx = keyCards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  let libraryTotal = 0;
  const libraryByType = {};

  Object.keys(props.library).map((card) => {
    libraryTotal += props.library[card].q;
    const cardtype = props.library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }

    libraryByType[cardtype].push(props.library[card]);
  });

  const keyCards = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByType[cardtype]
        .filter((card) => {
          return card.q >= 4;
        })
        .map((card) => {
          keyCards.push(card);
        });
    }
  }

  let resultTrClass = 'result-even';

  keyCards.sort((a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
  });

  const cardRows = keyCards.map((card, index) => {
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

    return (
      <tr key={card.c['Id']} className={resultTrClass}>
        {inventoryMode ? (
          <ConditionalOverlayTrigger
            placement="right"
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
        <td className="type" onClick={() => handleClick()}>
          <ResultLibraryTypeImage value={card.c['Type']} />
        </td>

        <ConditionalOverlayTrigger
          placement={props.placement ? props.placement : 'right'}
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultLibraryName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>

        {!isMobile && (
          <td className="disciplines" onClick={() => handleClick()}>
            <ResultLibraryDisciplines value={card.c['Discipline']} />
            <ResultLibraryClan value={card.c['Clan']} />
          </td>
        )}
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>{isMobile && `Library [${libraryTotal}],`} Key Cards</b>
      </div>
      <div className="props.library">
        <table className="twd-library-table">
          <tbody>{cardRows}</tbody>
        </table>
      </div>
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={keyCards[modalCardIdx].c}
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

export default TwdResultLibraryKeyCards;
