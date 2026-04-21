import { ResultCryptTitle } from "@/components";
import {
  ARCHBISHOP,
  BARON,
  BISHOP,
  CAPACITY,
  CARDINAL,
  INNER_CIRCLE,
  JUSTICAR,
  MAGAJI,
  PRIMOGEN,
  PRINCE,
  PRISCUS,
  REGENT,
  TITLED,
  VOTE_1,
  VOTE_2,
} from "@/constants";
import { capitalize } from "@/utils";

const ResultLibraryTitlesReq = ({ value }) => {
  if (value.length === 0) return;
  const htmlTitle = value.map((v) => capitalize(v)).join(" or ");

  return (
    <div title={htmlTitle} className="text-fg-fgSecondary dark:text-fgSecondaryDark">
      <ResultCryptTitle value={value[0]} noTitle />
      {value.length > 1 && "+"}
    </div>
  );
};

export default ResultLibraryTitlesReq;
