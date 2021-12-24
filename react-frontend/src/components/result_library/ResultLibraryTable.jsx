import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  UsedPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryModal,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
} from 'components';
import { useApp } from 'context';

function ResultLibraryTable(props) {
  const {
    activeDeck,
    inventoryLibrary,
    usedLibraryCards,
    addMode,
    inventoryMode,
    nativeLibrary,
    isMobile,
  } = useApp();

  const [modalCardIdx, setModalCardIdx] = useState(undefined);

  let resultTrClass;

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
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const inDeck =
      (props.library &&
        props.library[card['Id']] &&
        props.library[card['Id']].q) ||
      0;

    let softUsedMax = 0;
    let hardUsedTotal = 0;

    let inInventory = 0;

    if (inventoryMode) {
      if (inventoryLibrary[card['Id']]) {
        inInventory = inventoryLibrary[card['Id']].q;
      }

      if (usedLibraryCards.soft[card['Id']]) {
        Object.keys(usedLibraryCards.soft[card['Id']]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card['Id']][id];
          }
        });
      }

      if (usedLibraryCards.hard[card['Id']]) {
        Object.keys(usedLibraryCards.hard[card['Id']]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card['Id']][id];
        });
      }
    }

    return (
      <React.Fragment key={card['Id']}>
        <tr className={resultTrClass}>
          {activeDeck.deckid && addMode && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card['Id']}
                deckid={props.activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {inventoryMode && (
            <OverlayTrigger
              placement="left"
              overlay={<UsedPopover cardid={card['Id']} />}
            >
              <td className="used">
                {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
                  <div
                    className={`d-flex align-items-center justify-content-between used px-1 ms-1 ${
                      inInventory < softUsedMax + hardUsedTotal
                        ? 'inv-miss-full'
                        : ''
                    }
                  `}
                  >
                    {inInventory}
                    <div
                      className={`small ${
                        inInventory >= softUsedMax + hardUsedTotal
                          ? 'gray'
                          : 'white'
                      } ps-1`}
                    >
                      {inInventory >= softUsedMax + hardUsedTotal
                        ? `+${inInventory - softUsedMax - hardUsedTotal}`
                        : inInventory - softUsedMax - hardUsedTotal}
                    </div>
                  </div>
                )}
              </td>
            </OverlayTrigger>
          )}
          <td
            className={card['Blood Cost'] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick()}>
            <ResultLibraryTypeImage value={card['Type']} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryClan value={card['Clan']} />
            {card['Discipline'] && card['Clan'] && '+'}
            <ResultLibraryDisciplines value={card['Discipline']} />
          </td>
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} />}
            >
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultLibraryName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          )}
          <td className="burn px-1" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="search-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={props.resultCards[modalCardIdx]}
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

export default ResultLibraryTable;
