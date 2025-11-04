import ky from "ky";
import { useEffect, useState } from "react";

const useFetch = (url, options, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    ky(url, options || {})
      .json()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  return { loading, error, value };
};

export default useFetch;
