import { proxy } from 'valtio';
import defaultsTdaForm from '@/components/search_forms/forms_data/defaultsTdaForm.json';
import { DECKS, INFO, RESULTS } from '@/constants';

export const searchTdaForm = proxy({
  ...structuredClone(defaultsTdaForm),
});

export const tdaStore = proxy({
  [DECKS]: undefined,
  [RESULTS]: undefined,
  [INFO]: undefined,
});

export const setTdaInfo = (v) => {
  tdaStore[INFO] = v;
};

export const setTdaDecks = (v) => {
  tdaStore[DECKS] = v;
};

export const setTdaResults = (v) => {
  tdaStore[RESULTS] = v;
};

export const clearTdaForm = () => {
  Object.keys(defaultsTdaForm).forEach((k) => {
    searchTdaForm[k] = structuredClone(defaultsTdaForm[k]);
  });
};
