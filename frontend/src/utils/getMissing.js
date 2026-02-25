import {
  HARD,
  LOGIC,
  SOFT,
  SURPLUS_FIXED,
  SURPLUS_USED,
  VALUE,
} from "@/constants";
import { getHardTotal, getSoftMax } from "@/utils";

const getMissing = (cardid, usedBase, wishlist) => {
  const wishlistLogic = wishlist[cardid]?.[LOGIC];
  const wishlistValue = wishlist[cardid]?.[VALUE];
  let miss;
  switch (wishlistLogic) {
    case SURPLUS_FIXED:
      miss = wishlistValue;
      break;
    case SURPLUS_USED:
      {
        const softUsedMax = getSoftMax(usedBase[SOFT]?.[cardid]);
        const hardUsedTotal = getHardTotal(usedBase[HARD]?.[cardid]);
        miss = softUsedMax + hardUsedTotal + wishlistValue;
      }
      break;
    default: {
      const softUsedMax = getSoftMax(usedBase[SOFT]?.[cardid]);
      const hardUsedTotal = getHardTotal(usedBase[HARD]?.[cardid]);
      miss = softUsedMax + hardUsedTotal;
    }
  }

  return miss
}

export default getMissing;
