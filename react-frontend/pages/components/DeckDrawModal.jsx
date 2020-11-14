import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import ResultCrypt from './ResultCrypt.jsx';
import ResultLibrary from './ResultLibrary.jsx';

function DeckDrawModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      size="xl"
    >
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0 pt-2">
            <Col>
              <button
                type="button"
                className="close"
                onClick={props.handleClose}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
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
                      {props.drawedCrypt.length} /{' '}
                      {props.drawedCrypt.length + props.restCrypt.length}
                    </div>
                    <div>
                      <Button
                        className="full-height"
                        variant="outline-secondary"
                        onClick={props.handleReDrawCrypt}
                      >
                        <span className="align-items-center">
                          <ArrowRepeat />
                        </span>
                      </Button>
                      <Button
                        className="full-height"
                        variant="outline-secondary"
                        onClick={props.handleDrawOneCrypt}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                  <ResultCrypt
                    cards={props.drawedCrypt}
                    showSort={false}
                    showTotal={false}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isMobile={props.isMobile}
                  />
                  {!props.isMobile && <br />}
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
                      {props.drawedLibrary.length} /{' '}
                      {props.drawedLibrary.length + props.restLibrary.length}
                    </div>
                    <div>
                      <Button
                        className="full-height"
                        variant="outline-secondary"
                        onClick={props.handleReDrawLibrary}
                      >
                        <ArrowRepeat />
                      </Button>
                      <Button
                        className="full-height"
                        variant="outline-secondary"
                        onClick={props.handleDrawOneLibrary}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                  <ResultLibrary
                    cards={props.drawedLibrary}
                    showSort={false}
                    showTotal={false}
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
