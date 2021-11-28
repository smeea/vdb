import React, { useContext, useState, useRef } from 'react';
import { Modal, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ErrorOverlay from './ErrorOverlay.jsx';
import AppContext from '../../context/AppContext.js';

function ModalConfirmation(props) {
  const { isMobile } = useContext(AppContext);
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const refConfirmation = useRef(null);

  const handleConfirm = () => {
    if (props.withConfirmation) {
      if (confirmation === 'YES') {
        setErrorConfirmation(false);
      } else {
        setErrorConfirmation(true);
      }
    } else {
      props.handleConfirm();
    }
  };

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
          <h5>{props.headerText}</h5>
          <Button
            variant="outline-secondary"
            onClick={() => props.setShow(false)}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        {props.mainText && (
          <Modal.Body>
            <div className="pt-2">
              <h6>{props.mainText}</h6>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          {props.withConfirmation && (
            <Form onSubmit={handleConfirm}>
              <InputGroup>
                <FormControl
                  placeholder="Type 'YES' to confirm"
                  name="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  autoFocus={true}
                  ref={refConfirmation}
                />
              </InputGroup>
              <ErrorOverlay
                show={errorConfirmation}
                target={refConfirmation.current}
                placement="bottom"
                modal={true}
              >
                Type 'YES' to confirm
              </ErrorOverlay>
            </Form>
          )}
          <Button variant="danger" onClick={handleConfirm}>
            {props.buttonText}
          </Button>
          <Button variant="primary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirmation;
