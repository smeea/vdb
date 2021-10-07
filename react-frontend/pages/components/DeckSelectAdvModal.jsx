import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckTags from './DeckTags.jsx';
import DeckTotal from './DeckTotal.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckBranchDelete from './DeckBranchDelete.jsx';
import DeckClone from './DeckClone.jsx';
import DeckProxy from './DeckProxy.jsx';
import DeckCopyUrl from './DeckCopyUrl.jsx';
import DeckSelectSortForm from './DeckSelectSortForm.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import resultDecksSort from './resultDecksSort.js';
import OverlayTooltip from './OverlayTooltip.jsx';
import AppContext from '../../context/AppContext';

function DeckSelectAdvModal(props) {
  const {
    cryptCardBase,
    decks,
    deckUpdate,
    setActiveDeck,
    inventoryMode,
    isMobile,
  } = useContext(AppContext);

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [clanFilter, setClanFilter] = useState('any');

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

  const cardInDeck = (deck, query) => {
    const normalizedQuery = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    for (const id of Object.keys(deck.crypt)) {
      const normalizedCardName = deck.crypt[id].c['Name']
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      if (normalizedCardName.includes(normalizedQuery)) {
        return true;
      }
    }

    for (const id of Object.keys(deck.library)) {
      const normalizedCardName = deck.library[id].c['Name']
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      if (normalizedCardName.includes(normalizedQuery)) {
        return true;
      }
    }
  };

  const allDecksClans = new Set();
  Object.values(decks).map((deck, index) => {
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

    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5) {
        allDecksClans.add(c);
      }
    });
  });

  const clanOptions = [
    {
      value: 'any',
      name: 'clan',
      label: 'ANY',
    },
    {
      value: '',
      name: 'clan',
      label: 'NONE',
    },
  ];
  allDecksClans.forEach((i, index) => {
    clanOptions.push({
      value: i.toLowerCase(),
      name: 'clan',
      label: <ResultCryptClan value={i} />,
    });
  });

  useEffect(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (clanFilter !== 'any') {
        filtered = filtered.filter((deck) => {
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

          let clan = '';
          Object.keys(clans).forEach((c) => {
            if (clans[c] / cryptTotal > 0.5) {
              clan = c;
            }
          });

          if (clan.toLowerCase() === clanFilter) return true;
        });
      }

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          const normalizedNameFilter = nameFilter
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');
          const normalizedDeckName = deck.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

          if (normalizedDeckName.includes(normalizedNameFilter)) return true;

          if (cardInDeck(deck, nameFilter)) {
            return true;
          }
        });
      }

      if (tagsFilter) {
        filtered = filtered.filter((deck) => {
          let counter = 0;
          tagsFilter.map((tag) => {
            if (deck.tags && deck.tags.includes(tag)) counter += 1;
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
  }, [decks, clanFilter, nameFilter, tagsFilter, revFilter, sortMethod]);

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
          {inventoryMode && !isMobile && (
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
          {!isMobile && (
            <td className="clan" onClick={() => handleOpen(deck.deckid)}>
              {clan && <ResultCryptClan value={clan} />}
            </td>
          )}
          <td className="name px-1" onClick={() => handleOpen(deck.deckid)}>
            <div
              className="d-flex trimmed name justify-content-between"
              title={deck.name}
            >
              {deck.name}
              {deck.branchName &&
                (deck.master ||
                  (deck.branches && deck.branches.length > 0)) && (
                  <div
                    className="d-inline ps-2 revision"
                    title={deck.branchName}
                  >
                    {deck.branchName}
                  </div>
                )}
            </div>
          </td>
          {!isMobile && (
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
                  <div>
                    <EyeFill />
                  </div>
                </OverlayTooltip>
              </div>
            </td>
          )}
          {!isMobile && (
            <td className="date" onClick={() => handleOpen(deck.deckid)}>
              {new Date(deck.timestamp).toISOString().slice(0, 10)}
            </td>
          )}
          <td className="tags">
            <DeckTags allTagsOptions={props.allTagsOptions} deck={deck} />
          </td>
          {!isMobile && (
            <td className="buttons">
              {revFilter &&
                (deck.master ||
                  (deck.branches && deck.branches.length > 0)) && (
                  <div className="d-inline pe-1">
                    <DeckBranchDelete noText={true} deck={deck} />
                  </div>
                )}
              <div className="d-inline pe-1">
                <DeckDelete noText={true} deck={deck} />
              </div>
              <div className="d-inline pe-1">
                <DeckClone
                  activeDeck={{ src: 'my', deckid: deck.deckid }}
                  noText={true}
                  deck={deck}
                />
              </div>
              <div className="d-inline pe-1">
                <DeckCopyUrl noText={true} isAuthor={true} deck={deck} />
              </div>
              <div className="d-inline pe-1">
                <DeckProxy noText={true} deck={deck} />
              </div>
            </td>
          )}
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
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 ps-3 pe-4'}
      >
        <h5>Select Deck</h5>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'p-0' : 'pt-0'}>
        <DeckTotal />
        <table className="decks-table">
          <thead>
            <tr>
              {inventoryMode && !isMobile && <th className="inventory"></th>}
              {!isMobile && (
                <th className="clan">
                  <Select
                    classNamePrefix="react-select"
                    options={clanOptions}
                    onChange={(e) => setClanFilter(e.value)}
                    value={clanOptions.find(
                      (obj) => obj.value === clanFilter.toLowerCase()
                    )}
                    isSearchable={!isMobile}
                  />
                </th>
              )}
              <th className="name trimmed mw-175">
                <FormControl
                  placeholder="Filter by Deck or Card Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              {!isMobile && <th className="preview"></th>}
              {!isMobile && <th className="date"></th>}
              <th className="tags">
                <Select
                  classNamePrefix="tags-filter react-select-tags"
                  isMulti
                  options={props.allTagsOptions}
                  onChange={handleChangeTagsFilter}
                  defaultValue={tagsFilter}
                  placeholder="Filter by Tags"
                  isSearchable={!isMobile}
                />
              </th>
              {!isMobile && (
                <th className="buttons">
                  <div className="d-flex justify-content-end align-items-center py-1 pe-1">
                    <Form.Check
                      className="pe-2"
                      type="checkbox"
                      id="revFilter"
                      label={isMobile ? 'Rev' : 'Revisions'}
                      checked={revFilter}
                      onChange={() => setRevFilter(!revFilter)}
                    />
                    <DeckSelectSortForm onChange={setSortMethod} />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>{deckRows}</tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default DeckSelectAdvModal;
