import { useNavigate } from "react-router";
import PencilSquare from "@icons/pencil-square.svg?react";
import { ButtonIconed } from "@/components";
import { AUTHOR, DECKID, DESCRIPTION } from "@/constants";
import { useApp } from "@/context";
import { deckServices } from "@/services";

const DeckReviewButton = ({ deck }) => {
	const { isDesktop, setShowFloatingButtons, setShowMenuButtons, publicName } = useApp();
	const navigate = useNavigate();

	const handleClick = () => {
		deckServices
			.deckSnapshot({
				...deck,
				[DESCRIPTION]: `Review of ${import.meta.env.VITE_BASE_URL}/decks/${deck[DECKID]}`,
				[AUTHOR]: publicName ? `review by ${publicName}` : "",
			})
			.then((deckid) => {
				navigate(`/review/${deckid}`);
			})
			.finally(() => {
				setShowMenuButtons(false);
				setShowFloatingButtons(true);
			});
	};

	return (
		<ButtonIconed
			variant={isDesktop ? "secondary" : "primary"}
			onClick={handleClick}
			title="Review Deck"
			icon={<PencilSquare />}
			text="Review"
		/>
	);
};

export default DeckReviewButton;
