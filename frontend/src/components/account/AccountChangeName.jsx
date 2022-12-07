import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import PenFill from 'assets/images/icons/pen-fill.svg';
import { Tooltip, ErrorOverlay, Modal, Button } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeName = () => {
  const { publicName, setPublicName, isMobile } = useApp();

  const [state, setState] = useState(publicName || '');
  const refName = useRef();

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [error, setError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const onError = (e) => {
    if (e.message != 401) {
      setError('CONNECTION PROBLEM');
    }
    setSpinnerState(false);
  };

  const onSuccess = () => {
    setSpinnerState(false);
    setButtonState(true);
    setPublicName(state);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const changeName = () => {
    setError(false);
    setSpinnerState(true);
    userServices.changeName(state, onSuccess, onError);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeName();
  };

  const tooltipText = (
    <>
      Public name is default author name for new decks.
      <br />
      Author name is per-deck and can be changed anytime for each deck.
      <br />
      Public names are not unique.
      <br />
      Changing public name will not change author name of your existing decks.
      <br />
      Public name is *not* your account username which cannot be changed.
    </>
  );

  return (
    <>
      <div className="font-bold text-lg text-blue flex items-center p-1">
        <PenFill />
        <span className="ms-2">Change public name</span>
        {!isMobile ? (
          <Tooltip text={tooltipText}>
            <span className="question-tooltip ms-1">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip ms-1"
          >
            [?]
          </span>
        )}
      </div>
      <form className="my-1" onSubmit={handleSubmitButton}>
        <div className="input-group">
          <input
            placeholder="Public name"
            type="text"
            name="publicName"
            value={state}
            onChange={handleChange}
            ref={refName}
          />
          {!buttonState ? (
            !spinnerState ? (
              <Button variant="primary" type="submit">
                <Check2 />
              </Button>
            ) : (
              <Button variant="primary">
                <Spinner animation="border" size="sm" />
              </Button>
            )
          ) : (
            <Button variant="success" type="submit">
              <Check2 />
            </Button>
          )}
        </div>
        {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
      </form>
      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <div>{tooltipText}</div>
        </Modal>
      )}
    </>
  );
};

export default AccountChangeName;
