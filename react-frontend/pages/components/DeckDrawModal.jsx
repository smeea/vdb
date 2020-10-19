import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ArrowClockwise from '../../assets/images/icons/arrow-clockwise.svg';
import Plus from '../../assets/images/icons/plus.svg';

import ResultCrypt from './ResultCrypt.jsx';
import ResultLibrary from './ResultLibrary.jsx';

function DeckDrawModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="mx-2">Crypt Draw</span>
          <span className="mx-2">
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {props.drawedCrypt && (
            <>
              <div className="d-flex justify-content-between">
                <span className="mx-2">
                  {props.drawedCrypt.length} /{' '}
                  {props.drawedCrypt.length + props.restCrypt.length}
                </span>
                <div>
                  <Button variant="outline-secondary" onClick={props.handleReDrawCrypt}>
                    <ArrowClockwise size={20} />
                  </Button>
                  <Button variant="outline-secondary" onClick={props.handleDrawOneCrypt}>
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
              <div>
                <ResultCrypt
                  cards={props.drawedCrypt}
                  showSort={false}
                  showTotal={false}
                />
              </div>
            </>
          )}
          {props.drawedLibrary && (
            <>
              <div className="d-flex justify-content-between">
                <span className="mx-2">
                  {props.drawedLibrary.length} /{' '}
                  {props.drawedLibrary.length + props.restLibrary.length}
                </span>
                <div>
                  <Button variant="outline-secondary" onClick={props.handleReDrawLibrary}>
                    <ArrowClockwise size={20} />
                  </Button>
                  <Button variant="outline-secondary" onClick={props.handleDrawOneLibrary}>
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
              <div>
                <ResultLibrary
                  cards={props.drawedLibrary}
                  showSort={false}
                  showTotal={false}
                />
              </div>
            </>
          )}
        </>
      </Modal.Body>
    </Modal>
  );
}

export default DeckDrawModal;
