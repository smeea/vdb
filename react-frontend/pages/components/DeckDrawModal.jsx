import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowClockwise from '../../assets/images/icons/arrow-clockwise.svg';
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
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="mx-2">Deck Draw</span>
          <span className="mx-2"></span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col md={12} lg={7}>
              {props.drawedCrypt && (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <b>Crypt</b>
                    <span className="mx-2">
                      {props.drawedCrypt.length} /{' '}
                      {props.drawedCrypt.length + props.restCrypt.length}
                    </span>
                    <div>
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleReDrawCrypt}
                      >
                        <ArrowClockwise size={20} />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleDrawOneCrypt}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <ResultCrypt
                    cards={props.drawedCrypt}
                    showSort={false}
                    showTotal={false}
                  />
                </>
              )}
            </Col>
            <Col md={12} lg={5}>
              {props.drawedLibrary && (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <b>Library</b>
                    <span className="mx-2">
                      {props.drawedLibrary.length} /{' '}
                      {props.drawedLibrary.length + props.restLibrary.length}
                    </span>
                    <div>
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleReDrawLibrary}
                      >
                        <ArrowClockwise size={20} />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={props.handleDrawOneLibrary}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <ResultLibrary
                    cards={props.drawedLibrary}
                    showSort={false}
                    showTotal={false}
                  />
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
