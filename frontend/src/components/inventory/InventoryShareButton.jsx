import React, { useState } from 'react';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { ButtonIconed } from 'components';
import { useApp } from 'context';

const InventoryShareButton = ({ setShow, handleClose }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();

  return (
    <ButtonIconed
      variant="secondary"
      title="Share Inventory"
      onClick={() => {
        setShow(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(false);
      }}
      icon={<Link45Deg width="21" height="21" viewBox="0 0 15 15" />}
      text="Share Inventory"
    />
  );
};

export default InventoryShareButton;
