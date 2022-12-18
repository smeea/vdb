import React, { useState } from 'react';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const ReviewCopyUrlButton = ({ deckid, urlDiff }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [success, setSuccess] = useState(false);

  const handleStandard = () => {
    const deckUrl = `${process.env.ROOT_URL}review/${deckid}#${urlDiff}`;

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
      title="Copy URL"
      icon={<Link45Deg width="19" height="19" viewBox="0 0 15 15" />}
      text={success ? 'Copied' : 'Copy URL'}
    />
  );
};

export default ReviewCopyUrlButton;
