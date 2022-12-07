import React from 'react';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import Plus from 'assets/images/icons/plus.svg';

const ToogleSearchAddButton = ({ addMode, toggleAddMode }) => {
  return (
    <div
      onClick={() => toggleAddMode()}
      className={`float-right-bottom flex float-add-${
        addMode ? 'on' : 'off'
      } items-center justify-center`}
    >
      {addMode ? (
        <BinocularsFill viewBox="0 -2 16 22" />
      ) : (
        <Plus viewBox="0 0 16 16" />
      )}
    </div>
  );
};

export default ToogleSearchAddButton;
