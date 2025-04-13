import {
  AccountLimitedCardSelection,
  AccountLimitedSetSelection,
  AccountLimitedUrlButton,
  ButtonIconed,
  Modal,
} from "@/components";
import { ALLOWED, BANNED, CRYPT, LIBRARY, SETS } from "@/constants";
import { limitedFullStore } from "@/context";
import Download from "@icons/download.svg?react";
import Upload from "@icons/upload.svg?react";
import dayjs from "dayjs";
import { useRef } from "react";
import { useSnapshot } from "valtio";

const AccountLimitedModal = ({ setShow, setFormat }) => {
  const limitedState = useSnapshot(limitedFullStore);
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

  const minifiedFormat = {
    [SETS]: limitedState[SETS],
    [ALLOWED]: {
      [CRYPT]: {},
      [LIBRARY]: {},
    },
    [BANNED]: {
      [CRYPT]: {},
      [LIBRARY]: {},
    },
  };

  Object.keys(limitedState[ALLOWED][CRYPT]).forEach((c) => {
    minifiedFormat[ALLOWED][CRYPT][c] = true;
  });
  Object.keys(limitedState[ALLOWED][LIBRARY]).forEach((c) => {
    minifiedFormat[ALLOWED][LIBRARY][c] = true;
  });
  Object.keys(limitedState[BANNED][CRYPT]).forEach((c) => {
    minifiedFormat[BANNED][CRYPT][c] = true;
  });
  Object.keys(limitedState[BANNED][LIBRARY]).forEach((c) => {
    minifiedFormat[BANNED][LIBRARY][c] = true;
  });

  const exportFormat = async () => {
    const { saveAs } = await import("file-saver");
    const fileName = `Limited Format [${dayjs().format("YYYY-MM-DD")}].txt`;
    const formatText = JSON.stringify(minifiedFormat, null, "  ");
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
            format={JSON.stringify(minifiedFormat, null, "").replace(/\n/g, "")}
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
