import { useEffect, useState } from "react";
import PaletteFill from "@icons/palette-fill.svg?react";
import { Input, InputLabel } from "@/components";
import { BRANCH_NAME, DECKID } from "@/constants";
import { deckUpdate } from "@/context";
import { getIsEditable } from "@/utils";

const DeckChangeBranchName = ({ deck }) => {
  const [value, setValue] = useState(deck[BRANCH_NAME] || "");
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (value !== deck[BRANCH_NAME]) setValue(deck[BRANCH_NAME] ?? "");
  }, [deck[BRANCH_NAME]]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(deck[DECKID], BRANCH_NAME, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeBranchName();
  };

  const handleOnBlur = () => {
    if (value !== deck[BRANCH_NAME]) {
      deckChangeBranchName();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputLabel className="sm:hidden" title="Branch Name">
        <PaletteFill width="20" height="20" viewBox="0 0 16 16" />
      </InputLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        roundedStyle="rounded-sm max-sm:rounded-none"
      />
    </form>
  );
};

export default DeckChangeBranchName;
