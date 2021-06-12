import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import AppContext from '../../context/AppContext.js';

function ModalConfirmation(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleCancel}
        animation={false}
        centered={isMobile}
      >
        <Modal.Body>
          <button
            type="button"
            className="close m-1"
            onClick={props.handleClose}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </button>
          <h5>{props.headerText}</h5>
          <div className="pt-2">
            {props.mainText && <h6>{props.mainText}</h6>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleConfirm}>
            {props.buttonText}
          </Button>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirmation;
