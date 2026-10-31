import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const TabButton = ({ children }) => {
  return (
    <Tab
      className={({ selected }) =>
        twMerge(
          "border-borderPrimary dark:border-borderPrimaryDark w-full cursor-pointer rounded-sm border px-3 py-1.5",
          selected && "bg-bgSecondary dark:bg-bgSecondaryDark",
        )
      }
    >
      {children}
    </Tab>
  );
};

export default TabButton;
