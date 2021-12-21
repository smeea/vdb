import useSWR from 'swr';

export const loadUsingSWR = (url, async = false, defaultOptions) => {
  const _defaultOptions = defaultOptions
    ? defaultOptions
    : {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

  return useSWR(
    url,
    (url) => {
      return fetch(url, _defaultOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === undefined) {
            return data;
          }
        });
    },
    { suspense: !async, revalidateOnFocus: false }
  ).data;
};

export const loadAndWait = async (url, defaultOptions) => {
  const _defaultOptions = defaultOptions
    ? defaultOptions
    : {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

  const response = await fetch(url, _defaultOptions);
  return response.json();
};
