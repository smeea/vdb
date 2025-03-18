import { useNavigate } from "react-router";
import PeopleFill from "@icons/people-fill.svg?react";
import { ButtonIconed } from "@/components";
import { PUBLIC_CHILD, PUBLIC_PARENT } from "@/constants";
import { useApp } from "@/context";

const DeckPublicSwitchButton = ({ deck }) => {
	const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
	const navigate = useNavigate();
	const isChild = !!deck[PUBLIC_PARENT];

	const handleClick = () => {
		setShowMenuButtons(false);
		setShowFloatingButtons(true);
		navigate(`/decks/${isChild ? deck[PUBLIC_PARENT] : deck[PUBLIC_CHILD]}`);
	};

	return (
		<ButtonIconed
			variant={isDesktop ? "secondary" : "primary"}
			onClick={handleClick}
			title={isChild ? "Go to Main Deck" : "Go to Public Deck"}
			text={isChild ? "Go to Main Deck" : "Go to Public Deck"}
			icon={<PeopleFill />}
		/>
	);
};

export default DeckPublicSwitchButton;
