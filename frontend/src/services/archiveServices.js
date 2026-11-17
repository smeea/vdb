import ky from "ky";
import { setPdaResults, setTwdResults } from "@/context";

export const search = (query, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/search/${inPda ? "pda" : "twd"}`;
  const setResults = inPda ? setPdaResults : setTwdResults;

  return ky
    .post(url, { json: query })
    .json()
    .then((data) => setResults(data));
};

export const getNewDecks = (q, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? "pda" : "twd"}/new/${q}`;
  const setResults = inPda ? setPdaResults : setTwdResults;

  return ky
    .get(url)
    .json()
    .then((data) => setResults(data));
};

export const getRandomDecks = (q, inPda = false) => {
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? "pda" : "twd"}/random/${q}`;
  const setResults = inPda ? setPdaResults : setTwdResults;

  return ky
    .get(url)
    .json()
    .then((data) => setResults(data));
};

export const getAllTda = () => {
  const url = `${import.meta.env.VITE_API_URL}/tda`;
  return ky
    .get(url)
    .json()
};


export const getTda = (id) => {
  const url = `${import.meta.env.VITE_API_URL}/tda/${id}`;
  return ky.get(url).json();
};
