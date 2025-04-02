import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const TabButton = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        twMerge(
          "w-full cursor-pointer rounded-sm border border-borderPrimary px-3 py-1.5 dark:border-borderPrimaryDark",
          selected && "bg-bgSecondary dark:bg-bgSecondaryDark",
        )
      }
    >
      {children}
    </Tab>
  );
};

export default TabButton;
