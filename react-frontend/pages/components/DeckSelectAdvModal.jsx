import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import Check from '../../assets/images/icons/check.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckTags from './DeckTags.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
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

  const deckRows = Object.keys(decks).map((deckid, index) => {
    const [showCrypt, setShowCrypt] = useState(undefined);
    const [showLibrary, setShowLibrary] = useState(undefined);

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const clans = {};
    let cryptTotal = 0;

    const crypt = Object.keys(decks[deckid].crypt).map((cardid) => {
      if (cardid != 200076) {
        const clan = cryptCardBase[cardid].Clan;

        if (clan in clans) {
          clans[cryptCardBase[cardid].Clan] += decks[deckid].crypt[cardid].q;
          cryptTotal += decks[deckid].crypt[cardid].q;
        } else {
          clans[cryptCardBase[cardid].Clan] = decks[deckid].crypt[cardid].q;
          cryptTotal += decks[deckid].crypt[cardid].q;
        }
      }

      return <div key={cardid}>{cryptCardBase[cardid].Name}</div>;
    });

    const library = Object.keys(decks[deckid].library).map((cardid) => {
      return <div key={cardid}>{libraryCardBase[cardid].Name}</div>;
    });

    let clan;
    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5) {
        clan = c;
      }
    });

    return (
      <React.Fragment key={deckid}>
        <tr className={resultTrClass}>
          <td className="clan px-2" onClick={() => handleOpen(deckid)}>
            {clan && <ResultCryptClan value={clan} />}
          </td>
          <td className="px-2">
            <div
              className="text-overflow name"
              onClick={() => handleOpen(deckid)}
              title={decks[deckid].name}
            >
              {decks[deckid].name}
            </div>
          </td>
          <td className="crypt px-2">
            <OverlayTooltip
              placement="right"
              onHover={() => setShowCrypt(true)}
              show={showCrypt}
              className="adv-select"
              text={
                <DeckCrypt
                  deckid={deckid}
                  cards={decks[deckid].crypt}
                  isAuthor={true}
                />
              }
            >
              <div onClick={() => setShowCrypt(!showCrypt)}>Crypt</div>
            </OverlayTooltip>
          </td>
          <td className="library px-2">
            <OverlayTooltip
              placement="right"
              onHover={() => setShowLibrary(true)}
              show={showLibrary}
              className="adv-select"
              text={
                <DeckLibrary
                  deckid={deckid}
                  cards={decks[deckid].library}
                  isAuthor={true}
                />
              }
            >
              <div onClick={() => setShowLibrary(!showLibrary)}>Library</div>
            </OverlayTooltip>
          </td>
          <td className="date px-2" onClick={() => handleOpen(deckid)}>
            {new Date(decks[deckid].timestamp).toISOString().slice(0, 10)}
          </td>
          <td className="tags">
            <DeckTags
              defaultTagsOptions={defaultTagsOptions}
              deck={decks[deckid]}
            />
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
