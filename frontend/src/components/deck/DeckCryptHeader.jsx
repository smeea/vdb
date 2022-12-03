import React from 'react';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { Button, SortButton } from 'components';
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
    <div className="flex items-center justify-between info-message ps-2 pe-1 pe-md-0">
      <b>
        Crypt [{cryptTotal}
        {!inMissing && cryptTotal < 12 && ' of 12+'}]
        {!inMissing && ` - ${cryptGroups}`}
        {!inMissing && hasBanned && ' - WITH BANNED'}
      </b>
      <div className="flex items-center justify-between ps-2 pe-md-0">
        <div className="flex flex-row space-x-1">
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
        </div>
      </div>
    </div>
  );
};

export default DeckCryptHeader;
