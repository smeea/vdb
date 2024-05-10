import React from 'react';
import { Button } from '@/components';

const ButtonGroup = ({ name, onClick, title, isFirst, isLast, isSelected, value, children }) => {
  return (
    <Button
      className={`w-full ${!isFirst ? 'rounded-l-none' : ''} ${!isLast ? 'rounded-r-none' : ''} ${
        isSelected ? '' : 'hover:bg-borderSecondary dark:hover:bg-borderSecondaryDark'
      }`}
      name={name}
      variant={isSelected ? 'fourth' : 'outline-primary'}
      title={title}
      value={value}
      onClick={onClick}
      borderStyle={isLast ? 'border' : 'border-y border-l'}
      noOutline
    >
      {children}
    </Button>
  );
};

export default ButtonGroup;
