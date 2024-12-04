import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components';

const ButtonGroup = ({ name, onClick, title, isSelected, value, children }) => {
  return (
    <Button
      className={twMerge(
        'w-full',
        !isSelected && 'hover:bg-borderSecondary dark:hover:bg-borderSecondaryDark',
      )}
      name={name}
      variant={isSelected ? 'groupSelected' : 'group'}
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
