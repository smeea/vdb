import React from 'react';
import { ButtonIconed } from 'components';
import Upload from 'assets/images/icons/upload.svg';

const InventoryImportButton = ({ handleClick }) => {
  return (
    <ButtonIconed
      variant="secondary"
      onClick={handleClick}
      title="Add cards from File"
      text="Add from File"
      icon={<Upload />}
    />
  );
};

export default InventoryImportButton;
