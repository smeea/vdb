import React, { useState, useRef } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { Modal, Button, ErrorOverlay } from 'components';
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
  size,
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
        handleClose={cancel}
        centered={isMobile}
        size={size ?? null}
        dialogClassName={nested ? 'nested-modal' : 'no-border'}
        title={headerText}
      >
        {mainText && <div className="font-bold text-blue">{mainText}</div>}
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
      </Modal>
    </>
  );
};

export default ModalConfirmation;
