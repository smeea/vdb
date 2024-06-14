import React from 'react';
import { Button } from '@/components';

const ButtonGroup = ({ name, onClick, title, isSelected, value, children }) => {
  return (
    <Button
      className={`w-full ${
        isSelected ? '' : 'hover:bg-borderSecondary dark:hover:bg-borderSecondaryDark'
      }`}
      name={name}
      variant={isSelected ? 'fourth' : 'outline-primary'}
      title={title}
      value={value}
      onClick={onClick}
      roundedStyle="first:rounded-l last:rounded-r"
      borderStyle="border-y border-l last:border-r"
      noOutline
    >
      {children}
    </Button>
  );
};

export default ButtonGroup;
