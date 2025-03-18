import {
	CardPopover,
	ConditionalTooltip,
	NewCardSelect,
	ResultModal,
	ResultName,
	TwdSearchFormQuantityButtons,
} from "@/components";
import { CRYPT, GROUP, GT, NEW } from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";

const TwdSearchFormCrypt = ({ value, form }) => {
	const { cryptCardBase, setShowFloatingButtons, isMobile } = useApp();
	const {
		currentModalCard,
		shouldShowModal,
		handleModalCardOpen,
		handleModalCardChange,
		handleModalCardClose,
	} = useModalCardController(Object.keys(value).map((id) => cryptCardBase[id]));

	const handleAdd = (event) => {
		form[event.value] = {
			q: 1,
			m: GT,
		};
	};

	const handleClick = (card) => {
		handleModalCardOpen(card);
		setShowFloatingButtons(false);
	};

	const handleClose = () => {
		handleModalCardClose();
		setShowFloatingButtons(true);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Crypt:</div>
			<NewCardSelect target={CRYPT} onChange={handleAdd} />
			<div className="flex flex-col gap-1">
				{Object.keys(value)
					.filter((id) => value[id].q >= 0)
					.map((id) => {
						const card = cryptCardBase[id];
						return (
							<div key={id} className="flex items-center gap-2">
								<TwdSearchFormQuantityButtons value={value} form={form} id={id} />
								<ConditionalTooltip
									placement="left"
									overlay={<CardPopover card={card} />}
									disabled={isMobile}
									noPadding
								>
									<div className="flex cursor-pointer gap-1" onClick={() => handleClick(card)}>
										<ResultName card={card} />
										{card[NEW] && (
											<div className="text-midGray dark:text-midGrayDark">[G{card[GROUP]}]</div>
										)}
									</div>
								</ConditionalTooltip>
							</div>
						);
					})}
			</div>
			{shouldShowModal && (
				<ResultModal
					card={currentModalCard}
					handleModalCardChange={handleModalCardChange}
					handleClose={handleClose}
				/>
			)}
		</div>
	);
};

export default TwdSearchFormCrypt;
