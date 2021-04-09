import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import X from '../../assets/images/icons/x.svg';
import DeckDrawCryptTable from './DeckDrawCryptTable.jsx';
import DeckDrawLibraryTable from './DeckDrawLibraryTable.jsx';

function DeckDrawModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      size="xl"
      dialogClassName={!props.isMobile ? 'modal-deck-draw' : null}
    >
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0 pt-2">
            <Col className="px-0">
              <button
                type="button"
                className="close m-1"
                onClick={props.handleClose}
              >
                <X width="32" height="32" viewBox="0 0 16 16" />
              </button>
              <div className="d-flex justify-content-center">
                <h5>Deck Draw</h5>
              </div>
            </Col>
          </Row>
          <Row className="px-0 pb-4">
            <Col md={12} lg={7} className="px-0 pl-lg-4 pr-lg-3">
              <div className={props.isMobile ? 'pb-4' : null}>
                <div className="d-flex justify-content-between info-message">
                  <div className="d-flex align-items-center px-2">
                    <b>Uncontrolled</b>
                  </div>
                  <div className="d-flex align-items-center">
                    <b>
                      {props.drawedCrypt.length} + {props.restCrypt.length}
                    </b>
                  </div>
                  <div className="d-flex">
                    <Button
                      variant="outline-secondary"
                      onClick={props.handleReDrawCrypt}
                      disabled={props.cryptTotal < 4}
                    >
                      <span className="align-items-center">
                        <ArrowRepeat />
                      </span>
                    </Button>
                    <div className="lp-125">
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleDrawOneCrypt}
                        disabled={props.restCrypt.length < 1}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                </div>
                {props.cryptTotal < 4 && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                    <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                  </div>
                )}
                <DeckDrawCryptTable
                  burnCrypt={props.burnCrypt}
                  crypt={props.crypt}
                  total={props.drawedCrypt.length + props.restCrypt.length}
                  resultCards={props.drawedCrypt}
                  className="search-crypt-table"
                  showImage={props.showImage}
                  setShowImage={props.setShowImage}
                  isMobile={props.isMobile}
                  isWide={true}
                />
              </div>
            </Col>
            <Col md={12} lg={5} className="px-0 pl-lg-3 pr-lg-4">
              <div className="d-flex justify-content-between info-message">
                <div className="d-flex align-items-center px-2">
                  <b>Hand</b>
                </div>
                <div className="d-flex align-items-center">
                  <b>
                    {props.drawedLibrary.length} + {props.restLibrary.length}
                  </b>
                </div>
                <div className="d-flex">
                  <Button
                    variant="outline-secondary"
                    onClick={props.handleReDrawLibrary}
                    disabled={props.libraryTotal < 7}
                  >
                    <ArrowRepeat />
                  </Button>
                  <div className="lp-125">
                    <Button
                      variant="outline-secondary"
                      onClick={props.handleDrawOneLibrary}
                      disabled={props.restLibrary.length < 1}
                    >
                      +1
                    </Button>
                  </div>
                </div>
              </div>
              {props.libraryTotal < 7 && (
                <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                  <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                </div>
              )}
              <DeckDrawLibraryTable
                burnLibrary={props.burnLibrary}
                library={props.library}
                total={props.drawedLibrary.length + props.restLibrary.length}
                resultCards={props.drawedLibrary}
                className="search-library-table"
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                isMobile={props.isMobile}
              />
            </Col>
          </Row>
          {(props.burnedCrypt.length > 0 || props.burnedLibrary.length > 0) && (
            <Row className="px-0 pb-4">
              <Col md={12} lg={7} className="px-0 pl-lg-4 pr-lg-3">
                {props.burnedCrypt.length > 0 && (
                  <div className={props.isMobile ? 'pb-4' : null}>
                    <div className="d-flex justify-content-between info-message">
                      <div className="d-flex align-items-center px-2">
                        <b>Controlled</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedCrypt.length}</b>
                      </div>
                      <div />
                    </div>
                    <DeckDrawCryptTable
                      burnCrypt={null}
                      crypt={props.crypt}
                      total={props.drawedCrypt.length + props.restCrypt.length}
                      resultCards={props.burnedCrypt}
                      className="search-crypt-table"
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                      isMobile={props.isMobile}
                      isWide={true}
                    />
                  </div>
                )}
              </Col>
              <Col md={12} lg={5} className="px-0 pl-lg-3 pr-lg-4">
                {props.burnedLibrary.length > 0 && (
                  <>
                    <div className="d-flex justify-content-between info-message">
                      <div className="d-flex align-items-center px-2">
                        <b>Ash Heap</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedLibrary.length}</b>
                      </div>
                      <div />
                    </div>
                    <DeckDrawLibraryTable
                      burnLibrary={null}
                      library={props.library}
                      total={
                        props.drawedLibrary.length + props.restLibrary.length
                      }
                      resultCards={props.burnedLibrary}
                      className="search-library-table"
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                      isMobile={props.isMobile}
                    />
                  </>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckDrawModal;
