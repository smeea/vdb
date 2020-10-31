import React, { useState } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptModal(props) {
  const [key, setKey] = useState('image');

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
    >
      <Modal.Body>
        <button
          type="button"
          className="close"
          onClick={props.handleClose}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <Tabs
          transition={false}
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="image" title="Image">
            <ResultCryptPopover
              card={props.card}
              showImage={false}
              fullWidth={true}
              handleClose={props.handleClose}
            />
          </Tab>
          <Tab eventKey="text" title="Description">
            <ResultCryptPopover
              card={props.card}
              showImage={true}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ResultCryptModal;
