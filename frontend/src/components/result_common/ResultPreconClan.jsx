import GiftFill from "@icons/gift-fill.svg?react";
import { ResultLibraryClan } from "@/components";

const ResultPreconClan = ({ clan }) => {
	return (
		<>
			{clan === "Bundle" ? (
				<div className="flex h-[21px] items-center sm:h-[24px] dark:brightness-[0.65]">
					<GiftFill />
				</div>
			) : clan === "Mix" ? null : (
				<ResultLibraryClan value={clan} />
			)}
		</>
	);
};

export default ResultPreconClan;
