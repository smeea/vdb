import { useCallback } from 'react';
import List from '@icons/list.svg?react';
import { ButtonFloat } from '@/components';
import { useApp } from '@/context';

const ButtonFloatMenu = () => {
  const { showFloatingButtons, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClick = useCallback(() => {
    setShowMenuButtons(true);
    setShowFloatingButtons(false);
  }, []);

  return (
    <>
      {showFloatingButtons && (
        <ButtonFloat onClick={handleClick}>
          <List width="35" height="35" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default ButtonFloatMenu;
