import React, { useState, useEffect, useContext } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import ChevronBarExpand from '../../assets/images/icons/chevron-bar-expand.svg';
import ChevronBarContract from '../../assets/images/icons/chevron-bar-contract.svg';
import ChatLeftQuoteFill from '../../assets/images/icons/chat-left-quote-fill.svg';
import AppContext from '../../context/AppContext';

function DeckDescription(props) {
  const { deckUpdate, isMobile } = useContext(AppContext);

  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [folded, setFolded] = useState(isMobile ? false : true);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeDescription = () => {
    deckUpdate(props.deckid, 'description', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeDescription();
  };

  const handleOnBlur = () => {
    if (state != props.description) {
      deckChangeDescription();
    }
  };

  useEffect(() => {
    setState(props.description);
  }, [props.description]);

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup className="z-index-0">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <ChatLeftQuoteFill />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as={folded ? 'input' : 'textarea'}
          rows={8}
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!props.isAuthor}
        />
        {!isMobile && (
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => setFolded(!folded)}
            >
              {folded ? <ChevronBarExpand /> : <ChevronBarContract />}
            </Button>
          </InputGroup.Append>
        )}
        {isMobile && props.isAuthor && (
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

export default DeckDescription;
