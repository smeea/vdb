import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import PaletteFill from '../../assets/images/icons/palette-fill.svg';

function DeckChangeBranchName(props) {
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeBranchName = () => {
    props.deckUpdate(props.deckid, 'branchName', state);
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
        {props.isMobile && (
          <InputGroup.Prepend>
            <InputGroup.Text>
              <PaletteFill />
            </InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!props.isAuthor}
        />
        {props.isMobile && props.isAuthor && (
          <InputGroup.Append>
            <Button
              variant={buttonState ? 'success' : 'outline-secondary'}
              type="submit"
            >
              <Check2 />
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckChangeBranchName;
