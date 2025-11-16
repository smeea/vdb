import { useSnapshot } from "valtio";
import { Select } from "@/components";
import { LOGIC, SURPLUS_FIXED, SURPLUS_USED, WISHLIST } from "@/constants";
import { inventoryStore, wishlistUpdate } from "@/context";

const WishlistSelectMethod = ({ cardid }) => {
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const value = wishlist?.[cardid]?.[LOGIC] || null;
  const handleSelect = (e) => wishlistUpdate(cardid, LOGIC, e.value);

  const options = [
    {
      value: null,
      label: "Disabled",
    },
    {
      value: SURPLUS_USED,
      label: "Surplus over used",
    },
    {
      value: SURPLUS_FIXED,
      label: "Fixed owned quantity",
    },
  ];

  return (
    <Select
      options={options}
      value={options.find((obj) => obj.value === value)}
      onChange={handleSelect}
    />
  );
};

export default WishlistSelectMethod;
