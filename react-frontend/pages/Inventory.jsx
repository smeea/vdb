import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DeckNewCryptCard from './components/DeckNewCryptCard.jsx';
import DeckNewLibraryCard from './components/DeckNewLibraryCard.jsx';
import InventoryCrypt from './components/InventoryCrypt.jsx';
import InventoryLibrary from './components/InventoryLibrary.jsx';

function Inventory(props) {
  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);

  return (
    <Container className="inventory-container">
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
