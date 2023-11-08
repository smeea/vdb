import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import defaultsPdaForm from '@/components/search_forms/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from '@/components/search_forms/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from '@/components/search_forms/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from '@/components/search_forms/forms_data/defaultsLibraryForm.json';

export const searchResults = proxy({});

export const searchCryptForm = proxy({
  ...deepClone(defaultsCryptForm),
});

export const searchLibraryForm = proxy({
  ...deepClone(defaultsLibraryForm),
});

export const searchTwdForm = proxy({
  ...deepClone(defaultsTwdForm),
});

export const searchPdaForm = proxy({
  ...deepClone(defaultsPdaForm),
});

export const setCryptResults = (v) => {
  searchResults.crypt = v;
};

export const setLibraryResults = (v) => {
  searchResults.library = v;
};

export const setPdaResults = (v) => {
  searchResults.pda = v;
};

export const setTwdResults = (v) => {
  searchResults.twd = v;
};

export const setCryptCompare = (v) => {
  searchResults.cryptCompare = v;
};

export const setLibraryCompare = (v) => {
  searchResults.libraryCompare = v;
};

export const clearSearchForm = (target) => {
  switch (target) {
    case 'crypt':
      searchCryptForm.text = structuredClone(defaultsCryptForm.text);
      searchCryptForm.votes = 'any';
      searchCryptForm.artist = 'any';

      Object.keys(defaultsCryptForm).forEach((k) => {
        if (['text', 'votes', 'artist'].includes(k)) return;
        Object.keys(defaultsCryptForm[k]).forEach((v) => {
          searchCryptForm[k][v] = structuredClone(defaultsCryptForm[k][v]);
        });
      });
      break;
    case 'library':
      searchLibraryForm.text = structuredClone(defaultsLibraryForm.text);
      searchLibraryForm.artist = 'any';

      Object.keys(defaultsLibraryForm).forEach((k) => {
        if (['text', 'artist'].includes(k)) return;
        Object.keys(defaultsLibraryForm[k]).forEach((v) => {
          searchLibraryForm[k][v] = structuredClone(defaultsLibraryForm[k][v]);
        });
      });
      break;
    case 'twd':
      Object.keys(defaultsTwdForm).map((k) => {
        searchTwdForm[k] = structuredClone(defaultsTwdForm[k]);
      });
      break;
    case 'pda':
      Object.keys(defaultsPdaForm).map((k) => {
        searchPdaForm[k] = structuredClone(defaultsPdaForm[k]);
      });
      break;
  }
};
