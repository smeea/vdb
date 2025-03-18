import { DeckTags } from "@/components";
import { TAGS } from "@/constants";

const TwdResultTags = ({ tags }) => {
	return (
		<div className="flex">
			<DeckTags deck={{ [TAGS]: tags }} allTagsOptions={[]} />
		</div>
	);
};

export default TwdResultTags;
