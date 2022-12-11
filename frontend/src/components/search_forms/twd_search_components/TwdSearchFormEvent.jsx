import React from 'react';

const TwdSearchFormEventAndButtons = ({ value, onChange }) => {
  return (
    <input
      className="text-form"
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
