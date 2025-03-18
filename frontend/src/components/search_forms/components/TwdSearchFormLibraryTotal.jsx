import { ButtonGroup } from "@/components";
import { LIBRARY_TOTAL } from "@/constants";

const TwdSearchFormLibraryTotal = ({ value, onChange }) => {
	const name = LIBRARY_TOTAL;
	const options = ["60-67", "68-75", "76-83", "84-90"];

	return (
		<div className="flex items-center">
			<div className="w-1/4">
				<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Library Size:</div>
			</div>
			<div className="flex w-3/4 justify-end">
				{options.map((i) => {
					return (
						<ButtonGroup isSelected={value[i]} key={i} name={name} onClick={onChange} value={i}>
							{i}
						</ButtonGroup>
					);
				})}
			</div>
		</div>
	);
};

export default TwdSearchFormLibraryTotal;
