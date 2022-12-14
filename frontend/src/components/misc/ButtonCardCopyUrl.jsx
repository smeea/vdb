import React, { useState } from 'react';
import { Button } from 'components';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';

const ButtonCardCopyUrl = ({ cardid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  const [state, setState] = useState(false);

  const deckUrl = `${process.env.ROOT_URL}cards/${cardid}`;

  const onClick = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 1000);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      {!state ? (
        <Button variant="primary" onClick={onClick} title="Copy URL">
          <Link45Deg width="20" height="20" viewBox="0 2 14 14" />
        </Button>
      ) : (
        <Button variant="success" onClick={onClick}>
          Copied
        </Button>
      )}
    </>
  );
};

export default ButtonCardCopyUrl;
