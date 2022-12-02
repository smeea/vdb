import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Form,
  Row,
  Col,
  FormControl,
  Button,
  Stack,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';
import Select from 'react-select';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import Shuffle from 'assets/images/icons/shuffle.svg';
import Download from 'assets/images/icons/download.svg';
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
import { useApp, deckStore, deckUpdate } from 'context';
import { deckServices } from 'services';

const DeckSelectAdvModal = ({ show, allTagsOptions, handleClose }) => {
  const { cryptCardBase, inventoryMode, isNarrow, isMobile, isDesktop } =
    useApp();
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState({});
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
    navigate(`/decks/${deckid}`);
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
      setSelectedDecks({});
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

  const toggleSelect = (deckid) => {
    setSelectedDecks((prevState) => ({
      ...prevState,
      [deckid]: !prevState[deckid],
    }));
  };

  const toggleSelectAll = () => {
    if (isSelectedAll) {
      setSelectedDecks({});
      setIsSelectedAll(!isSelectedAll);
    } else {
      setSelectedDecks(() => {
        const selected = {};
        sortedDecks.map((d) => {
          selected[d.deckid] = true;
        });

        return selected;
      });
      setIsSelectedAll(!isSelectedAll);
    }
  };

  // const deleteSelected = () => {
  // };

  const exportSelected = (format) => {
    const target = {};
    Object.keys(selectedDecks)
      .filter((deckid) => selectedDecks[deckid])
      .map((deckid) => {
        target[deckid] = decks[deckid];
      });

    deckServices.exportDecks(target, format);
  };

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
            <td className="select px-1">
              <Form.Check
                type="checkbox"
                checked={selectedDecks[deck.deckid] ?? false}
                onChange={() => toggleSelect(deck.deckid)}
              />
            </td>
            {inventoryMode && !isMobile && (
              <td className="inventory">
                <Button onClick={() => toggleInventoryState(deck.deckid)}>
                  <div
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
                </Button>
              </td>
            )}
            {!isMobile && (
              <td className="clan" onClick={() => handleOpen(deck.deckid)}>
                {clan && <ResultClanImage value={clan} />}
              </td>
            )}
            <td className="name px-1" onClick={() => handleOpen(deck.deckid)}>
              <div
                className="d-flex truncate name justify-content-between"
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
                          className="overflow-y-auto h-[80vh]"
                        >
                          <DeckCrypt inAdvSelect={true} deck={deck} />
                        </Col>
                        <Col
                          md={6}
                          onClick={(event) => {
                            if (event.target === event.currentTarget)
                              setShowDeck(false);
                          }}
                          className="overflow-y-auto h-[80vh]"
                        >
                          <DeckLibrary deck={deck} />
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
              <DeckTags deck={deck} allTagsOptions={allTagsOptions} />
            </td>
            <td className="buttons">
              <Stack
                className="justify-content-end pe-1"
                direction="horizontal"
                gap={1}
              >
                <DeckHideButton deck={deck} />
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
                <th className="select px-1">
                  <Form.Check
                    type="checkbox"
                    checked={isSelectedAll}
                    onChange={() => toggleSelectAll()}
                  />
                </th>
                {inventoryMode && !isMobile && (
                  <th className="inventory">
                    <Select
                      classNamePrefix="no-dropdown react-select"
                      options={invOptions}
                      onChange={(e) => setInvFilter(e.value)}
                      value={invOptions.find((obj) => obj.value === invFilter)}
                      isSearchable={false}
                    />
                  </th>
                )}
                {!isMobile && (
                  <th className="clan">
                    <Select
                      classNamePrefix="no-dropdown react-select"
                      options={clanOptions}
                      onChange={(e) => setClanFilter(e.value)}
                      value={clanOptions.find(
                        (obj) => obj.value === clanFilter.toLowerCase()
                      )}
                      isSearchable={!isMobile}
                    />
                  </th>
                )}
                <th className="name truncate">
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
                      className={isMobile ? '' : 'pt-0.5 pe-3'}
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
          <div className="d-flex justify-content-end pt-3">
            <Stack direction="horizontal" gap={2}>
              {/* <ButtonIconed */}
              {/*   variant="primary" */}
              {/*   onClick={() => deleteSelected()} */}
              {/*   title="Delete Selected" */}
              {/*   icon={<TrashFill />} */}
              {/*   text="Delete Selected" */}
              {/* /> */}
              <DropdownButton
                as={ButtonGroup}
                variant="primary"
                title={
                  <div
                    title="Export Selected"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="d-flex pe-2">
                      <Download />
                    </div>
                    Export Selected
                  </div>
                }
              >
                <Dropdown.Item href="" onClick={() => exportSelected('text')}>
                  Text
                </Dropdown.Item>
                <Dropdown.Item href="" onClick={() => exportSelected('lackey')}>
                  Lackey
                </Dropdown.Item>
                <Dropdown.Item href="" onClick={() => exportSelected('jol')}>
                  JOL
                </Dropdown.Item>
                <Dropdown.Item href="" onClick={() => exportSelected('xlsx')}>
                  Excel
                </Dropdown.Item>
              </DropdownButton>
            </Stack>
          </div>
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
