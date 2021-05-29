import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import Check from '../../assets/images/icons/check.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckTags from './DeckTags.jsx';
import DeckTotal from './DeckTotal.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckClone from './DeckClone.jsx';
import DeckProxy from './DeckProxy.jsx';
import DeckCopyUrlMutableButton from './DeckCopyUrlMutableButton.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import resultDecksSort from './resultDecksSort.js';
import OverlayTooltip from './OverlayTooltip.jsx';
import AppContext from '../../context/AppContext';

function DeckSelectAdvModal(props) {
  const { cryptCardBase, libraryCardBase, decks, setActiveDeck, isMobile } =
    useContext(AppContext);

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  let resultTrClass;

  const handleOpen = (deckid) => {
    setActiveDeck({ src: 'my', deckid: deckid });
    props.handleClose();
  };

  const allTags = new Set();
  Object.keys(decks).map((deckid) => {
    decks[deckid].tags.map((tag) => {
      allTags.add(tag);
    });
  });

  const defaultTagsOptions = [...allTags].map((tag) => ({
    label: tag,
    value: tag,
  }));

  useEffect(() => {
    if (Object.values(decks).length > 0) {
      const sorted = resultDecksSort(Object.values(decks), sortMethod);
      setSortedDecks(sorted);
    }
  }, [decks, sortMethod]);

  const deckRows = sortedDecks.map((deck, index) => {
    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const clans = {};
    let cryptTotal = 0;

    const crypt = Object.keys(deck.crypt).map((cardid) => {
      if (cardid != 200076) {
        const clan = cryptCardBase[cardid].Clan;

        if (clan in clans) {
          clans[cryptCardBase[cardid].Clan] += deck.crypt[cardid].q;
          cryptTotal += deck.crypt[cardid].q;
        } else {
          clans[cryptCardBase[cardid].Clan] = deck.crypt[cardid].q;
          cryptTotal += deck.crypt[cardid].q;
        }
      }

      return <div key={cardid}>{cryptCardBase[cardid].Name}</div>;
    });

    const library = Object.keys(deck.library).map((cardid) => {
      return <div key={cardid}>{libraryCardBase[cardid].Name}</div>;
    });

    let clan;
    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5) {
        clan = c;
      }
    });

    return (
      <React.Fragment key={deck.deckid}>
        <tr className={resultTrClass}>
          <td className="clan px-2" onClick={() => handleOpen(deck.deckid)}>
            {clan && <ResultCryptClan value={clan} />}
          </td>
          <td
            className="name px-2"
            onMouseEnter={() => setShowDeck(deck.deckid)}
            onMouseLeave={() => setShowDeck(false)}
          >
            <OverlayTooltip
              placement="right"
              show={showDeck === deck.deckid}
              className="adv-select"
              text={
                <Row>
                  <Col md={7}>
                    <DeckCrypt
                      deckid={deck.deckid}
                      cards={deck.crypt}
                      isAuthor={true}
                    />
                  </Col>
                  <Col md={5}>
                    <DeckLibrary
                      deckid={deck.deckid}
                      cards={deck.library}
                      isAuthor={true}
                    />
                  </Col>
                </Row>
              }
            >
              <div
                className="d-flex text-overflow name justify-content-between"
                onClick={() => handleOpen(deck.deckid)}
                title={deck.name}
              >
                {deck.name}
                {deck.branchName && (
                  <div
                    className="d-inline pl-2 revision"
                    title={deck.branchName}
                  >
                    {deck.branchName}
                  </div>
                )}
              </div>
            </OverlayTooltip>
          </td>
          <td className="date px-2" onClick={() => handleOpen(deck.deckid)}>
            {new Date(deck.timestamp).toISOString().slice(0, 10)}
          </td>
          <td className="tags">
            <DeckTags defaultTagsOptions={defaultTagsOptions} deck={deck} />
          </td>
          <td className="buttons">
            <div className="d-inline pl-1">
              <DeckDelete noText={true} deck={deck} />
            </div>
            <div className="d-inline pl-1">
              <DeckClone
                activeDeck={{ src: 'my', deckid: deck.deckid }}
                noText={true}
                deck={deck}
              />
            </div>
            <div className="d-inline pl-1">
              <DeckCopyUrlMutableButton noText={true} value={deck.deckid} />
            </div>
            <div className="d-inline pl-1">
              <DeckProxy noText={true} deck={deck} />
            </div>
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
      size="xl"
      /* dialogClassName={!isMobile ? 'modal-deck-draw' : null} */
    >
      <Modal.Body>
        <DeckTotal setSortMethod={setSortMethod} />
        <table className="decks-table">
          <tbody>{deckRows}</tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default DeckSelectAdvModal;
