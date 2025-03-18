import { DeckCrypt, DeckLibrary } from "@/components";
import { IS_AUTHOR } from "@/constants";

const DeckPreview = ({ deck }) => {
	const d = { ...deck, [IS_AUTHOR]: false };

	return (
		<div className="flex gap-3">
			<div className="h-[80vh] basis-5/9 overflow-y-auto">
				<DeckCrypt deck={d} inPreview />
			</div>
			<div className="h-[80vh] basis-4/9 overflow-y-auto">
				<DeckLibrary deck={d} inPreview />
			</div>
		</div>
	);
};

export default DeckPreview;
