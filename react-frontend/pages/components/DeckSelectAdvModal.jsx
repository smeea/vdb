import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import Check from '../../assets/images/icons/check.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import OverlayTooltip from './OverlayTooltip.jsx';
import AppContext from '../../context/AppContext';

function DeckSelectAdvModal(props) {
  const { cryptCardBase, libraryCardBase, decks, setActiveDeck, isMobile } =
    useContext(AppContext);
  let resultTrClass;

  const handleOpen = (deckid) => {
    setActiveDeck({ src: 'my', deckid: deckid });
    props.handleClose();
  };

  const deckRows = Object.keys(decks).map((deckid, index) => {
    const [showCrypt, setShowCrypt] = useState(undefined);
    const [showLibrary, setShowLibrary] = useState(undefined);

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const crypt = Object.keys(decks[deckid].crypt).map((cardid) => {
      return <div key={cardid}>{cryptCardBase[cardid].Name}</div>;
    });

    const library = Object.keys(decks[deckid].library).map((cardid) => {
      return <div key={cardid}>{libraryCardBase[cardid].Name}</div>;
    });

    return (
      <React.Fragment key={deckid}>
        <tr className={resultTrClass}>
          <td>
            <Button
              className="quantity"
              variant="outline-secondary"
              onClick={() => handleOpen(deckid)}
            >
              <Check />
            </Button>
          </td>
          <td className="px-1">
            <div className="d-flex text-overflow px-1">
              {decks[deckid].name}
            </div>
          </td>
          <td className="px-1">
            <OverlayTooltip
              placement="right"
              onHover={() => setShowCrypt(true)}
              show={showCrypt}
              text={
                <DeckCrypt
                  deckid={deckid}
                  changeTimer={props.changeTimer}
                  cardChange={props.cardChange}
                  cards={decks[deckid].crypt}
                  isAuthor={true}
                />
              }
            >
              <div onClick={() => setShowCrypt(!showCrypt)}>Crypt</div>
            </OverlayTooltip>
          </td>
          <td className="px-1">
            <OverlayTooltip
              placement="right"
              onHover={() => setShowLibrary(true)}
              show={showLibrary}
              text={
                <DeckLibrary
                  deckid={deckid}
                  changeTimer={props.changeTimer}
                  cardChange={props.cardChange}
                  cards={decks[deckid].library}
                  isAuthor={true}
                />
              }
            >
              <div onClick={() => setShowLibrary(!showLibrary)}>Library</div>
            </OverlayTooltip>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      dialogClassName={!isMobile ? 'modal-deck-draw' : null}
    >
      <Modal.Body>
        <table className="decks-table">
          <tbody>{deckRows}</tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default DeckSelectAdvModal;
