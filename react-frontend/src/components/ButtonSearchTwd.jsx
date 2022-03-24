import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsTwdForm.json';

function ButtonSearchTwd({ id }) {
  const { setTwdFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const value = { [id]: { q: 1, m: 'gt' } };

  const handleButton = () => {
    setTwdFormState((prevState) => ({
      ...def,
      [id > 200000 ? 'crypt' : 'library']: value,
    }));
    navigate(
      `/twd?q={"${
        id > 200000 ? 'crypt' : 'library'
      }"%3A{"${id}"%3A{"q"%3A1%2C"m"%3A"gt"}}}`
    );
  };

  return (
    <Button title="Search in TWD" variant="primary" onClick={handleButton}>
      <TrophyFill />
    </Button>
  );
}

export default ButtonSearchTwd;
