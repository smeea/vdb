import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import X from '../../assets/images/icons/x.svg';
import DeckDrawCryptTable from './DeckDrawCryptTable.jsx';
import DeckDrawLibraryTable from './DeckDrawLibraryTable.jsx';

function DeckDrawModal(props) {
  const totalCrypt = props.drawedCrypt.length + props.restCrypt.length;
  const totalLibrary = props.drawedLibrary.length + props.restLibrary.length;

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
          <Row className="px-0">
            <Col md={12} lg={7} className="px-0 pl-lg-4 pr-lg-3">
              {props.drawedCrypt && (
                <>
                  <div className="d-flex justify-content-between info-message">
                    <div className="d-flex align-items-center px-2">
                      <b>Crypt</b>
                    </div>
                    <div className="d-flex align-items-center">
                      {props.drawedCrypt.length} / {totalCrypt}
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleReDrawCrypt}
                      >
                        <span className="align-items-center">
                          <ArrowRepeat />
                        </span>
                      </Button>
                      <div className="lp-125">
                        <Button
                          variant="outline-secondary"
                          onClick={props.handleDrawOneCrypt}
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DeckDrawCryptTable
                    crypt={props.crypt}
                    total={totalCrypt}
                    resultCards={props.drawedCrypt}
                    className="search-crypt-table"
                    hideFloatingButtons={true}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isMobile={props.isMobile}
                  />
                  <br />
                </>
              )}
            </Col>
            <Col md={12} lg={5} className="px-0 pl-lg-3 pr-lg-4">
              {props.drawedLibrary && (
                <>
                  <div className="d-flex justify-content-between info-message">
                    <div className="d-flex align-items-center px-2">
                      <b>Library</b>
                    </div>
                    <div className="d-flex align-items-center">
                      {props.drawedLibrary.length} / {totalLibrary}
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleReDrawLibrary}
                      >
                        <ArrowRepeat />
                      </Button>
                      <div className="lp-125">
                        <Button
                          variant="outline-secondary"
                          onClick={props.handleDrawOneLibrary}
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DeckDrawLibraryTable
                    library={props.library}
                    total={totalLibrary}
                    resultCards={props.drawedLibrary}
                    className="search-library-table"
                    hideFloatingButtons={true}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isMobile={props.isMobile}
                  />
                  {!props.isMobile && <br />}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckDrawModal;
