const sanitizeFormState = (target, state) => {
  const input = JSON.parse(JSON.stringify(state));

  let multiSelectForms = [];

  switch (target) {
    case 'crypt':
      multiSelectForms = [
        'disciplines',
        'titles',
        'group',
        'traits',
        'set',
        'precon',
      ];
      break;
    case 'library':
      multiSelectForms = ['traits', 'set', 'precon'];
      break;
    case 'twd':
      multiSelectForms = [
        'disciplines',
        'traits',
        'cardtypes',
        'date',
        'players',
        'capacity',
        'libraryTotal',
        'matchInventory',
      ];
      break;
  }

  multiSelectForms.map((i) => {
    Object.keys(input[i]).forEach(
      (k) => (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k]
    );
  });

  let multiSelectFormsWithMain = [];

  switch (target) {
    case 'crypt':
      multiSelectFormsWithMain = ['capacity'];
      break;
    case 'library':
      multiSelectFormsWithMain = ['blood', 'pool', 'capacity'];
      break;
  }

  multiSelectFormsWithMain.map((i) => {
    if (input[i][i] == 'any') {
      delete input[i];
    }
  });

  let multiSelectFormsWithOptions = [];

  switch (target) {
    case 'crypt':
      multiSelectFormsWithOptions = ['set', 'precon'];
      break;
    case 'library':
      multiSelectFormsWithOptions = ['set', 'precon'];
      break;
  }

  multiSelectFormsWithOptions.map((i) => {
    if (!input[i][i]) {
      delete input[i];
    }
  });

  switch (target) {
    case 'library':
      const andOrForms = ['type', 'discipline'];
      andOrForms.map((i) => {
        if (Object.keys(input[i][i]).length === 1 && input[i][i][0] === 'any') {
          delete input[i];
        }
        if (input[i] && input[i][i]) {
          input[i][i] = input[i][i].filter((j) => j !== 'any');
        }
      });
      break;
    case 'twd':
      const cardsForms = ['crypt', 'library'];
      cardsForms.map((i) => {
        Object.keys(input[i]).forEach((k) => {
          input[i][k] == -1 && delete input[i][k];
        });
      });
      break;
  }

  Object.keys(input).forEach(
    (k) =>
      (input[k] == 'any' || !input[k] || Object.keys(input[k]).length === 0) &&
      delete input[k]
  );

  return input;
};

export default sanitizeFormState;
