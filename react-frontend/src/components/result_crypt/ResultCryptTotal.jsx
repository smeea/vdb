import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { ResultCryptSortForm } from 'components';
import { useApp } from 'context';

function ResultCryptTotal({ cards, handleChange, toggleShowInfo }) {
  const { isMobile } = useApp();

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
          <b>G{k}:</b>
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
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap={1}>
        <Button
          title="Additional Info"
          variant="primary"
          onClick={() => toggleShowInfo()}
        >
          <InfoCircle />
        </Button>
        <ResultCryptSortForm onChange={handleChange} />
      </Stack>
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message pe-1 pe-md-0">
      {value}
    </div>
  );
}

export default ResultCryptTotal;
