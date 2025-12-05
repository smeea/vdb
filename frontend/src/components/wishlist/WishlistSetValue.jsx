import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { ValueSetter, ButtonCardChange } from "@/components";
import { IS_FROZEN, LOGIC, SURPLUS_FIXED, VALUE, WISHLIST } from "@/constants";
import { inventoryStore, useApp, wishlistUpdate } from "@/context";

const WishlistSetValue = ({ cardid }) => {
  const { isMobile } = useApp();
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const value = wishlist?.[cardid]?.[VALUE] ?? 0;
  const logic = wishlist?.[cardid]?.[LOGIC] || null;
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN];

  const handleChange = (q, state) => {
    if (state === 0 && !logic) wishlistUpdate(cardid, LOGIC, SURPLUS_FIXED);
    wishlistUpdate(cardid, VALUE, q)
  }

  return (
    <ValueSetter handleChange={handleChange} isEditable={isEditable} value={value} inWishlist />
  );
};

export default WishlistSetValue;
