import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import {
  AccountLogin,
  AccountRegister,
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  InventoryButtons,
  InventoryShowSelect,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
} from 'components';
import { useApp } from 'context';

function Inventory(props) {
  const {
    cryptCardBase,
    libraryCardBase,
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    username,
    isMobile,
    inventoryDeckAdd,
    inventoryDeckDelete,
    inventoryAddToState,
    setInventoryCrypt,
    setInventoryLibrary,
  } = useApp();

  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');
  const [showCrypt, setShowCrypt] = useState(true);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

  const handleShowButtons = (state) => {
    setShowMenuButtons(state);
    setShowFloatingButtons(!state);
  };

  return (
    <Container className="main-container p-0 px-md-1">
      {username ? (
        <>
          {isMobile ? (
            <>
              {showCrypt ? (
                <>
                  <div className="sticky-selector py-1 px-1">
                    <InventoryNewCryptCard
                      cards={inventoryCrypt}
                      setNewId={setNewCryptId}
                    />
                  </div>
                  {newCryptId && (
                    <div className="sticky-inv-result">
                      <InventoryCrypt
                        cards={{
                          [newCryptId]: inventoryCrypt[newCryptId]
                            ? inventoryCrypt[newCryptId]
                            : { c: cryptCardBase[newCryptId], q: 0 },
                        }}
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
                          withCompact={newCryptId}
                          category={category}
                          cards={inventoryCrypt}
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                          clan={clan}
                          setClan={setClan}
                        />
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="sticky-selector py-1 px-1">
                    <InventoryNewLibraryCard
                      cards={inventoryLibrary}
                      setNewId={setNewLibraryId}
                    />
                  </div>
                  {newLibraryId && (
                    <div className="sticky-inv-result">
                      <InventoryLibrary
                        cards={{
                          [newLibraryId]: inventoryLibrary[newLibraryId]
                            ? inventoryLibrary[newLibraryId]
                            : { c: libraryCardBase[newLibraryId], q: 0 },
                        }}
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
                          withCompact={newLibraryId}
                          category={category}
                          cards={inventoryLibrary}
                          showFloatingButtons={showFloatingButtons}
                          setShowFloatingButtons={setShowFloatingButtons}
                          type={type}
                          setType={setType}
                          discipline={discipline}
                          setDiscipline={setDiscipline}
                        />
                      </div>
                    )}
                </>
              )}
              {showFloatingButtons && (
                <div
                  onClick={() => setShowCrypt(!showCrypt)}
                  className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
                >
                  <div className="d-inline" style={{ fontSize: '1.6em' }}>
                    {showCrypt ? 'LIB' : 'CR'}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Row className="mx-0">
              <Col xl={1} className="hide-narrow"></Col>
              <Col md={6} lg={6} xl={5} className="px-0 px-md-2 pe-xl-3">
                <div className="sticky-selector pt-3 pb-2">
                  <InventoryNewCryptCard
                    cards={inventoryCrypt}
                    setNewId={setNewCryptId}
                  />
                </div>
                {newCryptId && (
                  <div className="sticky-inv-result py-2">
                    <InventoryCrypt
                      cards={{
                        [newCryptId]: inventoryCrypt[newCryptId]
                          ? inventoryCrypt[newCryptId]
                          : { c: cryptCardBase[newCryptId], q: 0 },
                      }}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryCrypt &&
                  (usedCryptCards.soft || usedCryptCards.hard) && (
                    <div className="pt-2">
                      <InventoryCrypt
                        withCompact={newCryptId}
                        category={category}
                        cards={inventoryCrypt}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                        clan={clan}
                        setClan={setClan}
                      />
                    </div>
                  )}
              </Col>
              <Col md={6} lg={6} xl={4} className="px-0 px-md-2 px-xl-3">
                <div className="sticky-selector pt-3 pb-2">
                  <InventoryNewLibraryCard
                    cards={inventoryLibrary}
                    setNewId={setNewLibraryId}
                  />
                </div>
                {newLibraryId && (
                  <div className="sticky-inv-result py-2">
                    <InventoryLibrary
                      cards={{
                        [newLibraryId]: inventoryLibrary[newLibraryId]
                          ? inventoryLibrary[newLibraryId]
                          : { c: libraryCardBase[newLibraryId], q: 0 },
                      }}
                      compact={true}
                      showFloatingButtons={showFloatingButtons}
                      setShowFloatingButtons={setShowFloatingButtons}
                    />
                  </div>
                )}
                {inventoryLibrary &&
                  (usedLibraryCards.soft || usedLibraryCards.hard) && (
                    <div className="pt-2">
                      <InventoryLibrary
                        withCompact={newLibraryId}
                        category={category}
                        cards={inventoryLibrary}
                        showFloatingButtons={showFloatingButtons}
                        setShowFloatingButtons={setShowFloatingButtons}
                        type={type}
                        setType={setType}
                        discipline={discipline}
                        setDiscipline={setDiscipline}
                      />
                    </div>
                  )}
              </Col>
              <Col lg={2} className="hide-on-lt1200px px-0 px-lg-2 px-xl-3">
                <div className="sticky-buttons">
                  <InventoryButtons
                    setShowAddDeck={setShowAddDeck}
                    setShowAddPrecon={setShowAddPrecon}
                    inventoryAddToState={inventoryAddToState}
                    setInventoryCrypt={setInventoryCrypt}
                    setInventoryLibrary={setInventoryLibrary}
                    setShowButtons={handleShowButtons}
                    clan={clan}
                    discipline={discipline}
                    type={type}
                  />
                  <div className="px-4 py-2">
                    <InventoryShowSelect
                      category={category}
                      setCategory={setCategory}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row className="align-items-center justify-content-center p-3 vh-80">
          <Col xs={12} md={7} lg={6} xl={5}>
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
      {showFloatingButtons && (
        <div
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          className="hide-on-gt1200px d-flex float-right-bottom float-menu align-items-center justify-content-center"
        >
          <List viewBox="0 0 16 16" />
        </div>
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
          size="sm"
        >
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setShowMenuButtons(false);
                    setShowFloatingButtons(true);
                  }}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </div>
              <InventoryButtons
                setShowAddDeck={setShowAddDeck}
                setShowAddPrecon={setShowAddPrecon}
                inventoryAddToState={inventoryAddToState}
                setInventoryCrypt={setInventoryCrypt}
                setInventoryLibrary={setInventoryLibrary}
                setShowButtons={handleShowButtons}
                clan={clan}
                discipline={discipline}
                type={type}
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
      {showAddDeck && (
        <InventoryAddDeckModal
          show={showAddDeck}
          handleClose={() => setShowAddDeck(false)}
          inventoryDeckAdd={inventoryDeckAdd}
          inventoryDeckDelete={inventoryDeckDelete}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          show={showAddPrecon}
          handleClose={() => setShowAddPrecon(false)}
          inventoryDeckAdd={inventoryDeckAdd}
          inventoryDeckDelete={inventoryDeckDelete}
        />
      )}
    </Container>
  );
}

export default Inventory;
