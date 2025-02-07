import { Tab } from '@headlessui/react';

const TabButton = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        `border-borderPrimary dark:border-borderPrimaryDark w-full rounded-sm border px-3 py-1.5 ${
          selected ? 'bg-bgSecondary dark:bg-bgSecondaryDark' : ''
        }`
      }
    >
      {children}
    </Tab>
  );
};

export default TabButton;
