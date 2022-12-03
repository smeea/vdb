import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { SortButton } from 'components';
import { useApp } from 'context';

const DeckCryptHeader = ({
  cryptTotal,
  inMissing,
  cryptGroups,
  toggleShowInfo,
  toggleShowAdd,
  hasBanned,
  isEditable,
  sortMethods,
  sortMethod,
  setSortMethod,
  inReview,
}) => {
  const { isMobile } = useApp();

  return (
    <div
      className={
        isMobile
          ? 'flex items-center justify-between ps-2 pe-1 info-message'
          : 'flex items-center justify-between ps-2 info-message'
      }
    >
      <b>
        Crypt [{cryptTotal}
        {!inMissing && cryptTotal < 12 && ' of 12+'}]
        {!inMissing && ` - ${cryptGroups}`}
        {!inMissing && hasBanned && ' - WITH BANNED'}
      </b>
      <div className="flex items-center justify-between ps-2 pe-md-0 info-message">
        <Stack direction="horizontal" gap={1}>
          {!inMissing && (
            <SortButton
              sortMethods={sortMethods}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          )}
          <Button
            className="h-full"
            title="Additional Info"
            variant="primary"
            onClick={toggleShowInfo}
          >
            <InfoCircle />
          </Button>
          {(inReview || isEditable) && !isMobile && (
            <Button title="Add Card" variant="primary" onClick={toggleShowAdd}>
              +
            </Button>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default DeckCryptHeader;
