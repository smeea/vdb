import { proxy } from 'valtio';
import { deepClone } from '@/utils';
import defaultsPdaForm from '@/components/search_forms/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from '@/components/search_forms/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from '@/components/search_forms/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from '@/components/search_forms/forms_data/defaultsLibraryForm.json';
import defaultsAnalyzeForm from '@/components/search_forms/forms_data/defaultsAnalyzeForm.json';

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

export const searchAnalyzeForm = proxy({
  ...deepClone(defaultsAnalyzeForm),
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

export const setAnalyzeResults = (v) => {
  searchResults.analyze = v;
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
      searchCryptForm.text[0] = deepClone(defaultsCryptForm.text[0]);
      for (let i = 1; i < searchCryptForm.text.length; i++) {
        searchCryptForm.text.pop();
      }
      searchCryptForm.votes = 'any';
      searchCryptForm.artist = 'any';

      Object.keys(defaultsCryptForm).forEach((k) => {
        if (['text', 'votes', 'artist'].includes(k)) return;
        Object.keys(defaultsCryptForm[k]).forEach((v) => {
          searchCryptForm[k][v] = deepClone(defaultsCryptForm[k][v]);
        });
      });
      break;
    case 'library':
      searchLibraryForm.text[0] = deepClone(defaultsLibraryForm.text[0]);
      for (let i = 1; i < searchCryptForm.text.length; i++) {
        searchCryptForm.text.pop();
      }
      searchLibraryForm.artist = 'any';

      Object.keys(defaultsLibraryForm).forEach((k) => {
        if (['text', 'artist'].includes(k)) return;
        Object.keys(defaultsLibraryForm[k]).forEach((v) => {
          searchLibraryForm[k][v] = deepClone(defaultsLibraryForm[k][v]);
        });
      });
      break;
    case 'twd':
      Object.keys(defaultsTwdForm).map((k) => {
        searchTwdForm[k] = deepClone(defaultsTwdForm[k]);
      });
      break;
    case 'analyze':
      Object.keys(defaultsAnalyzeForm).map((k) => {
        searchAnalyzeForm[k] = deepClone(defaultsAnalyzeForm[k]);
      });
      break;
    case 'pda':
      Object.keys(defaultsPdaForm).map((k) => {
        searchPdaForm[k] = deepClone(defaultsPdaForm[k]);
      });
      break;
  }
};
