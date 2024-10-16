import { proxy } from 'valtio';
import defaultsPdaForm from '@/components/search_forms/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from '@/components/search_forms/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from '@/components/search_forms/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from '@/components/search_forms/forms_data/defaultsLibraryForm.json';
import { CRYPT_COMPARE, LIBRARY_COMPARE, CRYPT, LIBRARY, ANY, TWD, PDA } from '@/utils/constants';

export const searchResults = proxy({});

export const searchCryptForm = proxy({
  ...structuredClone(defaultsCryptForm),
});

export const searchLibraryForm = proxy({
  ...structuredClone(defaultsLibraryForm),
});

export const searchTwdForm = proxy({
  ...structuredClone(defaultsTwdForm),
});

export const searchPdaForm = proxy({
  ...structuredClone(defaultsPdaForm),
});

export const setCryptResults = (v) => {
  searchResults[CRYPT] = v;
};

export const setLibraryResults = (v) => {
  searchResults[LIBRARY] = v;
};

export const setPdaResults = (v) => {
  searchResults[PDA] = v;
};

export const setTwdResults = (v) => {
  searchResults[TWD] = v;
};

export const setCryptCompare = (v) => {
  searchResults[CRYPT_COMPARE] = v;
};

export const setLibraryCompare = (v) => {
  searchResults[LIBRARY_COMPARE] = v;
};

export const clearSearchForm = (target) => {
  switch (target) {
    case CRYPT:
      console.log('FOO');
      searchCryptForm.text = structuredClone(defaultsCryptForm.text);
      searchCryptForm.votes = ANY;
      searchCryptForm.artist = ANY;

      Object.keys(defaultsCryptForm).forEach((k) => {
        if (['text', 'votes', 'artist'].includes(k)) return;
        Object.keys(defaultsCryptForm[k]).forEach((v) => {
          searchCryptForm[k][v] = structuredClone(defaultsCryptForm[k][v]);
        });
      });
      break;
    case LIBRARY:
      searchLibraryForm.text = structuredClone(defaultsLibraryForm.text);
      searchLibraryForm.artist = ANY;

      Object.keys(defaultsLibraryForm).forEach((k) => {
        if (['text', 'artist'].includes(k)) return;
        Object.keys(defaultsLibraryForm[k]).forEach((v) => {
          searchLibraryForm[k][v] = structuredClone(defaultsLibraryForm[k][v]);
        });
      });
      break;
    case TWD:
      Object.keys(defaultsTwdForm).forEach((k) => {
        searchTwdForm[k] = structuredClone(defaultsTwdForm[k]);
      });
      break;
    case PDA:
      Object.keys(defaultsPdaForm).forEach((k) => {
        searchPdaForm[k] = structuredClone(defaultsPdaForm[k]);
      });
      break;
  }
};
