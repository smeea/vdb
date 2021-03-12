import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import ArrowRepeat from '../assets/images/icons/arrow-repeat.svg';
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
  const [showCrypt, setShowCrypt] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container
      className={props.isMobile ? 'main-container px-0' : 'main-container py-4'}
    >
      {props.username ? (
        <>
          {props.isMobile ? (
            <>
              {showCrypt ? (
                <>
                  <div className="pt-1 px-1">
                    <DeckNewCryptCard
                      cardAdd={props.cardAdd}
                      cards={props.inventory.crypt}
                      cardBase={props.cryptCardBase}
                      setNewId={setNewCryptId}
                      inInventory={true}
                    />
                  </div>
                  {newCryptId && props.inventory.crypt[newCryptId] && (
                    <div className="pb-2 pt-3">
                      <InventoryCrypt
                        cards={{
                          [newCryptId]: props.inventory.crypt[newCryptId],
                        }}
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
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {props.inventory.crypt &&
                    (props.usedCards.softCrypt ||
                      props.usedCards.hardCrypt) && (
                      <div className="pt-1">
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
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                        />
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="pt-1 px-1">
                    <DeckNewLibraryCard
                      cardAdd={props.cardAdd}
                      cards={props.inventory.library}
                      cardBase={props.libraryCardBase}
                      setNewId={setNewLibraryId}
                      inInventory={true}
                    />
                  </div>
                  {newLibraryId && props.inventory.library[newLibraryId] && (
                    <div className="pb-2 pt-3">
                      <InventoryLibrary
                        cards={{
                          [newLibraryId]: props.inventory.library[newLibraryId],
                        }}
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
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {props.inventory.library &&
                    (props.usedCards.softLibrary ||
                      props.usedCards.hardLibrary) && (
                      <div className="pt-1">
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
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                        />
                      </div>
                    )}
                </>
              )}
              {showFloatingButtons &&
               <div
                 onClick={() => setShowCrypt(!showCrypt)}
                 className="float-right-middle add-on"
               >
                 <div className="pt-1 float-add">
                   <ArrowRepeat viewBox="0 0 16 16" />
                 </div>
               </div>
              }
            </>
          ) : (
            <Row>
              <Col lg={1}></Col>
              <Col lg={5} className="px-0 px-lg-3">
                <DeckNewCryptCard
                  cardAdd={props.cardAdd}
                  cards={props.inventory.crypt}
                  cardBase={props.cryptCardBase}
                  setNewId={setNewCryptId}
                  inInventory={true}
                />
                {newCryptId && props.inventory.crypt[newCryptId] && (
                  <div className="pt-4">
                    <InventoryCrypt
                      cards={{
                        [newCryptId]: props.inventory.crypt[newCryptId],
                      }}
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
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {props.inventory.crypt &&
                  (props.usedCards.softCrypt || props.usedCards.hardCrypt) && (
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
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
              </Col>
              <Col lg={4} className="px-0 px-lg-3">
                <DeckNewLibraryCard
                  cardAdd={props.cardAdd}
                  cards={props.inventory.library}
                  cardBase={props.libraryCardBase}
                  setNewId={setNewLibraryId}
                  inInventory={true}
                />
                {newLibraryId && props.inventory.library[newLibraryId] && (
                  <div className="pt-4">
                    <InventoryLibrary
                      cards={{
                        [newLibraryId]: props.inventory.library[newLibraryId],
                      }}
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
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {props.inventory.library &&
                  (props.usedCards.softLibrary ||
                    props.usedCards.hardLibrary) && (
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
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
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
          )}
        </>
      ) : (
        <Row className="h-75 align-items-center justify-content-center px-2">
          <Col md={12} lg={5}>
            <div className="d-flex justify-content-center pb-3">
              <h6>Login required to manage inventory</h6>
            </div>
            <div className="py-2">
              <AccountLogin
                setUsername={props.setUsername}
                isMobile={props.isMobile}
              />
            </div>
            <div className="py-2">
              <AccountRegister
                setUsername={props.setUsername}
                whoAmI={props.whoAmI}
              />
            </div>
          </Col>
        </Row>
      )}
      {props.isMobile && showFloatingButtons && (
        <>
          <div
            onClick={() => {
              setShowMenuButtons(true);
              setShowFloatingButtons(false);
            }}
            className="float-right-bottom menu"
          >
            <div className="pt-2 float-menu">
              <List viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
      {showMenuButtons && (
        <Modal
          show={showMenuButtons}
          onHide={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          animation={false}
          centered={true}
        >
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <Row className="px-0">
                <Col>
                  <button
                    type="button"
                    className="close m-1"
                    onClick={() => {
                      setShowMenuButtons(false);
                      setShowFloatingButtons(true);
                    }}
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
                setShowMenuButtons={setShowMenuButtons}
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
