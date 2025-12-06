import { useSnapshot } from "valtio";
import { ValueSetter } from "@/components";
import { IS_FROZEN, LOGIC, SURPLUS_FIXED, VALUE, WISHLIST } from "@/constants";
import { inventoryStore, wishlistUpdate } from "@/context";

const WishlistSetValue = ({ cardid }) => {
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const value = wishlist?.[cardid]?.[VALUE] ?? 0;
  const logic = wishlist?.[cardid]?.[LOGIC] || null;
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN];

  const handleChange = (q, state) => {
    if (state === 0 && !logic) {
      wishlistUpdate(cardid, {
        [LOGIC]: SURPLUS_FIXED,
        [VALUE]: q,
      });
    } else {
      wishlistUpdate(cardid, { [VALUE]: q });
    }
  };

  return <ValueSetter handleChange={handleChange} isEditable={isEditable} value={value} />;
};

export default WishlistSetValue;
