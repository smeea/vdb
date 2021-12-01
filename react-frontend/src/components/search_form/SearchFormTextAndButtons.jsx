import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { useApp } from 'context';

function SearchFormTextAndButtons(props) {
  const { isMobile } = useApp();

  if (isMobile) {
    return (
      <FormControl
        placeholder="Card Name / Text / RegEx"
        type="text"
        name="text"
        autoComplete="off"
        spellCheck="false"
        value={props.value}
        onChange={props.onChange}
      />
    );
  } else {
    return (
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name="text"
          autoComplete="off"
          spellCheck="false"
          value={props.value}
          onChange={props.onChange}
        />
        {props.preresults > props.showLimit && (
          <Button variant="primary" onClick={props.handleShowResults}>
            <Check2 /> FOUND {props.preresults}
          </Button>
        )}
        <Button
          title="Clear Forms & Results"
          variant="primary"
          onClick={props.handleClearButton}
        >
          <X />
        </Button>
      </InputGroup>
    );
  }
}

export default SearchFormTextAndButtons;
