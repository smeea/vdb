import React from 'react';
import Recycle from '@/assets/images/icons/recycle.svg';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const SeatingButton = ({ setShow }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const handleClick = () => {
    setShow(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Table Seating"
      icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
      text="Table Seating"
    />
  );
};

export default SeatingButton;
