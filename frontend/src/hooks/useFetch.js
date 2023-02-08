import { useAsync } from '@/hooks';

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
};

const useFetch = (url, options = {}, dependencies = []) => {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
};

export default useFetch;
