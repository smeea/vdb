import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import PenFill from 'assets/images/icons/pen-fill.svg';
import { Input, Tooltip, ErrorOverlay, Modal, Button } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeName = () => {
  const { publicName, setPublicName, isMobile } = useApp();

  const [state, setState] = useState(publicName || '');
  // const refName = useRef();

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
      <div className="text-blue flex items-center text-lg font-bold">
        <PenFill />
        <span>Change public name</span>
        {!isMobile ? (
          <Tooltip text={tooltipText}>
            <span className="question-tooltip ">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip "
          >
            [?]
          </span>
        )}
      </div>
      <form className="flex" onSubmit={handleSubmitButton}>
        <Input
          placeholder="Public name"
          value={state}
          onChange={handleChange}
          className="w-full rounded-r-none"
          /* ref={refName} */
        />
        <Button
          className="rounded-l-none"
          variant={buttonState ? 'success' : 'primary'}
          type="submit"
        >
          {!spinnerState ? <Check2 /> : <Spinner />}
        </Button>
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
