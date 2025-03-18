import { useState } from "react";
import TrashFill from "@icons/trash-fill.svg?react";
import { ButtonIconed, ModalConfirmation } from "@/components";
import { CRYPT, ID, LIBRARY, NAME } from "@/constants";
import { inventoryCardsAdd } from "@/context";

const InventoryDeckDeleteButton = ({ deck, inInventory }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);

	const inventoryDeckDelete = (deck) => {
		const cards = {};
		Object.values({ ...deck[CRYPT], ...deck[LIBRARY] }).forEach((card) => {
			if (card.q) {
				cards[card.c[ID]] = {
					c: card.c,
					q: -card.q,
				};
			}
		});

		inventoryCardsAdd(cards);
	};

	const handleCancel = () => setShowConfirmation(false);
	const handleConfirm = () => {
		inventoryDeckDelete(deck);
		setShowConfirmation(false);
	};

	return (
		<>
			<ButtonIconed
				onClick={() => setShowConfirmation(true)}
				title="Remove Deck from Inventory"
				disabled={!inInventory}
				icon={<TrashFill width="18" height="22" viewBox="0 0 18 16" />}
			/>
			{showConfirmation && (
				<ModalConfirmation
					show={showConfirmation}
					handleConfirm={handleConfirm}
					handleCancel={handleCancel}
					buttonText="Remove"
					title={`Remove deck ${deck[NAME]} from Inventory?`}
				/>
			)}
		</>
	);
};

export default InventoryDeckDeleteButton;
