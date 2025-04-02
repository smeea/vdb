import { SortButton } from "@/components";
import { DATE, NAME } from "@/constants";

const DeckSortButton = ({ sortMethod, onChange, noText }) => {
  const sortMethods = { [NAME]: "N", [DATE]: "D" };

  return (
    <SortButton
      sortMethod={sortMethod}
      sortMethods={sortMethods}
      setSortMethod={onChange}
      noText={noText}
    />
  );
};

export default DeckSortButton;
