import { CRYPT_TIMER, ID } from "@/constants";
import { miscStore } from "@/context";
import { cryptSort } from "@/utils";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

const useCryptSortWithTimer = (cardsList, sortMethod) => {
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];

  const sortedState = useMemo(() => {
    return cryptSort(cardsList, sortMethod).map((c) => c.c[ID]);
  }, [timer, sortMethod]);

  return cardsList.toSorted((a, b) => sortedState.indexOf(a.c[ID]) - sortedState.indexOf(b.c[ID]));
};

export default useCryptSortWithTimer;
