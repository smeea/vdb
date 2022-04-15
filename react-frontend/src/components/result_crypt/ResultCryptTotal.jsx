import React from 'react';
import { Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { ResultCryptSortForm } from 'components';
import { useSearchResults } from 'context';

const ResultCryptTotal = ({
  cards,
  handleChange,
  toggleShowInfo,
  inCompare,
}) => {
  const { setCryptCompare } = useSearchResults();

  const byGroups = {};
  const byGroupsCapacityTotal = {};
  let total = 0;

  cards.map((card) => {
    if (byGroups[card.Group]) {
      byGroups[card.Group] += 1;
    } else {
      byGroups[card.Group] = 1;
    }
    if (byGroupsCapacityTotal[card.Group]) {
      byGroupsCapacityTotal[card.Group] += card.Capacity;
    } else {
      byGroupsCapacityTotal[card.Group] = card.Capacity;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byGroups).map((k) => {
    return (
      <span key={k} className="d-inline-block nobr pe-3">
        <span className="blue">
          <b>G{k == 'ANY' ? 'X' : k}:</b>
        </span>
        {byGroups[k]}
        <div
          className="d-flex small justify-content-center"
          title="Average Capacity"
        >
          ~{Math.round((byGroupsCapacityTotal[k] / byGroups[k]) * 10) / 10}
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
        {!inCompare && (
          <div className="mb-1">
            <Button
              title="Additional Info"
              variant="primary"
              onClick={() => toggleShowInfo()}
            >
              <InfoCircle />
            </Button>
          </div>
        )}
        <ResultCryptSortForm onChange={handleChange} />
        {inCompare && (
          <div className="ms-1">
            <Button
              title="Clear Compare"
              variant="primary"
              onClick={() => setCryptCompare(undefined)}
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

export default ResultCryptTotal;
