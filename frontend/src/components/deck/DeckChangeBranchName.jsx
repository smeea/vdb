import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import PaletteFill from 'assets/images/icons/palette-fill.svg';
import { Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckChangeBranchName = ({ deck }) => {
  const { isMobile } = useApp();
  const { deckid, branchName, isAuthor, isPublic, isFrozen } = deck;
  const [state, setState] = useState(branchName);
  const [buttonState, setButtonState] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (state !== branchName) setState(branchName);
  }, [branchName]);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(deckid, 'branchName', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeBranchName();
  };

  const handleOnBlur = () => {
    if (state != branchName) {
      deckChangeBranchName();
    }
  };

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        {isMobile && (
          <InputGroup.Text>
            <PaletteFill />
          </InputGroup.Text>
        )}
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
        {isMobile && isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default DeckChangeBranchName;
