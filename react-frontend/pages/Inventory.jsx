import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Modal } from 'react-bootstrap';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
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
  const [tab, setTab] = useState('crypt')
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Container className={props.isMobile ? "main-container px-0" : "main-container py-4"}>
      {props.username ?
       <>
         {props.isMobile ?
          <Tabs
            transition={false}
            activeKey={tab}
            defaultActiveKey={'tab'}
            onSelect={(k) => setTab(k)}
          >
            <Tab eventKey="crypt" title="Crypt">
              <div className="pt-2">
                <DeckNewCryptCard
                  cardAdd={props.cardAdd}
                  cards={props.inventory.crypt}
                  cardBase={props.cryptCardBase}
                  setNewId={setNewCryptId}
                  inInventory={true}
                />
              </div>
              {newCryptId && props.inventory.crypt[newCryptId] &&
               <div className="pt-2">
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
               </div>
              }
              {props.inventory.crypt &&
               (props.usedCards.softCrypt || props.usedCards.hardCrypt ) &&
               <div className="pt-2">
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
               </div>
              }
            </Tab>
            <Tab eventKey="library" title="Library">
              <div className="pt-2">
                <DeckNewLibraryCard
                  cardAdd={props.cardAdd}
                  cards={props.inventory.library}
                  cardBase={props.libraryCardBase}
                  setNewId={setNewLibraryId}
                  inInventory={true}
                />
              </div>
              {newLibraryId && props.inventory.library[newLibraryId] &&
               <div className="pt-2">
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
               </div>
              }
              {props.inventory.library &&
               (props.usedCards.softLibrary || props.usedCards.hardLibrary ) &&
               <div className="pt-2">
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
               </div>
              }
            </Tab>
          </Tabs>
          :
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
               <div className="pt-4">
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
               </div>
              }
              {props.inventory.crypt &&
               (props.usedCards.softCrypt || props.usedCards.hardCrypt ) &&
               <div className="pt-4">
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
               </div>
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
               <div className="pt-4">
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
               </div>
              }
              {props.inventory.library &&
               (props.usedCards.softLibrary || props.usedCards.hardLibrary ) &&
               <div className="pt-4">
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
               </div>
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
         }
       </>
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
      {props.isMobile && (
        <>
          <div
            onClick={() => setShowButtons(!showButtons)}
            className="float-right-bottom menu"
          >
            <div className="pt-2 float-menu">
              <List viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
      {showButtons && (
        <Modal
          show={showButtons}
          onHide={() => setShowButtons(false)}
          animation={false}
          centered={true}
        >
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <Row className="px-0 pb-2">
                <Col>
                  <button
                    type="button"
                    className="close m-1"
                    onClick={() => setShowButtons(false)}
                  >
                    <X width="32" height="32" viewBox="0 0 16 16" />
                  </button>
                </Col>
              </Row>
              <InventoryButtons
                decks={props.decks}
                inventoryDeckAdd={props.inventoryDeckAdd}
                setInventory={props.setInventory}
                isMobile={props.isMobile}
                setShowButtons={setShowButtons}
              />
              <div className="px-4 py-2">
                <InventoryShowSelect
                  category={category}
                  setCategory={setCategory}
                />
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default Inventory;
