import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useSearchForms } from 'context';
import defaultsPda from 'components/forms_data/defaultsPdaForm.json';
import defaultsTwd from 'components/forms_data/defaultsTwdForm.json';

function ButtonSearchCardInDecks({ id, target }) {
  const { setPdaFormState, setTwdFormState } = useSearchForms();

  const navigate = useNavigate();
  const defaults = JSON.parse(
    JSON.stringify(target === 'pda' ? defaultsPda : defaultsTwd)
  );
  const value = { [id]: { q: 1, m: 'gt' } };
  const setForm = target === 'pda' ? setPdaFormState : setTwdFormState;

  const handleButton = () => {
    setForm(
      (prevState) => ({
        ...defaults,
        [id > 200000 ? 'crypt' : 'library']: value,
      }),
      navigate(
        `/${target}?q={"${
          id > 200000 ? 'crypt' : 'library'
        }"%3A{"${id}"%3A{"q"%3A1%2C"m"%3A"gt"}}}`
      )
    );
  };

  return (
    <Button
      title={`Search in ${target.toUpperCase}`}
      variant="primary"
      onClick={handleButton}
    >
      {target === 'pda' ? <PeopleFill /> : <TrophyFill />}
    </Button>
  );
}

export default ButtonSearchCardInDecks;
