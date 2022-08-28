import React, { useState, useRef } from 'react';
import { Modal, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp } from 'context';

const ModalConfirmation = ({
  show,
  headerText,
  mainText,
  buttonText,
  withConfirmation,
  handleConfirm,
  handleCancel,
  nested,
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const refConfirmation = useRef(null);

  const confirm = () => {
    if (withConfirmation) {
      if (confirmation === 'YES') {
        setErrorConfirmation(false);
        setConfirmation('');
        handleConfirm();
      } else {
        setErrorConfirmation(true);
      }
    } else {
      handleConfirm();
    }
  };

  const cancel = () => {
    setErrorConfirmation(false);
    setConfirmation('');
    handleCancel();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={cancel}
        animation={false}
        centered={isMobile}
        dialogClassName={nested ? 'nested-modal' : 'no-border'}
      >
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <h5>{headerText}</h5>
          <Button variant="outline-secondary" onClick={cancel}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        {mainText && (
          <Modal.Body>
            <div className="pt-2">
              <h6>{mainText}</h6>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          {withConfirmation && (
            <Form onSubmit={confirm}>
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
                Type &apos;YES&apos; to confirm
              </ErrorOverlay>
            </Form>
          )}
          {buttonText && (
            <Button variant="danger" onClick={confirm}>
              {buttonText}
            </Button>
          )}
          <Button variant="primary" onClick={cancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
