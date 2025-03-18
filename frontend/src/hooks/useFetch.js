import ky from "ky";
import { useAsync } from "@/hooks";

const useFetch = (url, options, dependencies = []) => {
	return useAsync(() => ky(url, options || {}).json(), dependencies);
};

export default useFetch;
