import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { Checkbox } from "@/components";
import { DATE, NAME } from "@/constants";

const LimitedSet = ({ isChecked, handleSetChange, setid }) => {
  return (
    <div className="flex sm:max-w-90 justify-between gap-1">
      <Checkbox
        name={setid}
        label={setsAndPrecons[setid][NAME]}
        checked={isChecked ?? false}
        value={setid}
        onChange={() => handleSetChange(setid, !isChecked)}
      />
      <div className="text-fgSecondary dark:text-fgSecondaryDark">
        {setsAndPrecons[setid][DATE]}
      </div>
    </div>
  );
};

export default LimitedSet;
