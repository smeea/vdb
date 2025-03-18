import { useState } from "react";
import Download from "@icons/download.svg?react";
import InboxesFill from "@icons/inboxes-fill.svg?react";
import {
	ButtonIconed,
	CardImage,
	DeckCrypt,
	FlexGapped,
	Modal,
	PlaytestReportEntryWrapper,
} from "@/components";
import { ID, NAME, SCORE, TEXT } from "@/constants";
import { useApp } from "@/context";
import { playtestServices } from "@/services";

const PlaytestReportsOneButton = ({ value, isPrecon = false }) => {
	const { isMobile, isDesktop } = useApp();
	const [show, setShow] = useState();

	const exportReports = async () => {
		const result = await playtestServices.getReports(value, isPrecon);

		let exportText = "";
		Object.keys(result).forEach((id, idx) => {
			exportText += `User: <${id}>\n`;
			exportText += `Score: ${result[id][SCORE]}\n`;
			exportText += `${result[id][TEXT]}\n`;
			if (idx + 1 < Object.keys(result).length) {
				exportText += "\n-----\n\n";
			}
		});

		const file = new File([exportText], `${value[NAME]}.txt`, {
			type: "text/plain;charset=utf-8",
		});

		let { saveAs } = await import("file-saver");
		saveAs(file);
	};

	return (
		<>
			<ButtonIconed
				variant={isDesktop && isPrecon ? "secondary" : "primary"}
				onClick={() => setShow(true)}
				title="Show Playtest Reports"
				text="Reports"
				icon={<InboxesFill />}
			/>
			{show && (
				<Modal
					size="lg"
					title={`Playtest Report - ${value[NAME]}`}
					handleClose={() => setShow(false)}
				>
					<FlexGapped className="max-sm:flex-col">
						<div className="flex flex-col gap-2 sm:gap-4">
							{!isMobile && (
								<>
									{isPrecon ? (
										<div className="w-[358px]">
											<DeckCrypt deck={value.deck} noDisciplines />
										</div>
									) : (
										<CardImage card={value} onClick={() => setShow(false)} />
									)}
								</>
							)}
							<ButtonIconed
								onClick={() => exportReports()}
								title="Save Reports"
								text="Save Reports"
								icon={<Download />}
							/>
						</div>
						<PlaytestReportEntryWrapper id={value[ID]} isPrecon={isPrecon} />
					</FlexGapped>
				</Modal>
			)}
		</>
	);
};

export default PlaytestReportsOneButton;
