import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Row,
  Col,
  FormControl,
  Button,
  Stack,
} from 'react-bootstrap';
import Select from 'react-select';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckTags,
  DeckSelectAdvModalTotal,
  DeckDeleteButton,
  DeckHideButton,
  DeckFreezeButton,
  DeckBranchDeleteButton,
  DeckCopyUrlButton,
  DeckTogglePublicButton,
  DeckSelectSortForm,
  DeckSelectAdvModalTagsFilter,
  ResultClanImage,
  OverlayTooltip,
} from 'components';

import { decksSort } from 'utils';
import { useApp } from 'context';

const DeckSelectAdvModal = ({ show, allTagsOptions, handleClose }) => {
  const {
    cryptCardBase,
    decks,
    deckUpdate,
    setActiveDeck,
    inventoryMode,
    isNarrow,
    isMobile,
    isDesktop,
  } = useApp();

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  const [invFilter, setInvFilter] = useState('any');
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [clanFilter, setClanFilter] = useState('any');

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const handleOpen = (deckid) => {
    setActiveDeck({ src: 'my', deckid: deckid });
    handleClose();
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

  const allDecksClans = [];
  Object.values(decks).map((deck) => {
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
      if (clans[c] / cryptTotal > 0.5 && !allDecksClans.includes(c)) {
        allDecksClans.push(c);
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

  allDecksClans.sort().forEach((i) => {
    clanOptions.push({
      value: i.toLowerCase(),
      name: 'clan',
      label: <ResultClanImage value={i} />,
    });
  });

  const invOptions = [
    {
      value: 'any',
      name: 'inventory',
      label: 'ANY',
    },
    {
      value: '',
      name: 'inventory',
      label: <At />,
    },
    {
      value: 's',
      name: 'inventory',
      label: <Shuffle />,
    },
    {
      value: 'h',
      name: 'inventory',
      label: <PinAngleFill />,
    },
  ];

  useEffect(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (invFilter !== 'any') {
        filtered = filtered.filter((deck) => {
          return deck.inventoryType === invFilter;
        });
      }

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

      const sorted = decksSort(filtered, sortMethod);
      setSortedDecks(sorted);
    }
  }, [
    decks,
    invFilter,
    clanFilter,
    nameFilter,
    tagsFilter,
    revFilter,
    sortMethod,
  ]);

  const deckRows = sortedDecks.map((deck, idx) => {
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

    const inventoryType = deck.inventoryType;
    const toggleInventoryState = (deckid) => {
      if (!inventoryType) {
        deckUpdate(deckid, 'inventoryType', 's');
      } else if (inventoryType === 's') {
        deckUpdate(deckid, 'inventoryType', 'h');
      } else if (inventoryType === 'h') {
        deckUpdate(deckid, 'inventoryType', '');
      }
    };

    return (
      <React.Fragment key={deck.deckid}>
        {decks[deck.deckid] && (
          <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
            {inventoryMode && !isMobile && (
              <td
                className="inventory"
                onClick={() => toggleInventoryState(deck.deckid)}
              >
                <div
                  className="px-2"
                  title={
                    deck.inventoryType === 's'
                      ? 'Flexible'
                      : deck.inventoryType === 'h'
                      ? 'Fixed'
                      : 'Virtual'
                  }
                >
                  {deck.inventoryType == 's' && <Shuffle />}
                  {deck.inventoryType == 'h' && <PinAngleFill />}
                  {!deck.inventoryType && <At />}
                </div>
              </td>
            )}
            {!isMobile && (
              <td className="clan" onClick={() => handleOpen(deck.deckid)}>
                {clan && <ResultClanImage value={clan} />}
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
            {isDesktop && (
              <td className="preview">
                <div
                  className="m-2"
                  onMouseEnter={() => setShowDeck(deck.deckid)}
                  onMouseLeave={() => setShowDeck(false)}
                >
                  <OverlayTooltip
                    placement="right"
                    show={showDeck === deck.deckid}
                    text={
                      <Row className="align-items-start">
                        <Col
                          md={6}
                          onClick={(event) => {
                            if (event.target === event.currentTarget)
                              setShowDeck(false);
                          }}
                          className="scroll"
                        >
                          <DeckCrypt
                            inAdvSelect={true}
                            deckid={deck.deckid}
                            cards={deck.crypt}
                          />
                        </Col>
                        <Col
                          md={6}
                          onClick={(event) => {
                            if (event.target === event.currentTarget)
                              setShowDeck(false);
                          }}
                          className="scroll"
                        >
                          <DeckLibrary
                            deckid={deck.deckid}
                            cards={deck.library}
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
              <DeckTags
                allTagsOptions={allTagsOptions}
                isAuthor={true}
                deckid={deck.deckid}
                tags={deck.tags}
              />
            </td>
            <td className="buttons">
              <Stack
                className="justify-content-end pe-1"
                direction="horizontal"
                gap={1}
              >
                <DeckHideButton deckid={deck.deckid} />
                {!isMobile && (
                  <>
                    <DeckFreezeButton deck={deck} />
                    <DeckTogglePublicButton deck={deck} />
                  </>
                )}
                {isDesktop && (
                  <>
                    <DeckCopyUrlButton
                      noText={true}
                      isAuthor={true}
                      deck={deck}
                    />
                    {revFilter &&
                    (deck.master ||
                      (deck.branches && deck.branches.length > 0)) ? (
                      <DeckBranchDeleteButton noText={true} deck={deck} />
                    ) : (
                      <DeckDeleteButton noText={true} deck={deck} />
                    )}
                  </>
                )}
              </Stack>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName={isMobile ? 'm-0' : 'modal-x-wide'}
      >
        <Modal.Header className="no-border pt-2 pt-md-3 pb-0 pb-md-1 ps-2 pe-3 px-md-4">
          <h5>Select Deck</h5>
          {!isNarrow && (
            <Button variant="outline-secondary" onClick={handleClose}>
              <X width="32" height="32" viewBox="0 0 16 16" />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body className={isMobile ? 'p-0' : 'pt-0'}>
          <DeckSelectAdvModalTotal
            tagsFilter={tagsFilter}
            setTagsFilter={setTagsFilter}
          />
          <table className="decks-table">
            <thead>
              <tr>
                {inventoryMode && !isMobile && (
                  <th className="inventory">
                    <Select
                      classNamePrefix="react-select"
                      options={invOptions}
                      onChange={(e) => setInvFilter(e.value)}
                      value={invOptions.find((obj) => obj.value === invFilter)}
                    />
                  </th>
                )}
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
                {isDesktop && <th />}
                {!isMobile && <th />}
                <th className="tags">
                  <DeckSelectAdvModalTagsFilter
                    tagsFilter={tagsFilter}
                    handleChangeTagsFilter={handleChangeTagsFilter}
                    allTagsOptions={allTagsOptions}
                  />
                </th>
                <th className="buttons">
                  <div
                    className={`${
                      isMobile
                        ? ''
                        : 'd-flex justify-content-end align-items-center '
                    } px-1`}
                  >
                    <Form.Check
                      className={isMobile ? '' : 'pt-05 pe-3'}
                      type="checkbox"
                      id="revFilter"
                      label={isDesktop ? 'Show Revisions' : 'Rev'}
                      checked={revFilter}
                      onChange={() => setRevFilter(!revFilter)}
                    />
                    <div className="d-flex justify-content-end">
                      <DeckSelectSortForm onChange={setSortMethod} />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{deckRows}</tbody>
          </table>
        </Modal.Body>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckSelectAdvModal;
