import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { Checkbox } from "@/components";
import { DATE, NAME } from "@/constants";

const AccountLimitedSet = ({ isChecked, handleSetChange, setid }) => {
	return (
		<div className="flex gap-1">
			<Checkbox
				name={setid}
				label={
					<div className="flex gap-1.5">
						{setsAndPrecons[setid][NAME]}{" "}
						{setsAndPrecons[setid][DATE] && (
							<div className="text-fgSecondary dark:text-fgSecondaryDark">
								[{setsAndPrecons[setid][DATE]}]
							</div>
						)}
					</div>
				}
				checked={isChecked ?? false}
				value={setid}
				onChange={() => handleSetChange(setid, !isChecked)}
			/>
		</div>
	);
};

export default AccountLimitedSet;
