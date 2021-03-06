import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function SearchFormTextAndButtons(props) {
  return (
    <InputGroup className={props.isMobile ? 'd-block mb-1' : 'mb-2'}>
      <FormControl
        placeholder="Card Name / Text"
        type="text"
        name="text"
        value={props.value}
        onChange={props.onChange}
      />
      <InputGroup.Append>
        {!props.isMobile && props.preresults > props.showLimit && (
          <Button variant="outline-secondary" onClick={props.handleShowResults}>
            <Check2 /> FOUND {props.preresults}
          </Button>
        )}
        {!props.isMobile && (
          <Button variant="outline-secondary" onClick={props.handleClearButton}>
            <X />
          </Button>
        )}
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchFormTextAndButtons;
