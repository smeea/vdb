import React, { useState, useEffect, useContext } from 'react';
import { Modal, Row, Col, FormControl } from 'react-bootstrap';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckSelectSortForm from './DeckSelectSortForm.jsx';
import InventoryDeckAddButton from './InventoryDeckAddButton.jsx';
import InventoryDeckDeleteButton from './InventoryDeckDeleteButton.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import resultDecksSort from './resultDecksSort.js';
import OverlayTooltip from './OverlayTooltip.jsx';
import AppContext from '../../context/AppContext';
import setData from './forms_data/setsAndPrecons.json';

function InventoryAddDeckModal(props) {
  const {
    cryptCardBase,
    libraryCardBase,
    inventoryCrypt,
    inventoryLibrary,
    preconDecks,
    isMobile,
  } = useContext(AppContext);

  const [sortMethod, setSortMethod] = useState('byDate');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  const [nameFilter, setNameFilter] = useState('');
  const [setFilter, setSetFilter] = useState('');
  let resultTrClass;

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

  useEffect(() => {
    if (Object.values(preconDecks).length > 0) {
      let filtered = Object.values(preconDecks);

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (setFilter) {
        filtered = filtered.filter((deck) => {
          const set = deck.deckid.split(':')[0];
          if (
            setData[set].name.toLowerCase().indexOf(setFilter.toLowerCase()) >=
            0
          )
            return true;
        });
      }

      const sorted = resultDecksSort(filtered, sortMethod);
      setSortedDecks(sorted);
    }
  }, [preconDecks, nameFilter, setFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let cryptInInventory = true;
    let libraryInInventory = true;

    const clans = {};
    let cryptTotal = 0;

    Object.keys(deck.crypt).map((cardid) => {
      if (deck.crypt[cardid].q != 0) {
        if (
          !inventoryCrypt[cardid] ||
          inventoryCrypt[cardid].q < deck.crypt[cardid].q
        ) {
          cryptInInventory = false;
        }
      }

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

    Object.keys(deck.library).map((cardid) => {
      if (deck.library[cardid].q != 0) {
        if (
          !inventoryLibrary[cardid] ||
          inventoryLibrary[cardid].q < deck.library[cardid].q
        ) {
          libraryInInventory = false;
        }
      }

      return <div key={cardid}>{libraryCardBase[cardid].Name}</div>;
    });

    const inInventory = cryptInInventory && libraryInInventory ? true : false;

    const clanIcons = Object.keys(clans).map((c) => {
      if (clans[c] / cryptTotal >= 0.4) {
        return (
          <div className="d-inline px-2" key={c}>
            <ResultCryptClan value={c} />
          </div>
        );
      }
    });

    const set = deck.deckid.split(':')[0];

    return (
      <React.Fragment key={deck.deckid}>
        <tr className={resultTrClass}>
          {!isMobile && (
            <td className="clan">{clanIcons.length > 0 && clanIcons}</td>
          )}
          <td className="name px-1">
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
                  <EyeFill />
                </OverlayTooltip>
              </div>
            </td>
          )}
          <td className="set">
            {isMobile ? (
              <>
                <div>{setData[set].name}</div>
                <div className="d-flex justify-content-end small">
                  {setData[set].year}
                </div>
              </>
            ) : (
              <>
                {setData[set].year}
                <span className="px-3">–</span>
                {setData[set].name}
              </>
            )}
          </td>
          <td className="buttons">
            <div className="d-inline pl-1">
              <InventoryDeckAddButton
                inventoryDeckAdd={props.inventoryDeckAdd}
                deck={deck}
                inInventory={inInventory}
              />
            </div>
            <div className="d-inline pl-1">
              <InventoryDeckDeleteButton
                inventoryDeckDelete={props.inventoryDeckDelete}
                deck={deck}
                inInventory={inInventory}
              />
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
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 pl-2 pr-3' : 'pt-3 pb-1 pl-3 pr-4'}
        closeButton
      >
        <h5>Import Precon to Inventory</h5>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'p-0' : 'pt-0'}>
        <table className="inv-import-precons-table">
          <thead>
            <tr>
              {!isMobile && <th className="clan"></th>}
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
              {!isMobile && <th className="preview"></th>}
              <th className="set">
                <FormControl
                  placeholder="Filter by Set"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={setFilter}
                  onChange={handleChangeSetFilter}
                />
              </th>
              <th className="buttons">
                <div className="d-flex justify-content-end align-items-center">
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

export default InventoryAddDeckModal;
