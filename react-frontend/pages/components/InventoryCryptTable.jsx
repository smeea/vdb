import React, { useState, useEffect, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import InventoryCardQuantity from './InventoryCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptTitle from './ResultCryptTitle.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryCryptTable(props) {
  const { decks, usedCryptCards, inventoryCrypt, isMobile, isWide } =
    useContext(AppContext);

  let resultTrClass;

  const [modalCardIdx, setModalCardIdx] = useState(undefined);

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

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let softUsedMax = 0;
    let hardUsedTotal = 0;

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

    return (
      <React.Fragment key={card.c['Id']}>
        <tr className={resultTrClass}>
          <td className="quantity">
            {isMobile ? (
              <div>
                <InventoryCardQuantity
                  cardid={card.c['Id']}
                  q={card.q}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                />
              </div>
            ) : (
              <OverlayTrigger
                placement={props.placement ? props.placement : 'right'}
                overlay={<UsedPopover cardid={card.c.Id} />}
              >
                <div>
                  <InventoryCardQuantity
                    cardid={card.c['Id']}
                    q={card.q}
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                  />
                </div>
              </OverlayTrigger>
            )}
          </td>
          <td className="used">
            {isMobile ? (
              <>
                {softUsedMax > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pe-1">
                      <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                    </div>
                    {softUsedMax}
                  </div>
                )}
                {hardUsedTotal > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pe-1">
                      <PinAngleFill
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                      />
                    </div>
                    {hardUsedTotal}
                  </div>
                )}
              </>
            ) : (
              <OverlayTrigger
                placement={props.placement ? props.placement : 'right'}
                overlay={<UsedPopover cardid={card.c.Id} />}
              >
                <div>
                  {softUsedMax > 0 && (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="d-inline opacity-035 pe-1">
                        <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                      </div>
                      {softUsedMax}
                    </div>
                  )}
                  {hardUsedTotal > 0 && (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="d-inline opacity-035 pe-1">
                        <PinAngleFill
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                        />
                      </div>
                      {hardUsedTotal}
                    </div>
                  )}
                </div>
              </OverlayTrigger>
            )}
          </td>
          <td className="capacity" onClick={() => handleClick()}>
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          {!isMobile && (
            <td className="disciplines px-1" onClick={() => handleClick()}>
              <ResultCryptDisciplines value={card.c['Disciplines']} />
            </td>
          )}
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
            >
              <td className="name" onClick={() => handleClick()}>
                <ResultCryptName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          )}
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card.c['Title']} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultCryptClan value={card.c['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card.c['Group']} />
              </td>
            </>
          ) : (
            <>
              {isMobile ? (
                <td className="clan-group" onClick={() => handleClick()}>
                  <div>
                    <ResultCryptClan value={card.c['Clan']} />
                  </div>
                  <div className="d-flex small justify-content-end">
                    <b>
                      <ResultCryptTitle value={card.c['Title']} />
                    </b>
                    <ResultCryptGroup value={card.c['Group']} />
                  </div>
                </td>
              ) : (
                <>
                  <td className="title pe-2" onClick={() => handleClick()}>
                    <ResultCryptTitle value={card.c['Title']} />
                  </td>
                  <td className="clan-group" onClick={() => handleClick()}>
                    <div>
                      <ResultCryptClan value={card.c['Clan']} />
                    </div>
                    <div className="d-flex small justify-content-end">
                      <ResultCryptGroup value={card.c['Group']} />
                    </div>
                  </td>
                </>
              )}
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="inventory-crypt-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCardIdx !== undefined && (
        <ResultCryptModal
          card={props.cards[modalCardIdx].c}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          forceInventoryMode={true}
        />
      )}
    </>
  );
}

export default InventoryCryptTable;
