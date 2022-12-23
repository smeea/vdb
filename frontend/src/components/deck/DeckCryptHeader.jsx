import React from 'react';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import Exclamation from 'assets/images/icons/exclamation-triangle.svg';
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
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      <div className="space-x-2 px-2 py-1 font-bold">
        <div className="inline">
          Crypt [{cryptTotal}
          {!inMissing && cryptTotal < 12 && ' of 12+'}]
        </div>
        {!inMissing && cryptGroups && (
          <div className="inline">{cryptGroups}</div>
        )}
        {!inMissing && hasBanned && (
          <div className="text-red-600 inline items-center">
            <Exclamation
              width="17"
              heigth="17"
              viewBox="0 2 16 16"
              className="inline pr-1"
            />
            BANNED
          </div>
        )}
      </div>
      <div className="flex space-x-1">
        {!inMissing && (
          <SortButton
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        )}
        <Button
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
  );
};

export default DeckCryptHeader;
