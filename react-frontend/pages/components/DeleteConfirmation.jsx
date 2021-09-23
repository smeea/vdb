import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import AppContext from '../../context/AppContext.js';

function DeleteConfirmation(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleCancel}
        animation={false}
        centered={isMobile}
      >
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <h5>{`Delete ${props.target}?`}</h5>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="pt-2">
            {props.text && <h6>{props.text}</h6>}
            <h6>THIS CANNOT BE UNDONE!</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleConfirm}>
            Delete
          </Button>
          <Button variant="primary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
