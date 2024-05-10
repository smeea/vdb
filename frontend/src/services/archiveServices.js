import { setTwdResults, setPdaResults } from '@/context';
import { DEFAULT_OPTIONS } from '@/utils/constants';

export const search = (query, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/search/${inPda ? 'pda' : 'twd'}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(query),
  };

  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      if (inPda) {
        setPdaResults(data);
      } else {
        setTwdResults(data);
      }
    });
};

export const getNewDecks = (q, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? 'pda' : 'twd'}/new/${q}`;
  const options = {};

  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      if (inPda) {
        setPdaResults(data);
      } else {
        setTwdResults(data);
      }
    });
};

export const getRandomDecks = (q, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? 'pda' : 'twd'}/random/${q}`;
  const options = {};

  return fetch(url, { ...DEFAULT_OPTIONS, ...options })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .then((data) => {
      if (inPda) {
        setPdaResults(data);
      } else {
        setTwdResults(data);
      }
    });
};
