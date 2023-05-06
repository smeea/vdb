import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bullseye from '@/assets/images/icons/bullseye.svg';
import { Button } from '@/components';
import { clearSearchForm } from '@/context';
import { useLibraryRequirements } from '@/hooks';

const ButtonPlayableBy = ({ card }) => {
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
  } = useLibraryRequirements(card);

  const onClick = () => {
    const queries = [];
    const traits = [];

    if (isDiscipline.length > 0) {
      const values = isDiscipline.map((i) => `"${i}"%3A1`);
      queries.push(`"disciplines"%3A{${values.join('%2C')}}`);
    }

    if (isClan.length > 0) {
      const values = isClan.map((i) => `"${i.toLowerCase()}"`);
      queries.push(
        `"clan"%3A{"value"%3A[${values.join('%2C')}]%2C"logic"%3A"or"}`
      );
    }
    if (isTitle.length > 0) {
      const values = isTitle.map((i) => `"${i}"%3Atrue`);
      queries.push(`"titles"%3A{${values.join('%2C')}}`);
    }
    if (isCapacity) {
      const [v, logic] = isCapacity.split(' or ');
      queries.push(
        `"capacity"%3A{"value"%3A[{"capacity"%3A"${v}"%2C"moreless"%3A"${
          logic === 'more' ? 'ge' : 'le'
        }"}]%2C"logic"%3A"or"}`
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

    clearSearchForm('crypt');
    navigate(`/crypt?q={${queries.join('%2C')}}`);
  };

  return (
    <Button title="Search Who Can Play It" variant="primary" onClick={onClick}>
      <Bullseye />
    </Button>
  );
};

export default ButtonPlayableBy;
