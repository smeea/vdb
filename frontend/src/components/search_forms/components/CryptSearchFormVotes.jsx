import { Select } from "@/components";
import { ANY, VOTES } from "@/constants";

const CryptSearchFormVotes = ({ value, onChange }) => {
	const name = VOTES;

	const options = [
		[ANY, "ANY"],
		["0", "None"],
		["1", "1+"],
		["2", "2+"],
		["3", "3+"],
		["4", "4+"],
	].map((i) => ({
		value: i[0],
		name: name,
		label: (
			<div className="flex items-center">
				<div className="flex w-[40px]" />
				{i[1]}
			</div>
		),
	}));

	return (
		<div className="flex items-center">
			<div className="w-1/4">
				<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Votes:</div>
			</div>
			<div className="w-3/4">
				<Select
					options={options}
					isSearchable={false}
					isClearable={value !== ANY}
					name={name}
					value={options.find((obj) => obj.value === value.toLowerCase())}
					onChange={(e) => onChange(e ?? { name: name, value: ANY })}
				/>
			</div>
		</div>
	);
};

export default CryptSearchFormVotes;
