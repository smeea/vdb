import { Menu } from "@headlessui/react";

const MenuItem = ({ onClick, children }) => {
	return (
		<Menu.Item className="hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark px-3 py-1.5 whitespace-nowrap hover:cursor-pointer">
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
