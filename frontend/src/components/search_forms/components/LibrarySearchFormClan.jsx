import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
	ResultLibraryClan,
	SearchAdditionalForms,
	SearchFormButtonAdd,
	SearchFormButtonDel,
	SearchFormButtonLogicToggle,
	Select,
} from "@/components";
import { ANY, CLAN, LOGIC, NOT_REQUIRED } from "@/constants";
import { useApp } from "@/context";

const LibrarySearchFormClan = ({ value, searchForm, onChange }) => {
	const { isMobile } = useApp();
	const name = CLAN;

	const options = [
		["ANY", ANY],
		["Not Required", NOT_REQUIRED],
		...vampireClansList.map((c) => [c, c.toLowerCase()]),
		...imbuedClansList.map((c) => [c, c.toLowerCase()]),
	].map((i) => ({
		value: i[1],
		name: name,
		label: (
			<div className="flex items-center">
				<div className="flex w-[40px] justify-center">
					{![ANY, NOT_REQUIRED].includes(i[1]) && <ResultLibraryClan value={i[1]} />}
				</div>
				{i[0]}
			</div>
		),
	}));

	return (
		<>
			<div className="flex items-center">
				<div className="flex w-1/4 items-center justify-between">
					<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Clan:</div>
					{value.value[0] !== ANY && (
						<div className="flex justify-end gap-1 px-1">
							<SearchFormButtonLogicToggle
								name={name}
								value={value[LOGIC]}
								searchForm={searchForm}
							/>
							{value.value.length == 1 ? (
								<SearchFormButtonAdd searchForm={searchForm} name={name} />
							) : (
								<SearchFormButtonDel searchForm={searchForm} i={0} name={name} />
							)}
						</div>
					)}
				</div>
				<div className="w-3/4">
					<Select
						options={options}
						isSearchable={!isMobile}
						isClearable={value.value[0] !== ANY}
						name={0}
						value={options.find((obj) => obj.value === value.value[0])}
						onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
					/>
				</div>
			</div>
			{value.value.length > 1 && (
				<SearchAdditionalForms
					isClearable
					value={value}
					name={name}
					searchForm={searchForm}
					options={options}
					onChange={onChange}
				/>
			)}
		</>
	);
};

export default LibrarySearchFormClan;
