import { useAsync } from '@/hooks';
import { DEFAULT_OPTIONS } from '@/utils/constants';

const useFetch = (url, options = {}, dependencies = []) => {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
};

export default useFetch;
