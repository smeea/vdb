import React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
    >
      <Modal.Body
        className="p-0"
      >
        <button type="button" className="close mx-3 my-2" onClick={props.handleClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <Tabs
          transition={false}
          activeKey={props.showImage ? 'image' : 'text'}
          defaultActiveKey={props.showImage ? 'image' : 'text'}
          onSelect={(k) => props.setShowImage(k == 'image' ? true : false)}
        >
          <Tab eventKey="image" title="Image">
            <ResultCryptPopover
              card={props.card}
              showImage={true}
              fullWidth={true}
              handleClose={props.handleClose}
            />
          </Tab>
          <Tab eventKey="text" title="Description">
            <div className="p-3">
              <ResultCryptPopover card={props.card} showImage={false} />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ResultCryptModal;
