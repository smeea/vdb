import {  useEffect, useRef } from "react";

const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = () => timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);
  const reset = () => {
    clear();
    set();
  };

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return { reset, clear };
};

export default useTimeout;
