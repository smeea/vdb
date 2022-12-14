import React from 'react';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import Plus from 'assets/images/icons/plus.svg';
import { ButtonFloat } from 'components';

const ToogleSearchAddButton = ({ addMode, toggleAddMode }) => {
  return (
    <ButtonFloat onClick={toggleAddMode} variant="float-add-on">
      {addMode ? (
        <BinocularsFill width="27" height="27" viewBox="0 1 16 16" />
      ) : (
        <Plus width="47" height="47" viewBox="0 0 16 16" />
      )}
    </ButtonFloat>
  );
};

export default ToogleSearchAddButton;
