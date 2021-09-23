import React, { useContext } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';
import AppContext from '../../context/AppContext.js';

function SearchFormTextAndButtons(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <InputGroup className={isMobile ? 'd-block mb-1' : 'mb-2'}>
      <FormControl
        placeholder="Card Name / Text"
        type="text"
        name="text"
        autoComplete="off"
        spellCheck="false"
        value={props.value}
        onChange={props.onChange}
      />
      {!isMobile && props.preresults > props.showLimit && (
        <Button variant="primary" onClick={props.handleShowResults}>
          <Check2 /> FOUND {props.preresults}
        </Button>
      )}
      {!isMobile && (
        <Button variant="primary" onClick={props.handleClearButton}>
          <X />
        </Button>
      )}
    </InputGroup>
  );
}

export default SearchFormTextAndButtons;
