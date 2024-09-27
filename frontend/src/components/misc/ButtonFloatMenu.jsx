import React from 'react';
import List from '@/assets/images/icons/list.svg?react';
import { ButtonFloat } from '@/components';
import { useApp } from '@/context';

const ButtonFloatMenu = () => {
  const { showFloatingButtons, setShowFloatingButtons, setShowMenuButtons } = useApp();

  return (
    <>
      {showFloatingButtons && (
        <ButtonFloat
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          variant="primary"
        >
          <List width="35" height="35" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default ButtonFloatMenu;
