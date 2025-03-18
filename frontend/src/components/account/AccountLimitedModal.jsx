import dayjs from "dayjs";
import { useRef } from "react";
import Download from "@icons/download.svg?react";
import Upload from "@icons/upload.svg?react";
import {
	AccountLimitedCardSelection,
	AccountLimitedSetSelection,
	AccountLimitedUrlButton,
	ButtonIconed,
	Modal,
} from "@/components";
import { ALLOWED, BANNED, CRYPT, LIBRARY, SETS } from "@/constants";
import { limitedFullStore } from "@/context";

const AccountLimitedModal = ({ setShow, setFormat }) => {
	const fileInput = useRef();

	const handleFileInputClick = () => {
		fileInput.current.click();
	};

	const importFormat = (fileInput) => {
		const reader = new FileReader();
		const file = fileInput.current.files[0];
		reader.readAsText(file);
		reader.onload = async () => {
			const formatText = reader.result;
			setFormat(JSON.parse(formatText));
		};
	};

	const minifyFormat = () => {
		const minified = {
			[SETS]: limitedFullStore[SETS],
			[ALLOWED]: {
				[CRYPT]: {},
				[LIBRARY]: {},
			},
			[BANNED]: {
				[CRYPT]: {},
				[LIBRARY]: {},
			},
		};
		Object.keys(limitedFullStore[ALLOWED][CRYPT]).forEach((c) => {
			minified[ALLOWED][CRYPT][c] = true;
		});
		Object.keys(limitedFullStore[ALLOWED][LIBRARY]).forEach((c) => {
			minified[ALLOWED][LIBRARY][c] = true;
		});
		Object.keys(limitedFullStore[BANNED][CRYPT]).forEach((c) => {
			minified[BANNED][CRYPT][c] = true;
		});
		Object.keys(limitedFullStore[BANNED][LIBRARY]).forEach((c) => {
			minified[BANNED][LIBRARY][c] = true;
		});
		return minified;
	};

	const exportFormat = async () => {
		let { saveAs } = await import("file-saver");
		const fileName = `Limited Format [${dayjs().format("YYYY-MM-DD")}].txt`;
		const formatText = JSON.stringify(minifyFormat(), null, "  ");
		const file = new File([formatText], fileName, {
			type: "text/plain;charset=utf-8",
		});
		saveAs(file, fileName);
	};

	return (
		<Modal handleClose={() => setShow(false)} size="lg" title="Manage Limited Format">
			<div className="flex flex-col gap-5">
				<AccountLimitedSetSelection />
				<AccountLimitedCardSelection />
				<AccountLimitedCardSelection inBanned />
				<div className="flex justify-end gap-2 max-sm:flex-col">
					<AccountLimitedUrlButton
						format={JSON.stringify(minifyFormat(), null, "").replace(/\n/g, "")}
					/>
					<ButtonIconed
						onClick={handleFileInputClick}
						title="Import Format"
						icon={<Upload />}
						text="Import Format"
					/>

					<ButtonIconed
						onClick={exportFormat}
						title="Export Format"
						icon={<Download />}
						text="Export Format"
					/>
				</div>
			</div>
			<input
				ref={fileInput}
				accept=".txt"
				type="file"
				onChange={() => importFormat(fileInput)}
				style={{ display: "none" }}
			/>
		</Modal>
	);
};

export default AccountLimitedModal;
