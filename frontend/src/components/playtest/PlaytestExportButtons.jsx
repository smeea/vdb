import Download from "@icons/download.svg?react";
import Printer from "@icons/printer.svg?react";
import { ButtonIconed } from "@/components";
import { ALL, CARDS, GENERAL, PRECONS, XLSX } from "@/constants";

const PlaytestExportButtons = ({ exportReports }) => {
  return (
    <>
      <ButtonIconed
        className="w-full whitespace-nowrap"
        onClick={() => exportReports(CARDS)}
        title="Cards - Text"
        text="Cards - Text"
        icon={<Download />}
      />
      <ButtonIconed
        className="w-full whitespace-nowrap"
        onClick={() => exportReports(PRECONS)}
        title="Precons - Text"
        text="Precons - Text"
        icon={<Download />}
      />
      <ButtonIconed
        className="w-full whitespace-nowrap"
        onClick={() => exportReports(GENERAL)}
        title="General - Text"
        text="General - Text"
        icon={<Download />}
      />
      <ButtonIconed
        className="w-full whitespace-nowrap"
        onClick={() => exportReports(ALL, XLSX)}
        title="Excel"
        text="Excel"
        icon={<Download />}
      />
      <ButtonIconed
        className="w-full whitespace-nowrap"
        onClick={() => print()}
        title="PDF"
        text="PDF"
        icon={<Printer width="18" height="18" viewBox="0 0 18 16" />}
      />
    </>
  );
};

export default PlaytestExportButtons;
