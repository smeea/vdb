import React, { useState, useEffect, useContext } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import PaletteFill from 'assets/images/icons/palette-fill.svg';
import AppContext from 'context/AppContext.js';

function DeckChangeBranchName(props) {
  const { deckUpdate, isMobile } = useContext(AppContext);

  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(props.deckid, 'branchName', state);
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
    if (state != props.branchName) {
      deckChangeBranchName();
    }
  };

  useEffect(() => {
    setState(props.branchName);
  }, [props.branchName]);

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
          readOnly={!props.isAuthor}
        />
        {isMobile && props.isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckChangeBranchName;
