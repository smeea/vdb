import React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';

function ResultLibraryModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Body>
        <button type="button" className="close" onClick={props.handleClose}>
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
            <ResultLibraryPopover
              card={props.card}
              showImage={true}
              fullWidth={true}
              handleClose={props.handleClose}
            />
          </Tab>
          <Tab eventKey="text" title="Description">
            <div className="pt-2">
              <ResultLibraryPopover
                card={props.card}
                showImage={false}
              />
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ResultLibraryModal;
