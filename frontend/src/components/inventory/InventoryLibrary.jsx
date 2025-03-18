import { Header, InventoryFilterForm, InventoryLibraryTable, SortButton } from "@/components";
import { ALL, CLAN_DISCIPLINE, DISCIPLINE, ID, NAME, QUANTITY, TYPE } from "@/constants";
import { useApp } from "@/context";
import { useInventoryLibrary } from "@/hooks";

const InventoryLibrary = ({
	compact,
	withCompact,
	category,
	cards,
	type,
	setType,
	discipline,
	setDiscipline,
	newFocus,
	inShared,
	onlyNotes,
}) => {
	const { libraryInventorySort, changeLibraryInventorySort } = useApp();
	const sortMethods = {
		[NAME]: "N",
		[QUANTITY]: "Q",
		[TYPE]: "T",
		[CLAN_DISCIPLINE]: "C/D",
	};

	const {
		cardsByType,
		cardsByDiscipline,
		cardsFilteredByType,
		cardsFilteredByTypeTotal,
		cardsFilteredByTypeUnique,
		cardsFilteredByDiscipline,
		cardsFilteredByDisciplineTotal,
		cardsFilteredByDisciplineUnique,
		missingFiltered,
		missingFilteredTotal,
	} = useInventoryLibrary(cards, category, compact, type, discipline, onlyNotes);

	return (
		<>
			{!compact && (
				<>
					<Header>
						<div className="w-3/4 p-1">
							<div className="flex flex-col gap-1">
								<InventoryFilterForm
									value={type}
									setValue={setType}
									values={Object.keys(cardsByType).filter((i) => {
										return Object.keys(cardsFilteredByDiscipline[i]).length;
									})}
									byTotal={cardsFilteredByDisciplineTotal}
									byUnique={cardsFilteredByDisciplineUnique}
									target={TYPE}
								/>
								<InventoryFilterForm
									value={discipline}
									setValue={setDiscipline}
									values={Object.keys(cardsByDiscipline).filter((i) => {
										return Object.keys(cardsFilteredByType[i]).length;
									})}
									byTotal={cardsFilteredByTypeTotal}
									byUnique={cardsFilteredByTypeUnique}
									target={DISCIPLINE}
								/>
							</div>
							<div className="text-midGray dark:text-midGrayDark flex justify-end font-bold">
								{missingFilteredTotal ? (
									<>
										{missingFilteredTotal} ({Object.values(missingFiltered).length} uniq) miss
									</>
								) : null}
							</div>
						</div>
						<SortButton
							sortMethods={sortMethods}
							sortMethod={libraryInventorySort}
							setSortMethod={changeLibraryInventorySort}
						/>
					</Header>
				</>
			)}
			<InventoryLibraryTable
				sortMethod={libraryInventorySort}
				compact={compact}
				withCompact={withCompact}
				cards={
					compact
						? Object.values(cardsByType[ALL])
						: Object.values(cardsByType[type]).filter((i) => {
								return cardsByDiscipline[discipline][i.c[ID]];
							})
				}
				newFocus={newFocus}
				inShared={inShared}
			/>
		</>
	);
};

export default InventoryLibrary;
