import React from 'react';

const TwdSearchFormEventAndButtons = ({ value, onChange }) => {
  return (
    <input
      placeholder="Event Name"
      type="text"
      name="event"
      autoComplete="off"
      spellCheck="false"
      value={value}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormEventAndButtons;
