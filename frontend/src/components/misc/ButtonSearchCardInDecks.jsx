import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components';
import PeopleFill from '@icons/people-fill.svg?react';
import TrophyFill from '@icons/trophy-fill.svg?react';
import { clearSearchForm, searchTwdForm, searchPdaForm } from '@/context';
import { CRYPT, LIBRARY, PDA, GT } from '@/constants';

const ButtonSearchCardInDecks = ({ cardid, target, handleClose }) => {
  const navigate = useNavigate();
  const value = { [cardid]: { q: 1, m: GT } };

  const handleClick = () => {
    clearSearchForm(target);
    if (target === PDA) {
      searchPdaForm[cardid > 200000 ? CRYPT : LIBRARY] = value;
    } else {
      searchTwdForm[cardid > 200000 ? CRYPT : LIBRARY] = value;
    }
    navigate(
      `/${target}?q={"${
        cardid > 200000 ? CRYPT : LIBRARY
      }"%3A{"${cardid}"%3A{"q"%3A1%2C"m"%3A"gt"}}}`,
    );

    handleClose && handleClose();
  };

  return (
    <Button title={`Search in ${target.toUpperCase()}`} onClick={handleClick}>
      {target === PDA ? <PeopleFill /> : <TrophyFill />}
    </Button>
  );
};

export default ButtonSearchCardInDecks;
