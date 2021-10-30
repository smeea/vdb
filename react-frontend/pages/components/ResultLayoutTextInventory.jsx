import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';
import UsedDescription from './UsedDescription.jsx';
import AppContext from '../../context/AppContext';

const ResultLayoutTextInventory = (props) => {
  const {
    isMobile,
    decks,
    usedCryptCards,
    usedLibraryCards,
    inventoryCrypt,
    inventoryLibrary,
  } = useContext(AppContext);

  let softUsedMax = 0;
  let hardUsedTotal = 0;
  let SoftUsedDescription;
  let HardUsedDescription;
  let usedCards = null;

  let inInventory = 0;
  if (props.cardid > 200000) {
    if (inventoryCrypt[props.cardid]) {
      inInventory = inventoryCrypt[props.cardid].q;
    }
    usedCards = usedCryptCards;
  } else {
    if (inventoryLibrary[props.cardid]) {
      inInventory = inventoryLibrary[props.cardid].q;
    }
    usedCards = usedLibraryCards;
  }

  if (usedCards && usedCards.soft[props.cardid]) {
    SoftUsedDescription = Object.keys(usedCards.soft[props.cardid]).map(
      (id) => {
        if (softUsedMax < usedCards.soft[props.cardid][id]) {
          softUsedMax = usedCards.soft[props.cardid][id];
        }
        return (
          <UsedDescription
            key={id}
            q={usedCards.soft[props.cardid][id]}
            deckName={decks[id]['name']}
            t="s"
          />
        );
      }
    );
  }

  if (usedCards && usedCards.hard[props.cardid]) {
    HardUsedDescription = Object.keys(usedCards.hard[props.cardid]).map(
      (id) => {
        hardUsedTotal += usedCards.hard[props.cardid][id];
        return (
          <UsedDescription
            key={id}
            q={usedCards.soft[props.cardid][id]}
            q={usedCards.hard[props.cardid][id]}
            deckName={decks[id]['name']}
            t="h"
          />
        );
      }
    );
  }

  return (
    <Row>
      <Col xs={6} lg={5} className="pe-2">
        <div className="d-flex align-items-center">
          <div className="opacity-035">
            <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
          </div>
          <div className="px-1">
            <b>{softUsedMax + hardUsedTotal}</b>
          </div>
          - Total Used
        </div>
        <div className="d-flex align-items-center">
          <div className="opacity-035">
            <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
          </div>
          <div className="px-1">
            <b>{inInventory}</b>
          </div>
          - In Inventory
        </div>
      </Col>
      <Col xs={12} lg={7} className={isMobile ? 'pt-2' : 'ps-0'}>
        {SoftUsedDescription && <>{SoftUsedDescription}</>}
        {HardUsedDescription && <>{HardUsedDescription}</>}
      </Col>
    </Row>
  );
};

export default ResultLayoutTextInventory;
