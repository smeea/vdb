import React from 'react';
import Check2 from '@icons/check2.svg?react';
import { Spinner, ButtonFloat, ErrorOverlay } from '@/components';

const ButtonFloatSearch = ({ handleSearch, error, isLoading }) => {
  return (
    <ButtonFloat onClick={handleSearch} variant="success">
      {!isLoading ? (
        <Check2 width="35" height="35" viewBox="0 0 16 16" />
      ) : (
        <Spinner className="size-7" />
      )}
      {error && <ErrorOverlay placement="left">{error}</ErrorOverlay>}
    </ButtonFloat>
  );
};

export default ButtonFloatSearch;
