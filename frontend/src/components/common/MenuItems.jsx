import { Menu } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const MenuItems = ({ divided, anchor = { to: "bottom end", gap: "2px" }, className, children }) => {
  return (
    <Menu.Items
      anchor={anchor}
      className={twMerge(
        "z-20 rounded-sm border border-borderThird bg-bgButton py-1 dark:border-borderThirdDark dark:bg-bgButtonDark",
        divided && "divide-y divide-borderPrimary dark:divide-borderPrimaryDark",
        className,
      )}
    >
      {children}
    </Menu.Items>
  );
};

export default MenuItems;
