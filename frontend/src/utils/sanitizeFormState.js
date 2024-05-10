import { deepClone } from '@/utils';

const sanitizeFormState = (target, state) => {
  const input = deepClone(state);
  let forms = [];

  switch (target) {
    case 'crypt':
    case 'library':
      forms = ['text'];
      break;
    default:
      forms = [];
  }

  forms.forEach((i) => {
    input[i].forEach((j, idx) => {
      Object.entries(j).forEach(([key, value]) => {
        switch (key) {
          case 'value':
            if (value === '') input[i].splice(idx, 1);
            break;
          default:
            if (input[i][idx] && !value) delete input[i][idx][key];
        }
      });
    });
  });

  switch (target) {
    case 'crypt':
      forms = ['disciplines', 'titles', 'group', 'traits'];
      break;
    case 'library':
      forms = ['traits'];
      break;
    case 'pda':
      forms = ['disciplines', 'traits', 'cardtypes', 'date', 'capacity', 'libraryTotal'];
      break;
    case 'twd':
      forms = [
        'disciplines',
        'traits',
        'cardtypes',
        'date',
        'players',
        'location',
        'capacity',
        'libraryTotal',
      ];
      break;
    case 'analyze':
      forms = ['disciplines', 'traits', 'cardtypes', 'rank', 'capacity', 'libraryTotal'];
      break;
    default:
      forms = [];
  }
  forms.forEach((i) => {
    Object.keys(input[i]).forEach((k) => {
      (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k];
    });
  });

  switch (target) {
    case 'pda':
    case 'twd':
      forms = ['matchInventory'];
      break;
    default:
      forms = [];
  }
  forms.forEach((i) => {
    Object.keys(input[i]).forEach((k) => {
      (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k];
    });
    if (!input[i].crypt && !input[i].library) delete input[i];
  });

  switch (target) {
    case 'crypt':
      forms = ['set', 'precon'];
      break;
    case 'library':
      forms = ['discipline', 'type', 'set', 'precon'];
      break;
    default:
      forms = [];
  }
  forms.forEach((i) => {
    Object.keys(input[i]).forEach((k) => {
      input[i][k] === false && delete input[i][k];
      input[i].value.forEach((j, idx) => {
        if (j === 'any') {
          input[i].value.splice(idx, 1);
        }
      });
    });
  });

  switch (target) {
    case 'library':
      forms = ['blood', 'pool', 'capacity'];
      break;
    default:
      forms = [];
  }
  forms.forEach((i) => {
    if (input[i][i] == 'any') {
      delete input[i];
    }
  });

  switch (target) {
    case 'crypt':
      forms = ['capacity'];
      break;
    default:
      forms = [];
      break;
  }
  forms.forEach((i) => {
    input[i].value.forEach((j, idx) => {
      if (j[i] === 'any') {
        input[i].value.splice(idx, 1);
      }
    });
  });

  switch (target) {
    case 'crypt':
      forms = ['clan', 'sect'];
      forms.forEach((i) => {
        input[i].value.forEach((j, idx) => {
          if (j === 'any') {
            input[i].value.splice(idx, 1);
          }
        });
      });
      break;
    case 'library':
      forms = ['clan', 'sect', 'title'];
      forms.forEach((i) => {
        input[i].value.forEach((j, idx) => {
          if (j === 'any') {
            input[i].value.splice(idx, 1);
          }
        });
      });
      break;
    case 'analyze':
    case 'pda':
    case 'twd':
      forms = ['crypt', 'library'];
      forms.forEach((i) => {
        Object.keys(input[i]).forEach((k) => {
          input[i][k] == -1 && delete input[i][k];
        });
      });
      break;
    default:
      forms = [];
  }

  Object.keys(input).forEach((k) => {
    if (
      input[k] == 'any' ||
      !input[k] ||
      input[k].length === 0 ||
      (input[k].value && input[k].value.length === 0) ||
      Object.keys(input[k]).length === 0
    ) {
      delete input[k];
    }
  });

  return input;
};

export default sanitizeFormState;
