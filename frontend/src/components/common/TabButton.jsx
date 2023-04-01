import React from 'react';
import { Tab } from '@headlessui/react';

const TabButton = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        `w-full border border-borderPrimary dark:border-borderPrimaryDark rounded px-3 py-1.5 ${
          selected ? 'bg-bgSecondary dark:bg-bgSecondaryDark' : ''
        }`
      }
    >
      {children}
    </Tab>
  );
};

export default TabButton;
