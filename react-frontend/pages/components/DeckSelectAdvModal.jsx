import React, { useState, useEffect, useContext } from 'react';
import { Modal, Row, Col, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckTags from './DeckTags.jsx';
import DeckTotal from './DeckTotal.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckBranchDelete from './DeckBranchDelete.jsx';
import DeckClone from './DeckClone.jsx';
import DeckProxy from './DeckProxy.jsx';
import DeckCopyUrlMutableButton from './DeckCopyUrlMutableButton.jsx';
import DeckSelectSortForm from './DeckSelectSortForm.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import resultDecksSort from './resultDecksSort.js';
import OverlayTooltip from './OverlayTooltip.jsx';
import AppContext from '../../context/AppContext';

function DeckSelectAdvModal(props) {
  const { cryptCardBase, decks, deckUpdate, setActiveDeck, inventoryMode } =
    useContext(AppContext);

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  let resultTrClass;

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

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
      let filtered = Object.values(decks);

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (tagsFilter) {
        filtered = filtered.filter((deck) => {
          let counter = 0;
          tagsFilter.map((tag) => {
            if (deck.tags.includes(tag)) counter += 1;
          });
          if (counter >= tagsFilter.length) return true;
        });
      }

      if (!revFilter) {
        filtered = filtered.filter((deck) => {
          if (!deck.master) return true;
        });
      }

      const sorted = resultDecksSort(filtered, sortMethod);
      setSortedDecks(sorted);
    }
  }, [decks, nameFilter, tagsFilter, revFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const clans = {};
    let cryptTotal = 0;

    Object.keys(deck.crypt).map((cardid) => {
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
    });

    let clan;
    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5) {
        clan = c;
      }
    });

    const toggleInventoryState = () => {
      const inventoryType = deck.inventory_type;
      if (!inventoryType) {
        deckUpdate(deck.deckid, 'makeFlexible', 'all');
      } else if (inventoryType == 's') {
        deckUpdate(deck.deckid, 'makeFixed', 'all');
      } else if (inventoryType == 'h') {
        deckUpdate(deck.deckid, 'makeClear', 'all');
      }
    };

    return (
      <React.Fragment key={deck.deckid}>
        <tr className={resultTrClass}>
          {inventoryMode && (
            <td className="inventory" onClick={() => toggleInventoryState()}>
              <div
                className="px-2"
                title={
                  deck.inventory_type === 's'
                    ? 'Flexible'
                    : deck.inventory_type === 'h'
                    ? 'Fixed'
                    : 'Virtual'
                }
              >
                {deck.inventory_type == 's' && <Shuffle />}
                {deck.inventory_type == 'h' && <PinAngleFill />}
                {!deck.inventory_type && <At />}
              </div>
            </td>
          )}

          <td className="clan" onClick={() => handleOpen(deck.deckid)}>
            {clan && <ResultCryptClan value={clan} />}
          </td>
          <td className="name" onClick={() => handleOpen(deck.deckid)}>
            <div
              className="d-flex text-overflow name justify-content-between"
              title={deck.name}
            >
              {deck.name}
              {deck.branchName &&
                (deck.master ||
                  (deck.branches && deck.branches.length > 0)) && (
                  <div
                    className="d-inline pl-2 revision"
                    title={deck.branchName}
                  >
                    {deck.branchName}
                  </div>
                )}
            </div>
          </td>
          <td className="preview">
            <div
              className="m-2"
              onMouseEnter={() => setShowDeck(deck.deckid)}
              onMouseLeave={() => setShowDeck(false)}
            >
              <OverlayTooltip
                placement="right"
                show={showDeck === deck.deckid}
                className="adv-select"
                text={
                  <Row>
                    <Col
                      md={7}
                      onClick={(event) => {
                        if (event.target === event.currentTarget)
                          setShowDeck(false);
                      }}
                    >
                      <DeckCrypt
                        deckid={deck.deckid}
                        cards={deck.crypt}
                        inAdvSelect={true}
                      />
                    </Col>
                    <Col
                      md={5}
                      onClick={(event) => {
                        if (event.target === event.currentTarget)
                          setShowDeck(false);
                      }}
                    >
                      <DeckLibrary
                        deckid={deck.deckid}
                        cards={deck.library}
                        inAdvSelect={true}
                      />
                    </Col>
                  </Row>
                }
              >
                <EyeFill />
              </OverlayTooltip>
            </div>
          </td>
          <td className="date" onClick={() => handleOpen(deck.deckid)}>
            {new Date(deck.timestamp).toISOString().slice(0, 10)}
          </td>
          <td className="tags">
            <DeckTags defaultTagsOptions={defaultTagsOptions} deck={deck} />
          </td>
          <td className="buttons">
            {revFilter &&
              (deck.master || (deck.branches && deck.branches.length > 0)) && (
                <div className="d-inline pl-1">
                  <DeckBranchDelete noText={true} deck={deck} />
                </div>
              )}
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
    >
      <Modal.Body>
        <DeckTotal />
        <table className="decks-table">
          <thead>
            <tr>
              {inventoryMode && <th className="inventory"></th>}
              <th className="clan"></th>
              <th className="name">
                <FormControl
                  placeholder="Filter by Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              <th className="preview"></th>
              <th className="date"></th>
              <th className="tags">
                <Select
                  classNamePrefix="tags-filter react-select-tags"
                  isMulti
                  options={defaultTagsOptions}
                  onChange={handleChangeTagsFilter}
                  defaultValue={tagsFilter}
                  placeholder="Filter by Tags"
                />
              </th>
              <th className="buttons">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="d-inline align-items-bottom custom-control custom-checkbox pr-3">
                    <input
                      id="revFilter"
                      className="custom-control-input"
                      type="checkbox"
                      checked={revFilter}
                      onChange={() => setRevFilter(!revFilter)}
                    />
                    <label htmlFor="revFilter" className="custom-control-label">
                      Revisions
                    </label>
                  </div>
                  <DeckSelectSortForm onChange={setSortMethod} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{deckRows}</tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default DeckSelectAdvModal;
