import {
  ALL,
  NONE,
  DISCIPLINE,
  TYPE,
  CLAN,
} from "@/constants";

const getRequirements = (cardid, cardBase, requirements) => {
  const types = cardBase[cardid][TYPE].split("/");

  let disciplines = [NONE];
  const d = cardBase[cardid][DISCIPLINE];
  if (d.includes("/")) {
    disciplines = d.split("/");
  } else if (d.includes(" & ")) {
    disciplines = d.split(" & ");
  } else if (d) {
    disciplines = [d];
  }

  let clans = [NONE];
  const c = cardBase[cardid][CLAN];
  if (c.includes("/")) {
    clans = c.split("/");
  } else if (c) {
    clans = [c];
  }

  const hasGoodRequirements = !!(
    (clans.includes(requirements[CLAN]) || requirements[CLAN] === ALL) &&
    (disciplines.includes(requirements[DISCIPLINE]) || requirements[DISCIPLINE] === ALL) &&
    (types.includes(requirements[TYPE]) || requirements[TYPE] === ALL)
  );

  return { disciplines, clans, types, hasGoodRequirements };
};

export default getRequirements;
