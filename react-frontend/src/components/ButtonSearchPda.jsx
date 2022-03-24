import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsPdaForm.json';

function ButtonSearchPda({ id }) {
  const { setPdaFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const value = { [id]: { q: 1, m: 'gt' } };

  const handleButton = () => {
    setPdaFormState((prevState) => ({
      ...def,
      [id > 200000 ? 'crypt' : 'library']: value,
    }));
    navigate(
      `/pda?q={"${
        id > 200000 ? 'crypt' : 'library'
      }"%3A{"${id}"%3A{"q"%3A1%2C"m"%3A"gt"}}}`
    );
  };

  return (
    <Button title="Search in PDA" variant="primary" onClick={handleButton}>
      <PeopleFill />
    </Button>
  );
}

export default ButtonSearchPda;
