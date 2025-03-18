import { useState } from "react";
import Link45Deg from "@icons/link-45deg.svg?react";
import { ButtonIconed } from "@/components";
import { useApp } from "@/context";

const ReviewCopyUrlButton = ({ deckid, urlDiff }) => {
	const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
	const [success, setSuccess] = useState(false);

	const handleStandard = () => {
		const deckUrl = `${import.meta.env.VITE_BASE_URL}/review/${deckid}#${urlDiff}`;

		navigator.clipboard.writeText(deckUrl);
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
			setShowMenuButtons(false);
			setShowFloatingButtons(true);
		}, 1000);
	};

	return (
		<ButtonIconed
			variant={success ? "success" : isDesktop ? "secondary" : "primary"}
			onClick={handleStandard}
			title="Copy URL"
			icon={<Link45Deg width="19" height="19" viewBox="0 0 15 15" />}
			text={success ? "Copied" : "Copy URL"}
		/>
	);
};

export default ReviewCopyUrlButton;
