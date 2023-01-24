import React, { useState } from 'react';
import Check2All from '@/assets/images/icons/check2-all.svg';
import { useApp, deckUpdate } from '@/context';
import { ButtonIconed } from '@/components';

const ReviewApplyButton = ({ deck, parentId }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [success, setSuccess] = useState(false);

  const handleStandard = () => {
    deckUpdate(parentId, 'cards', { crypt: deck.crypt, library: deck.library });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <ButtonIconed
      variant={success ? 'success' : 'secondary'}
      onClick={handleStandard}
      title="Apply Changes"
      icon={<Check2All width="20" height="20" viewBox="0 0 16 16" />}
      text={success ? 'Applied' : 'Apply Changes'}
    />
  );
};

export default ReviewApplyButton;
