import React from 'react';
import X from '@/assets/images/icons/x.svg?react';
import { ButtonFloat } from '@/components';

const ButtonFloatClose = ({ handleClose, position }) => {
  return (
    <ButtonFloat onClick={handleClose} variant="danger" position={position}>
      <X width="40" height="40" viewBox="0 0 16 16" />
    </ButtonFloat>
  );
};

export default ButtonFloatClose;
