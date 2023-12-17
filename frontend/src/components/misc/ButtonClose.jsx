import React from 'react';
import XLg from '@/assets/images/icons/x-lg.svg?react';
import { ButtonIconed } from '@/components';

const ButtonClose = ({ handleClick, title, className }) => {
  return (
    <ButtonIconed
      className={className}
      title={title}
      variant="primary"
      onClick={handleClick}
      icon={<XLg width="13" height="13" viewBox="0 0 16 16" />}
    />
  );
};

export default ButtonClose;
