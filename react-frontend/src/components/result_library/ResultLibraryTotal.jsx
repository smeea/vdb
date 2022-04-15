import React from 'react';
import { Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ResultLibraryTypeImage, ResultLibrarySortForm } from 'components';
import { useSearchResults } from 'context';

const ResultLibraryTotal = ({ cards, handleChange, inCompare }) => {
  const { setLibraryCompare } = useSearchResults();

  const byTypes = {};
  let total = 0;

  cards.map((card, index) => {
    if (byTypes[card.Type]) {
      byTypes[card.Type] += 1;
    } else {
      byTypes[card.Type] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byTypes).map((k, index) => {
    return (
      <span key={k} className="d-inline-block nobr pe-3">
        <div className="d-flex align-items-center">
          <ResultLibraryTypeImage value={k} />
          {byTypes[k]}
        </div>
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>
          {inCompare ? 'COMPARE' : 'TOTAL'}: {total}
        </b>
      </div>
      <div>{totalOutput}</div>
      <div className={inCompare ? 'd-flex' : ''}>
        <ResultLibrarySortForm onChange={handleChange} />
        {inCompare && (
          <div className="ms-1">
            <Button
              title="Clear Compare"
              variant="primary"
              onClick={() => setLibraryCompare(undefined)}
            >
              <X width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message pe-1 pe-md-0">
      {value}
    </div>
  );
};

export default ResultLibraryTotal;
