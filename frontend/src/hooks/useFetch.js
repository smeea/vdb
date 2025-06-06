import { useAsync } from "@/hooks";
import ky from "ky";

const useFetch = (url, options, dependencies = []) => {
  return useAsync(() => ky(url, options || {}).json(), dependencies);
};

export default useFetch;
