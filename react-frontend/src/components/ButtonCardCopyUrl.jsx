import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';

const ButtonCardCopyUrl = ({ cardid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  const [state, setState] = useState(false);

  const deckUrl = `${process.env.ROOT_URL}cards/${cardid}`;

  const handleButton = () => {
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
        <Button
          className="card-buttons"
          variant="primary"
          onClick={handleButton}
          title="Copy URL"
        >
          <div className="d-flex align-items-center">
            <Link45Deg width="19" height="19" viewBox="0 0 14 14" />
          </div>
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton}>
          Copied
        </Button>
      )}
    </>
  );
};

export default ButtonCardCopyUrl;
