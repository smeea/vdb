import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import SymmetryVertical from 'assets/images/icons/symmetry-vertical.svg';
import { useApp, useSearchForms } from 'context';
import defaultsPdaForm from 'components/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';

const DeckSearchSimilarButton = ({ deck }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const { setTwdFormState, setPdaFormState } = useSearchForms();
  const navigate = useNavigate();

  const handleClick = (src) => {
    if (src === 'twd') {
      setTwdFormState((prevState) => ({
        ...JSON.parse(JSON.stringify(defaultsTwdForm)),
        similar: deck.deckid,
      }));
    } else if (src === 'pda') {
      setPdaFormState((prevState) => ({
        ...JSON.parse(JSON.stringify(defaultsPdaForm)),
        similar: deck.deckid,
      }));
    }

    navigate(`/${src}?q={"similar"%3A"${deck.deckid}"}`);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const ButtonOptions = (
    <>
      <Dropdown.Item
        onClick={() => handleClick('twd')}
        title="Search similar Decks in Tournament Winning Decks Archive"
      >
        Search in TWD
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleClick('pda')}
        title="Search similar Decks in Public Decks Archive"
      >
        Search in PDA
      </Dropdown.Item>
    </>
  );

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="secondary"
      title={
        <div
          title="Search similar Decks in TWD/PDA"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex pe-2">
            <SymmetryVertical />
          </div>
          Similar Decks
        </div>
      }
    >
      {ButtonOptions}
    </DropdownButton>
  );
};

export default DeckSearchSimilarButton;
