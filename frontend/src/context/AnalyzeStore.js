import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import defaultsAnalyzeForm from '@/components/search_forms/forms_data/defaultsAnalyzeForm.json';

export const searchAnalyzeForm = proxy({
  ...deepClone(defaultsAnalyzeForm),
});

export const analyzeStore = proxy({
  all: undefined,
  results: undefined,
  info: undefined,
});

export const setAnalyzeInfo = (v) => {
  analyzeStore.info = v;
};

export const setAnalyzeDecks = (v) => {
  analyzeStore.all = v;
};

export const setAnalyzeResults = (v) => {
  analyzeStore.results = v;
};

export const clearAnalyzeForm = () => {
  Object.keys(defaultsAnalyzeForm).map((k) => {
    searchAnalyzeForm[k] = deepClone(defaultsAnalyzeForm[k]);
  });
};
