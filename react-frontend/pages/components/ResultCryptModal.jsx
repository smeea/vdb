import React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ResultCryptPopover from './ResultCryptPopover.jsx';

function ResultCryptModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Body className="p-0">
        <button type="button" className="close m-1" onClick={props.handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
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
          <Tab eventKey="text" title="Text">
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
