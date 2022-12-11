import React from 'react';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { Button, SortButton } from 'components';
import { useApp } from 'context';
import Exclamation from 'assets/images/icons/exclamation-triangle.svg';

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
    <div className="info-message pl-2 pr-1 pr-md-0 flex items-center justify-between">
      <b>
        Crypt [{cryptTotal}
        {!inMissing && cryptTotal < 12 && ' of 12+'}]{!inMissing && cryptGroups}
        {!inMissing && hasBanned && (
          <div className="inline items-center px-3 text-red-600">
            <Exclamation
              width="16"
              heigth="16"
              viewBox="0 2 16 16"
              className="pr-1 inline"
            />
            BANNED
          </div>
        )}
      </b>
      <div className="pl-2 pr-md-0 flex items-center justify-between">
        <div className="flex flex-row space-x-1">
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
    </div>
  );
};

export default DeckCryptHeader;
