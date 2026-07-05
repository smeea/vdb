import { Menu } from "@headlessui/react";
import Download from "@icons/download.svg?react";
import { MenuButton, MenuItem, MenuItems } from "@/components";
import { ALL, CARDS, GENERAL, PRECONS } from "@/constants";

const ExportDropdown = ({ action, title, target, format }) => {
  return <MenuItem onClick={() => action(target, format)}>{title}</MenuItem>;
};

const PlaytestExportDropdown = ({ exportReports }) => {
  return (
    <Menu>
      <MenuButton
        title="Export"
        icon={<Download />}
        variant="primary"
        text="Export"
        className="w-full"
      />
      <MenuItems className="print:hidden">
        <ExportDropdown action={exportReports} target={CARDS} title="Cards - Text" />
        <ExportDropdown action={exportReports} target={PRECONS} title="Precons - Text" />
        <ExportDropdown action={exportReports} target={GENERAL} title="General - Text" />
        <ExportDropdown action={exportReports} target={ALL} title="Excel" />
        <ExportDropdown action={() => print()} title="PDF" />
      </MenuItems>
    </Menu>
  );
};

export default PlaytestExportDropdown;
