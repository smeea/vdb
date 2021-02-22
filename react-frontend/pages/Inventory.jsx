import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import DeckNewCryptCard from './components/DeckNewCryptCard.jsx';
import DeckNewLibraryCard from './components/DeckNewLibraryCard.jsx';
import InventoryCrypt from './components/InventoryCrypt.jsx';
import InventoryLibrary from './components/InventoryLibrary.jsx';
import InventoryButtons from './components/InventoryButtons.jsx';
import InventoryShowSelect from './components/InventoryShowSelect.jsx';

function Inventory(props) {
  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');

  return (
    <Container className={props.isMobile ? "main-container" : "main-container py-4"}>
      {props.username ?
       <Row>
         <Col lg={1}>
         </Col>
         <Col lg={5} className="px-0 px-lg-3">
           <DeckNewCryptCard
             cardAdd={props.cardAdd}
             cards={props.inventory.crypt}
             cardBase={props.cryptCardBase}
             setNewId={setNewCryptId}
             inInventory={true}
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
              category={category}
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
         <Col lg={4} className="px-0 px-lg-3">
           <DeckNewLibraryCard
             cardAdd={props.cardAdd}
             cards={props.inventory.library}
             cardBase={props.libraryCardBase}
             setNewId={setNewLibraryId}
             inInventory={true}
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
              category={category}
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
         <Col lg={2} className="px-0 px-lg-3">
           <InventoryButtons
             decks={props.decks}
             inventoryDeckAdd={props.inventoryDeckAdd}
             setInventory={props.setInventory}
             isMobile={props.isMobile}
           />
           <div className="px-4 py-2">
             <InventoryShowSelect
               category={category}
               setCategory={setCategory}
             />
           </div>
         </Col>
       </Row>
       :
       <Row className="h-75 align-items-center justify-content-center">
         <Col md={12} lg={5} className="px-0">
           <div className="d-flex justify-content-center pb-3">
             <h6>Login required to manage inventory</h6>
           </div>
           <AccountLogin
             setUsername={props.setUsername}
             isMobile={props.isMobile}
           />
           <AccountRegister
             setUsername={props.setUsername}
             whoAmI={props.whoAmI}
           />
         </Col>
       </Row>
      }
    </Container>
  );
}

export default Inventory;
