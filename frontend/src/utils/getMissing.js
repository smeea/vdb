import { HARD, LOGIC, SOFT, SURPLUS_FIXED, SURPLUS_USED, VALUE } from "@/constants";
import { getHardTotal, getSoftMax } from "@/utils";

const getMissing = (cardid, usedBase, wishlist, currentQ = 0) => {
  const wishlistLogic = wishlist[cardid]?.[LOGIC];
  const wishlistValue = wishlist[cardid]?.[VALUE];
  let miss;
  switch (wishlistLogic) {
    case SURPLUS_FIXED:
      miss = wishlistValue - currentQ;
      break;
    case SURPLUS_USED:
      {
        const softUsedMax = getSoftMax(usedBase[SOFT]?.[cardid]);
        const hardUsedTotal = getHardTotal(usedBase[HARD]?.[cardid]);
        miss = softUsedMax + hardUsedTotal + wishlistValue - currentQ;
      }
      break;
    default: {
      const softUsedMax = getSoftMax(usedBase[SOFT]?.[cardid]);
      const hardUsedTotal = getHardTotal(usedBase[HARD]?.[cardid]);
      miss = softUsedMax + hardUsedTotal - currentQ;
    }
  }

  return miss;
};

export default getMissing;
