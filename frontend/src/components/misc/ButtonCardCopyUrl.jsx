import React, { useState } from 'react';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { ButtonIconed } from 'components';

const ButtonCardCopyUrl = ({ cardid }) => {
  const [success, setSuccess] = useState(false);
  const deckUrl = `${process.env.ROOT_URL}cards/${cardid}`;

  const onClick = () => {
    navigator.clipboard.writeText(deckUrl);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  return (
    <ButtonIconed
      icon={<Link45Deg width="20" height="20" viewBox="0 2 14 14" />}
      variant={success ? 'success' : 'primary'}
      onClick={onClick}
      title="Copy URL"
      text={success ? 'Copied' : null}
    />
  );
};

export default ButtonCardCopyUrl;
