import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Row, Col, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import Check from '../../assets/images/icons/check.svg';
import X from '../../assets/images/icons/x.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import Plus from '../../assets/images/icons/plus.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckTotal from './DeckTotal.jsx';
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
  let resultTrClass;

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
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

      const sorted = resultDecksSort(filtered, sortMethod);
      setSortedDecks(sorted);
    }
  }, [preconDecks, nameFilter, sortMethod]);

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

    const crypt = Object.keys(deck.crypt).map((cardid) => {
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

    const library = Object.keys(deck.library).map((cardid) => {
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

    const [set, precon] = deck.deckid.split(':');

    return (
      <React.Fragment key={deck.deckid}>
        <tr className={resultTrClass}>
          <td className="clan">{clanIcons.length > 0 && clanIcons}</td>
          <td className="name">
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
          <td className="set">
            {setData[set].year}
            <span className="px-3">–</span>
            {setData[set].name}
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
    >
      <Modal.Body>
        <DeckTotal />
        <table className="precons-table">
          <thead>
            <tr>
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
              <th className="set"></th>
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
