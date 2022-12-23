import React, { useState } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import PenFill from 'assets/images/icons/pen-fill.svg';
import { Input, Tooltip, ErrorOverlay, Modal, Button } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeName = () => {
  const { publicName, setPublicName, isMobile } = useApp();
  const [state, setState] = useState(publicName || '');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onError = (e) => {
    if (e.message != 401) {
      setError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setPublicName(state);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const changeName = () => {
    setError(false);
    userServices.changeName(state, onSuccess, onError);
  };

  const handleSubmit = (event) => {
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
      <div className="flex items-center p-1 text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <PenFill />
        <div className="px-2">Change public name</div>
        {!isMobile ? (
          <Tooltip text={tooltipText}>
            <span className="text-fgThird dark:text-fgThirdDark ">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="text-fgThird dark:text-fgThirdDark "
          >
            [?]
          </span>
        )}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <Input
          placeholder="Public name"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full rounded-r-none"
        />
        <Button
          className="rounded-l-none"
          variant={success ? 'success' : 'primary'}
          type="submit"
        >
          <Check2 />
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
