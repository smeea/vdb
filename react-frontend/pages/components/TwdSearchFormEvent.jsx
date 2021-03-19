import React from 'react';
import { FormControl } from 'react-bootstrap';

function TwdSearchFormEventAndButtons({ value, onChange }) {
  return (
    <FormControl
      placeholder="Event Name"
      type="text"
      name="event"
      autocomplete="off"
      spellcheck="false"
      value={value}
      onChange={onChange}
    />
  );
}

export default TwdSearchFormEventAndButtons;
