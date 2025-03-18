import { DiffQuantityDiff } from "@/components";

const DiffQuantityDiffCard = ({ qFrom, qTo }) => {
	return (
		<td className="min-w-[35px] text-lg">
			<DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
		</td>
	);
};

export default DiffQuantityDiffCard;
