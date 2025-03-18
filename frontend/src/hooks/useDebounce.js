import { useEffect } from "react";
import { TYPE_DEBOUNCE_DELAY } from "@/constants";
import { useTimeout } from "@/hooks";

const useDebounce = (callback, delay = TYPE_DEBOUNCE_DELAY, dependencies) => {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, []);
};

export default useDebounce;
