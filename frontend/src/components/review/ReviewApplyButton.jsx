import React, { useState } from 'react';
import Check2All from '@/assets/images/icons/check2-all.svg?react';
import { useApp, deckUpdate } from '@/context';
import { ButtonIconed } from '@/components';
import { CRYPT, LIBRARY, CARDS } from '@/constants';

const ReviewApplyButton = ({ deck, parentId }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleStandard = async () => {
    const response = await deckUpdate(parentId, CARDS, {
      [CRYPT]: deck[CRYPT],
      [LIBRARY]: deck[LIBRARY],
    });
    if (response?.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <ButtonIconed
      variant={success ? 'success' : error ? 'danger' : isDesktop ? 'secondary' : 'primary'}
      onClick={handleStandard}
      title="Apply Changes"
      icon={<Check2All width="20" height="20" viewBox="0 0 16 16" />}
      text={success ? 'Applied' : error ? 'Error' : 'Apply Changes'}
    />
  );
};

export default ReviewApplyButton;
