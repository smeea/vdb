import React, { useState } from 'react';
import Link45Deg from '@/assets/images/icons/link-45deg.svg';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DiffCopyUrlButton = ({ deckFromId, deckToId }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [success, setSuccess] = useState(false);

  const handleStandard = () => {
    const deckUrl = `${
      import.meta.env.VITE_BASE_URL
    }/diff/${deckFromId}/${deckToId}`;

    navigator.clipboard.writeText(deckUrl);
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
      title="Copy Standard Deck URL (will follow future deck changes)"
      icon={<Link45Deg width="19" height="19" viewBox="0 0 15 15" />}
      text={success ? 'Copied' : 'Copy URL'}
    />
  );
};

export default DiffCopyUrlButton;
