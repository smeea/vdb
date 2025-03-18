import { CardSelect } from "@/components";
import { CRYPT } from "@/constants";

const NewCardSelect = ({ target, inInventory, onChange, autoFocus, menuPlacement, ref }) => {
	return (
		<CardSelect
			autoFocus={autoFocus}
			inInventory={inInventory}
			onChange={onChange}
			placeholder={`Add ${target === CRYPT ? "Crypt" : "Library"} Card`}
			menuPlacement={menuPlacement}
			value={null}
			target={target}
			ref={ref}
		/>
	);
};

export default NewCardSelect;
