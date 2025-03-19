import { useNavigate } from 'react-router';
import Bullseye from '@icons/bullseye.svg?react';
import { Button } from '@/components';
import { CRYPT, GE, LE } from '@/constants';
import { clearSearchForm } from '@/context';
import { getLibraryRequirements } from '@/utils';

const ButtonPlayableBy = ({ card, handleClose }) => {
  const navigate = useNavigate();

  const {
    isCapacity,
    isClan,
    isDiscipline,
    isRedlist,
    isSect,
    isNonSect,
    isTitle,
    isSeraph,
    isBlackHand,
  } = getLibraryRequirements(card);

  const handleClick = () => {
    const queries = [];
    const traits = [];

    if (isDiscipline.length > 0) {
      const values = isDiscipline.map((i) => `"${i}"%3A1`);
      queries.push(`"disciplines"%3A{${values.join('%2C')}}`);
    }

    if (isClan.length > 0) {
      const values = isClan.map((i) => `"${i.toLowerCase()}"`);
      queries.push(`"clan"%3A{"value"%3A[${values.join('%2C')}]%2C"logic"%3A"or"}`);
    }
    if (isTitle.length > 0) {
      if (isTitle[0] == 'titled') {
        queries.push(`"votes"%3A"1"`);
      } else {
        const values = isTitle.map((i) => `"${i}"%3Atrue`);
        queries.push(`"titles"%3A{${values.join('%2C')}}`);
      }
    }
    if (isCapacity) {
      const [v, logic] = isCapacity.split(' or ');
      queries.push(
        `"capacity"%3A{"value"%3A[{"capacity"%3A"${v}"%2C"moreless"%3A"${
          logic === 'more' ? GE : LE
        }"}]%2C"logic"%3A"or"}`,
      );
    }
    if (isSect) {
      queries.push(`"sect"%3A{"value"%3A["${isSect}"]%2C"logic"%3A"or"}`);
    }
    if (isNonSect) {
      queries.push(`"sect"%3A{"value"%3A["${isNonSect}"]%2C"logic"%3A"not"}`);
    }
    if (isRedlist) traits.push('red list');
    if (isSeraph) traits.push('seraph');
    if (isBlackHand) traits.push('black hand');

    if (traits.length > 0) {
      const traitsQuery = traits.map((t) => `"${t}"%3Atrue`).join('%2C');
      queries.push(`"traits"%3A{${traitsQuery}}`);
    }

    clearSearchForm(CRYPT);
    navigate(`/crypt?q={${queries.join('%2C')}}`);

    handleClose && handleClose();
  };

  return (
    <Button title="Search Who Can Play It" onClick={handleClick}>
      <Bullseye />
    </Button>
  );
};

export default ButtonPlayableBy;
