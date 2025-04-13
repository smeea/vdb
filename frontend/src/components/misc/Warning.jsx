import { ResultLegalIcon } from "@/components";
import { BANNED, GROUPS, ICON, LIMITED, PLAYTEST, TEXT, TITLE } from "@/constants";
import Exclamation from "@icons/exclamation-triangle.svg?react";

const Warning = ({ type, value = "WARNING", title = "" }) => {
  const types = {
    [GROUPS]: {
      [TEXT]: "GROUPS",
      [TITLE]: "Bad Groups",
    },
    [BANNED]: {
      [TEXT]: "BANNED",
      [TITLE]: "Banned Cards",
      [ICON]: <ResultLegalIcon type={BANNED} value={BANNED} className="flex" />,
    },
    [PLAYTEST]: {
      [TEXT]: "PLAYTEST",
      [TITLE]: "Playtest Cards",
      [ICON]: <ResultLegalIcon type={PLAYTEST} value={PLAYTEST} className="flex" />,
    },
    [LIMITED]: {
      [TEXT]: "LIMITED",
      [TITLE]: "Cards Excluded in Limited Format",
    },
  };

  return (
    <div
      className="flex items-center gap-0.5 whitespace-nowrap text-fgRed dark:text-fgedDark"
      title={title ?? types?.[type]?.[TITLE]}
    >
      {types?.[type]?.[ICON] ?? <Exclamation width="15" height="15" viewBox="0 0 16 16" />}
      <div className="flex items-center">{types?.[type]?.[TEXT] ?? value}</div>
    </div>
  );
};

export default Warning;
