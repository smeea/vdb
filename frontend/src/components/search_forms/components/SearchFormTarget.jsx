import { useSnapshot } from "valtio";
import {
  Checkbox,
} from "@/components";
import { CRYPT, LIBRARY } from "@/constants";
import { sharedStore, useApp } from "@/context";

const SearchFormTarget = () => {
  const {
    searchSharedMode,
    setSearchSharedMode,
    searchInventoryMode,
    setSearchInventoryMode,
    searchMissingInventoryMode,
    setSearchMissingInventoryMode,
  } = useApp();
  const { [CRYPT]: sharedCrypt, [LIBRARY]: sharedLibrary } = useSnapshot(sharedStore);
  const isSharedInventory = sharedCrypt && sharedLibrary;

  return <div className="flex justify-between gap-2">
    <Checkbox
      name={0}
      value="searchInventoryMode"
      label="Search In Inventory"
      checked={!!searchInventoryMode}
      onChange={() => {
        setSearchInventoryMode(!searchInventoryMode);
        setSearchMissingInventoryMode(false);
        setSearchSharedMode(false);
      }}
    />
    {isSharedInventory && (
      <Checkbox
        name={0}
        value="searchSharedInventoryMode"
        label="Search In Shared Inventory"
        checked={!!searchSharedMode}
        onChange={() => {
          setSearchSharedMode(!searchSharedMode);
          setSearchMissingInventoryMode(false);
          setSearchInventoryMode(false);
        }}
      />
    )}
    <Checkbox
      name={0}
      value="missingInventoryMode"
      label="Missing In Inventory"
      checked={!!searchMissingInventoryMode}
      onChange={() => {
        setSearchMissingInventoryMode(!searchMissingInventoryMode);
        setSearchSharedMode(false);
        setSearchInventoryMode(false);
      }}
    />
  </div>
};

export default SearchFormTarget;
