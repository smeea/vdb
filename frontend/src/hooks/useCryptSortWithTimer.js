import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { CRYPT_TIMER, ID } from "@/constants";
import { miscStore } from "@/context";
import { cryptSort } from "@/utils";

const useCryptSortWithTimer = (cardsList, sortMethod) => {
  const [sortedState, setSortedState] = useState([]);
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];

  useEffect(() => {
    setSortedState(cryptSort(cardsList, sortMethod).map((c) => c.c[ID]));
  }, [timer, sortMethod]);

  return cardsList.toSorted((a, b) => sortedState.indexOf(a.c[ID]) - sortedState.indexOf(b.c[ID]));
};

export default useCryptSortWithTimer;
