import { Link } from "react-router";
import PlayFill from "@icons/play-fill.svg?react";
import { ButtonIconed } from "@/components";

const TwdOpenDeckButton = ({ deckid, url, noText }) => {
	return (
		<Link to={url ?? `/decks/${deckid}`} className="hover:no-underline">
			<ButtonIconed
				className="w-full"
				icon={<PlayFill height="18" viewBox="0 0 12 14" />}
				text={noText ? null : "Open"}
			/>
		</Link>
	);
};

export default TwdOpenDeckButton;
