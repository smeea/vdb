import { TYPE_DEBOUNCE_DELAY } from "@/constants";
import { useTimeout } from "@/hooks";
import { useEffect } from "react";

const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay || TYPE_DEBOUNCE_DELAY);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export default useDebounce;
