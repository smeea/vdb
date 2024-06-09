import { proxy } from 'valtio';
import defaultsAnalyzeForm from '@/components/search_forms/forms_data/defaultsAnalyzeForm.json';

export const searchAnalyzeForm = proxy({
  ...structuredClone(defaultsAnalyzeForm),
});

export const analyzeStore = proxy({
  decks: undefined,
  results: undefined,
  info: undefined,
});

export const setAnalyzeInfo = (v) => {
  analyzeStore.info = v;
};

export const setAnalyzeDecks = (v) => {
  analyzeStore.decks = v;
};

export const setAnalyzeResults = (v) => {
  analyzeStore.results = v;
};

export const clearAnalyzeForm = () => {
  Object.keys(defaultsAnalyzeForm).forEach((k) => {
    searchAnalyzeForm[k] = structuredClone(defaultsAnalyzeForm[k]);
  });
};
