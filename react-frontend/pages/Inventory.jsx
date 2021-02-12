import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import ArchiveFill from '../assets/images/icons/archive-fill.svg'
import DeckExport from './components/DeckExport.jsx';
import DeckNewCryptCard from './components/DeckNewCryptCard.jsx';
import DeckNewLibraryCard from './components/DeckNewLibraryCard.jsx';
import InventoryCrypt from './components/InventoryCrypt.jsx';
import InventoryLibrary from './components/InventoryLibrary.jsx';

function Inventory(props) {
  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);

  const AddDeckOptions = Object.keys(props.decks).map((deck, index) => {
    return(
      <Dropdown.Item
        href=""
        key={index}
        onClick={() => props.inventoryDeckAdd(props.decks[deck])}
      >
      <div className="d-flex align-items-center">
        <div className="pr-3"><ArchiveFill/></div>
        {props.decks[deck].name}
      </div>
      </Dropdown.Item>
    )
  });

  const clearInventory = () => {
    const url = `${process.env.API_URL}inventory/clear`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(props.setInventory({crypt: {}, library: {}}))
      .catch((error) => console.log(error));
  };


  const exportInventory = () => {
    const url = `${process.env.API_URL}inventory/export`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <Container className="inventory-container">
      <Row className="justify-content-end">
        <Col lg={3} className="py-1 px-0 px-lg-3">
          <div className="bp-125">
            <DeckExport
              /* setShowButtons={props.setShowButtons} */
              activeDeck='inventory'
            />
          </div>
          <div className="bp-125">
            <Button
              variant='outline-secondary'
              onClick={() => clearInventory()}
              className="btn-block"
            >
              <div className="d-flex justify-content-center align-items-center">
                <div className="pr-2"><ArchiveFill/></div>
                Clear Inventory
              </div>
            </Button>
          </div>
          <div className="bp-125">
            <Dropdown>
              <Dropdown.Toggle
                className="btn-block" variant="outline-secondary">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pr-2"><ArchiveFill/></div>
                  Add from Deck
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>{AddDeckOptions}</Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={7} className="px-0 px-lg-3">
          <DeckNewCryptCard
            cardAdd={props.cardAdd}
            cards={props.inventory.crypt}
            cardBase={props.cryptCardBase}
            setNewId={setNewCryptId}
            inventoryMode={true}
          />
          {newCryptId && props.inventory.crypt[newCryptId] &&
           <InventoryCrypt
             cards={{ [newCryptId]: props.inventory.crypt[newCryptId] }}
             showImage={props.showImage}
             setShowImage={props.setShowImage}
             isAuthor={true}
             isMobile={props.isMobile}
             isWide={props.isWide}
             cardBase={props.cryptCardBase}
             cardChange={props.cardChange}
             usedCards={{
               soft: props.usedCards.softCrypt,
               hard: props.usedCards.hardCrypt,
             }}
             decks={props.decks}
             compact={true}
           />
          }
          {props.inventory.crypt &&
           (props.usedCards.softCrypt || props.usedCards.hardCrypt ) &&
           <InventoryCrypt
             cards={props.inventory.crypt}
             showImage={props.showImage}
             setShowImage={props.setShowImage}
             isAuthor={true}
             isMobile={props.isMobile}
             isWide={props.isWide}
             cardBase={props.cryptCardBase}
             cardChange={props.cardChange}
             usedCards={{
               soft: props.usedCards.softCrypt,
               hard: props.usedCards.hardCrypt,
             }}
             decks={props.decks}
           />
          }
        </Col>
        <Col lg={5} className="px-0 px-lg-3">
          <DeckNewLibraryCard
            cardAdd={props.cardAdd}
            cards={props.inventory.library}
            cardBase={props.libraryCardBase}
            setNewId={setNewLibraryId}
            inventoryMode={true}
          />
          {newLibraryId && props.inventory.library[newLibraryId] &&
           <InventoryLibrary
             cards={{ [newLibraryId]: props.inventory.library[newLibraryId] }}
             showImage={props.showImage}
             setShowImage={props.setShowImage}
             isAuthor={true}
             isMobile={props.isMobile}
             isWide={props.isWide}
             cardBase={props.libraryCardBase}
             cardChange={props.cardChange}
             usedCards={{
               soft: props.usedCards.softLibrary,
               hard: props.usedCards.hardLibrary,
             }}
             decks={props.decks}
             compact={true}
           />
          }

          {props.inventory.library &&
           (props.usedCards.softLibrary || props.usedCards.hardLibrary ) &&
           <InventoryLibrary
             cards={props.inventory.library}
             showImage={props.showImage}
             setShowImage={props.setShowImage}
             isAuthor={true}
             isMobile={props.isMobile}
             isWide={props.isWide}
             cardBase={props.libraryCardBase}
             cardChange={props.cardChange}
             usedCards={{
               soft: props.usedCards.softLibrary,
               hard: props.usedCards.hardLibrary,
             }}
             decks={props.decks}
           />
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Inventory;
