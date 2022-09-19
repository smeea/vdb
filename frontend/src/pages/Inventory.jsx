import React, { useState, useRef } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import {
  AccountLogin,
  AccountRegister,
  ButtonIconed,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryDesktop,
  InventoryMobile,
  InventoryButtons,
  InventoryShowSelect,
} from 'components';
import { useApp } from 'context';

const Inventory = (props) => {
  const {
    username,
    isMobile,
    showMenuButtons,
    setShowMenuButtons,
    showFloatingButtons,
    setShowFloatingButtons,
    inventoryCrypt,
    inventoryLibrary,
  } = useApp();

  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

  const [missingByClan, setMissingByClan] = useState(undefined);
  const [missingByType, setMissingByType] = useState(undefined);
  const [missingByDiscipline, setMissingByDiscipline] = useState(undefined);

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef(null);
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef(null);

  return (
    <Container className="main-container p-0 px-md-1">
      {username ? (
        <>
          {isMobile ? (
            <InventoryMobile
              newCryptId={newCryptId}
              newLibraryId={newLibraryId}
              setNewCryptId={setNewCryptId}
              setNewLibraryId={setNewLibraryId}
              newCryptRef={newCryptRef}
              newLibraryRef={newLibraryRef}
              newCryptFocus={newCryptFocus}
              newLibraryFocus={newLibraryFocus}
              clan={clan}
              type={type}
              discipline={discipline}
              setClan={setClan}
              setType={setType}
              setDiscipline={setDiscipline}
              missingByClan={missingByClan}
              missingByType={missingByType}
              missingByDiscipline={missingByDiscipline}
              setMissingByClan={setMissingByClan}
              setMissingByType={setMissingByType}
              setMissingByDiscipline={setMissingByDiscipline}
              category={category}
              setCategory={setCategory}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
            />
          ) : (
            <Row className="mx-0">
              <InventoryDesktop
                newCryptId={newCryptId}
                newLibraryId={newLibraryId}
                setNewCryptId={setNewCryptId}
                setNewLibraryId={setNewLibraryId}
                newCryptRef={newCryptRef}
                newLibraryRef={newLibraryRef}
                newCryptFocus={newCryptFocus}
                newLibraryFocus={newLibraryFocus}
                clan={clan}
                type={type}
                discipline={discipline}
                setClan={setClan}
                setType={setType}
                setDiscipline={setDiscipline}
                missingByClan={missingByClan}
                missingByType={missingByType}
                missingByDiscipline={missingByDiscipline}
                setMissingByClan={setMissingByClan}
                setMissingByType={setMissingByType}
                setMissingByDiscipline={setMissingByDiscipline}
                category={category}
                setCategory={setCategory}
                setShowAddDeck={setShowAddDeck}
                setShowAddPrecon={setShowAddPrecon}
              />
            </Row>
          )}
        </>
      ) : (
        <Row className="align-items-center justify-content-center p-3 vh-80">
          <Col xs={12} md={7} lg={6} xl={5}>
            <div className="d-flex justify-content-center pb-3">
              <h6>Login required to manage inventory</h6>
            </div>
            <div className="py-4">
              <AccountLogin />
            </div>
            <div className="py-4">
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
              <InventoryButtons
                crypt={inventoryCrypt}
                library={inventoryLibrary}
                setShowAddDeck={setShowAddDeck}
                setShowAddPrecon={setShowAddPrecon}
                clan={clan}
                type={type}
                discipline={discipline}
                missingByClan={missingByClan}
                missingByType={missingByType}
                missingByDiscipline={missingByDiscipline}
                handleClose={() => {
                  setShowMenuButtons(false);
                  setShowFloatingButtons(true);
                }}
              />
              <div className="px-4 pt-2">
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
          handleClose={() => {
            setShowAddDeck(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          show={showAddPrecon}
          handleClose={() => {
            setShowAddPrecon(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
    </Container>
  );
};

export default Inventory;
