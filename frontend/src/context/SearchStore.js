import { proxy } from 'valtio';
import defaultsPdaForm from 'components/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from 'components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from 'components/forms_data/defaultsLibraryForm.json';

export const searchResults = proxy({});

export const searchCryptForm = proxy({
  ...JSON.parse(JSON.stringify(defaultsCryptForm)),
});

export const searchLibraryForm = proxy({
  ...JSON.parse(JSON.stringify(defaultsLibraryForm)),
});

export const searchTwdForm = proxy({
  ...JSON.parse(JSON.stringify(defaultsTwdForm)),
});

export const searchPdaForm = proxy({
  ...JSON.parse(JSON.stringify(defaultsPdaForm)),
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

export const setQuickCard = (v) => {
  searchResults.quickCard = v;
};

export const clearSearchForm = (target) => {
  switch (target) {
    case 'crypt':
      Object.keys(defaultsCryptForm).map((k) => {
        searchCryptForm[k] = JSON.parse(JSON.stringify(defaultsCryptForm[k]));
      });
      break;
    case 'library':
      Object.keys(defaultsLibraryForm).map((k) => {
        searchLibraryForm[k] = JSON.parse(
          JSON.stringify(defaultsLibraryForm[k])
        );
      });
      break;
    case 'twd':
      Object.keys(defaultsTwdForm).map((k) => {
        searchTwdForm[k] = JSON.parse(JSON.stringify(defaultsTwdForm[k]));
      });
      break;
    case 'pda':
      Object.keys(defaultsPdaForm).map((k) => {
        searchPdaForm[k] = JSON.parse(JSON.stringify(defaultsPdaForm[k]));
      });
      break;
  }
};
