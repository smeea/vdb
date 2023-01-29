import React, { useState } from 'react';
import Check2 from '@/assets/images/icons/check2.svg';
import PenFill from '@/assets/images/icons/pen-fill.svg';
import {
  Input,
  ConditionalTooltipOrModal,
  ErrorOverlay,
  Button,
} from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const TooltipText = () => {
  return (
    <>
      <div>Public name is default author name for new decks.</div>
      <div>
        Author name is per-deck and can be changed anytime for each deck.
      </div>
      <div>Public names are not unique.</div>
      <div>
        Changing public name will not change author name of your existing decks.
      </div>
      <div>
        Public name is <b>not</b> your account username (the one you login with, which cannot be changed).
      </div>
    </>
  );
};

const AccountChangeName = () => {
  const { publicName, setPublicName, isMobile } = useApp();
  const [state, setState] = useState(publicName || '');
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

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <PenFill />
        </div>
        <div className="flex">Change public name</div>
        <ConditionalTooltipOrModal title="Public name" isModal={isMobile} overlay={<TooltipText />}>
          <div className="text-fgThird dark:text-fgThirdDark">
            [?]
          </div>
        </ConditionalTooltipOrModal>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="relative flex w-full">
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
        </div>
      </form>
    </div>
  );
};

export default AccountChangeName;
