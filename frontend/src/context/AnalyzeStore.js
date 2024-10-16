import { proxy } from 'valtio';
import defaultsAnalyzeForm from '@/components/search_forms/forms_data/defaultsAnalyzeForm.json';
import { DECKS, RESULTS, INFO } from '@/utils/constants';

export const searchAnalyzeForm = proxy({
  ...structuredClone(defaultsAnalyzeForm),
});

export const analyzeStore = proxy({
  [DECKS]: undefined,
  [RESULTS]: undefined,
  [INFO]: undefined,
});

export const setAnalyzeInfo = (v) => {
  analyzeStore[INFO] = v;
};

export const setAnalyzeDecks = (v) => {
  analyzeStore[DECKS] = v;
};

export const setAnalyzeResults = (v) => {
  analyzeStore[RESULTS] = v;
};

export const clearAnalyzeForm = () => {
  Object.keys(defaultsAnalyzeForm).forEach((k) => {
    searchAnalyzeForm[k] = structuredClone(defaultsAnalyzeForm[k]);
  });
};
