import React, { useState, useContext } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
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
import AppContext from '../context/AppContext';

function Inventory(props) {
  const {
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    username,
    isMobile,
  } = useContext(AppContext);

  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');
  const [showCrypt, setShowCrypt] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container
      className={isMobile ? 'main-container px-0' : 'main-container py-4'}
    >
      {username ? (
        <>
          {isMobile ? (
            <>
              {showCrypt ? (
                <>
                  <div className="pt-1 px-1">
                    <DeckNewCryptCard
                      cardChange={props.cardChange}
                      cards={inventoryCrypt}
                      setNewId={setNewCryptId}
                      inInventory={true}
                    />
                  </div>
                  {newCryptId && inventoryCrypt[newCryptId] && (
                    <div className="pb-2 pt-3">
                      <InventoryCrypt
                        cards={{
                          [newCryptId]: inventoryCrypt[newCryptId],
                        }}
                        cardChange={props.cardChange}
                        compact={true}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {inventoryCrypt &&
                    (usedCryptCards.soft || usedCryptCards.hard) && (
                      <div className="pt-1">
                        <InventoryCrypt
                          category={category}
                          cards={inventoryCrypt}
                          cardChange={props.cardChange}
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
                      cardChange={props.cardChange}
                      cards={inventoryLibrary}
                      setNewId={setNewLibraryId}
                      inInventory={true}
                    />
                  </div>
                  {newLibraryId && inventoryLibrary[newLibraryId] && (
                    <div className="pb-2 pt-3">
                      <InventoryLibrary
                        cards={{
                          [newLibraryId]: inventoryLibrary[newLibraryId],
                        }}
                        cardChange={props.cardChange}
                        compact={true}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
                  {inventoryLibrary &&
                    (usedLibraryCards.soft || usedLibraryCards.hard) && (
                      <div className="pt-1">
                        <InventoryLibrary
                          category={category}
                          cards={inventoryLibrary}
                          cardChange={props.cardChange}
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                        />
                      </div>
                    )}
                </>
              )}
              {showFloatingButtons && (
                <div
                  onClick={() => setShowCrypt(!showCrypt)}
                  className="float-right-middle add"
                >
                  <div className="d-flex py-0 px-1 align-items-top">
                    <div className="d-inline" style={{ fontSize: '1.85em' }}>
                      {showCrypt ? 'LIB' : 'CR'}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Row>
              <Col xl={1} className="hide-narrow"></Col>
              <Col md={6} xl={5} className="px-0 px-md-1 px-xl-3">
                <DeckNewCryptCard
                  cardChange={props.cardChange}
                  cards={inventoryCrypt}
                  setNewId={setNewCryptId}
                  inInventory={true}
                />
                {newCryptId && inventoryCrypt[newCryptId] && (
                  <div className="pt-4">
                    <InventoryCrypt
                      cards={{
                        [newCryptId]: inventoryCrypt[newCryptId],
                      }}
                      cardChange={props.cardChange}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryCrypt &&
                  (usedCryptCards.soft || usedCryptCards.hard) && (
                    <div className="pt-4">
                      <InventoryCrypt
                        category={category}
                        cards={inventoryCrypt}
                        cardChange={props.cardChange}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
              </Col>
              <Col md={4} xl={4} className="px-0 px-md-1 px-xl-3">
                <DeckNewLibraryCard
                  cardChange={props.cardChange}
                  cards={inventoryLibrary}
                  setNewId={setNewLibraryId}
                  inInventory={true}
                />
                {newLibraryId && inventoryLibrary[newLibraryId] && (
                  <div className="pt-4">
                    <InventoryLibrary
                      cards={{
                        [newLibraryId]: inventoryLibrary[newLibraryId],
                      }}
                      cardChange={props.cardChange}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryLibrary &&
                  (usedLibraryCards.soft || usedLibraryCards.hard) && (
                    <div className="pt-4">
                      <InventoryLibrary
                        category={category}
                        cards={inventoryLibrary}
                        cardChange={props.cardChange}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                      />
                    </div>
                  )}
              </Col>
              <Col md={2} className="px-0 px-md-1 px-xl-3">
                <InventoryButtons
                  inventoryDeckAdd={props.inventoryDeckAdd}
                  inventoryAddToState={props.inventoryAddToState}
                  setInventoryCrypt={props.setInventoryCrypt}
                  setInventoryLibrary={props.setInventoryLibrary}
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
          <Col xs={12} md={5}>
            <div className="d-flex justify-content-center pb-3">
              <h6>Login required to manage inventory</h6>
            </div>
            <div className="py-2">
              <AccountLogin />
            </div>
            <div className="py-2">
              <AccountRegister />
            </div>
          </Col>
        </Row>
      )}
      {isMobile && showFloatingButtons && (
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
                inventoryDeckAdd={props.inventoryDeckAdd}
                inventoryAddToState={props.inventoryAddToState}
                setInventoryCrypt={props.setInventoryCrypt}
                setInventoryLibrary={props.setInventoryLibrary}
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
