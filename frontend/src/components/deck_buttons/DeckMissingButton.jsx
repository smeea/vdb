import Cart4 from "@icons/cart4.svg?react";
import { ButtonIconed } from "@/components";
import { useApp } from "@/context";

const DeckMissingButton = ({ setShow }) => {
	const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

	const handleClick = () => {
		setShow(true);
		setShowMenuButtons(false);
		setShowFloatingButtons(false);
	};

	return (
		<ButtonIconed
			variant={isDesktop ? "secondary" : "primary"}
			onClick={handleClick}
			title="Get Missing in Inventory Cards"
			icon={<Cart4 />}
			text="Missing Cards"
		/>
	);
};

export default DeckMissingButton;
