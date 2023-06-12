import React from 'react';
import { Tab } from '@headlessui/react';

const TabButton = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        `w-full rounded border border-borderPrimary px-3 py-1.5 dark:border-borderPrimaryDark ${
          selected ? 'bg-bgSecondary dark:bg-bgSecondaryDark' : ''
        }`
      }
    >
      {children}
    </Tab>
  );
};

export default TabButton;
