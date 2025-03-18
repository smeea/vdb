import { ConditionalTooltipOrModal, DeckSortButton, Input } from "@/components";
import { NAME, SET } from "@/constants";
import { useApp } from "@/context";

const TooltipText = () => {
	return (
		<div className="flex flex-col gap-1">
			<div>
				Numbers below represent maximum quantity of particular precon you can assemble from your
				inventory.
			</div>
			<div>
				Every precon calculated separately using your entire inventory, meaning real number of
				precons you will be able to assemble is smaller as every other precon will consume some
				cards and they will not be available anymore.
			</div>
			<div>
				VDB does not track particular precons you added, and calculation performed from just card
				numbers in the inventory regardless of how they appeared there.
			</div>
		</div>
	);
};

const InventoryAddPreconHeader = ({
	handleChangeNameFilter,
	setSortMethod,
	nameFilter,
	sortMethod,
	setFilter,
	handleChangeSetFilter,
}) => {
	const { isDesktop } = useApp();

	return (
		<thead>
			<tr>
				<th className="min-w-[50px]"></th>
				<th className="py-1 pr-1 max-sm:w-full">
					<Input
						placeholder="Filter by Name"
						name={NAME}
						autoComplete="off"
						spellCheck="false"
						value={nameFilter}
						onChange={handleChangeNameFilter}
					/>
				</th>
				{isDesktop && <th className="min-w-[40px]"></th>}
				<th className="w-full">
					<Input
						placeholder="Filter by Set"
						name={SET}
						autoComplete="off"
						spellCheck="false"
						value={setFilter}
						onChange={handleChangeSetFilter}
					/>
				</th>
				<th className="min-w-[110px]">
					<div className="flex items-center justify-end gap-1">
						<ConditionalTooltipOrModal
							className="basis-full"
							title="Precon Quantity"
							overlay={<TooltipText />}
						>
							<div className="text-fgThird dark:text-fgThirdDark flex justify-center">[?]</div>
						</ConditionalTooltipOrModal>
						<DeckSortButton sortMethod={sortMethod} onChange={setSortMethod} />
					</div>
				</th>
			</tr>
		</thead>
	);
};

export default InventoryAddPreconHeader;
