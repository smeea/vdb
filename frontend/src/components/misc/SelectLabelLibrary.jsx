import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultLibraryTypeImage,
  ResultName,
  ResultPathImage,
} from "@/components";
import { CLAN, DISCIPLINE, LIBRARY, PATH, REQUIREMENT, TYPE } from "@/constants";
import { inventoryStore, useApp } from "@/context";

const SelectLabelLibrary = ({ cardid, inInventory }) => {
  const { libraryCardBase } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const card = libraryCardBase[cardid];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {inInventory && (
          <div
            className={twMerge(
              "inline w-7 text-center text-lg",
              inventoryLibrary[cardid] &&
                "rounded-md border-2 border-midGray dark:border-midGrayDark",
            )}
          >
            {inventoryLibrary[cardid]?.q}
          </div>
        )}
        <div className="min-w-[24px]">
          <ResultLibraryTypeImage value={card[TYPE]} />
        </div>
        <ResultName card={card} isColored={false} />
      </div>
      <div className="flex items-center gap-2">
        <ResultLibraryRequirements value={card[REQUIREMENT]} />
        <div className="flex items-center gap-1.5">
          <ResultLibraryDisciplines value={card[DISCIPLINE]} />
          <ResultLibraryClan value={card[CLAN]} />
          <ResultPathImage value={card[PATH]} />
        </div>
        <ResultLibraryCost card={card} />
      </div>
    </div>
  );
};

export default SelectLabelLibrary;
