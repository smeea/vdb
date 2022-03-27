import React from 'react';
import { useNavigate } from 'react-router-dom';
import Folder2Open from 'assets/images/icons/folder2-open.svg';
import ButtonIconed from 'components/ButtonIconed.jsx';

function DeckCopyUrl(props) {
  const navigate = useNavigate();
  return (
    <ButtonIconed
      variant="secondary"
      onClick={() =>
        navigate(props.deckid ? `/decks?id=${props.deckid}` : '/decks')
      }
      title="Back to Decks"
      icon={<Folder2Open />}
      text="Back to Decks"
    />
  );
}

export default DeckCopyUrl;
