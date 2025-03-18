import { Select, SelectLabelCrypt, SelectLabelLibrary } from "@/components";
import { CRYPT, ID, LIBRARY, NAME, TWD, VALUE } from "@/constants";
import { useApp } from "@/context";
import { filterCrypt, filterLibrary, getIsPlaytest } from "@/utils";

const STARTING_WITH = "startingWith";
const OTHER = "other";

const getMatches = (inputValue, filterAction, playtestMode, inInventory) => {
	const input = { [NAME]: inputValue };

	const startingWith = [];
	const other = filterAction(input)
		.filter((card) => {
			if (getIsPlaytest(card[ID]) && (!playtestMode || inInventory)) return false;

			if (card[NAME].toLowerCase().startsWith(inputValue.toLowerCase())) {
				startingWith.push({ [VALUE]: card[ID] });
			} else {
				return true;
			}
		})
		.map((card) => ({
			[VALUE]: card[ID],
		}));

	return { [STARTING_WITH]: startingWith, [OTHER]: other };
};

const getAllMatches = (
	inputValue,
	filterCryptAction,
	filterLibraryAction,
	target,
	playtestMode,
	inInventory,
) => {
	const cryptMatches =
		target !== LIBRARY ? getMatches(inputValue, filterCryptAction, playtestMode, inInventory) : [];

	const libraryMatches =
		target !== CRYPT ? getMatches(inputValue, filterLibraryAction, playtestMode, inInventory) : [];

	return {
		cryptMatches,
		libraryMatches,
	};
};

const CardSelect = ({
	target,
	value,
	inInventory,
	placeholder = "Enter Card Name",
	autoFocus,
	onChange,
	menuPlacement,
	ref,
}) => {
	const { cryptCardBase, libraryCardBase, playtestMode } = useApp();
	const filterCryptAction = (filter) => filterCrypt(cryptCardBase, filter);
	const filterLibraryAction = (filter) => filterLibrary(libraryCardBase, filter);

	const getOptionLabel = (option) => {
		const cardid = option.value;

		if (cardid > 200000) {
			return <SelectLabelCrypt cardid={cardid} inInventory={inInventory} />;
		} else {
			return <SelectLabelLibrary cardid={cardid} inInventory={inInventory} />;
		}
	};

	const byTwd = (a, b) => {
		const aInTwd =
			a[VALUE] > 200000 ? cryptCardBase[a[VALUE]][TWD] : libraryCardBase[a[VALUE]][TWD];
		const bInTwd =
			b[VALUE] > 200000 ? cryptCardBase[b[VALUE]][TWD] : libraryCardBase[b[VALUE]][TWD];

		return bInTwd - aInTwd;
	};

	const loadOptions = async (inputValue) => {
		if (
			(inputValue.length > 2 && !inputValue.startsWith("the")) ||
			(inputValue.length > 3 && !inputValue.startsWith("the ")) ||
			inputValue.length > 4
		) {
			const { cryptMatches, libraryMatches } = getAllMatches(
				inputValue,
				filterCryptAction,
				filterLibraryAction,
				target,
				playtestMode,
				inInventory,
			);

			if (target === CRYPT) {
				return [
					...cryptMatches[STARTING_WITH].toSorted(byTwd),
					...cryptMatches[OTHER].toSorted(byTwd),
				];
			} else if (target === LIBRARY) {
				return [
					...libraryMatches[STARTING_WITH].toSorted(byTwd),
					...libraryMatches[OTHER].toSorted(byTwd),
				];
			}
			return [
				...[...cryptMatches[STARTING_WITH], ...libraryMatches[STARTING_WITH]].toSorted(byTwd),
				...[...cryptMatches[OTHER], ...libraryMatches[OTHER]].toSorted(byTwd),
			];
		}
	};

	return (
		<Select
			variant="async"
			autoFocus={autoFocus}
			getOptionLabel={getOptionLabel}
			loadOptions={loadOptions}
			onChange={onChange}
			menuPlacement={menuPlacement}
			placeholder={placeholder}
			ref={ref}
			value={value}
		/>
	);
};

export default CardSelect;
