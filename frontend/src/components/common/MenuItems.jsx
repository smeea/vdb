import { Menu } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const MenuItems = ({ divided, anchor = { to: "bottom end", gap: "2px" }, children }) => {
	return (
		<Menu.Items
			anchor={anchor}
			className={twMerge(
				"border-borderThird bg-bgButton dark:border-borderThirdDark dark:bg-bgButtonDark z-20 rounded-sm border py-1",
				divided && "divide-borderPrimary dark:divide-borderPrimaryDark divide-y",
			)}
		>
			{children}
		</Menu.Items>
	);
};

export default MenuItems;
