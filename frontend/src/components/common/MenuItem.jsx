import { Menu } from "@headlessui/react";

const MenuItem = ({ onClick, children }) => {
  return (
    <Menu.Item className="cursor-pointer whitespace-nowrap px-3 py-1.5 hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark">
      {({ active }) => (
        <div
          onClick={onClick}
          className={active ? "bg-borderPrimary dark:bg-borderPrimaryDark" : ""}
        >
          {children}
        </div>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
