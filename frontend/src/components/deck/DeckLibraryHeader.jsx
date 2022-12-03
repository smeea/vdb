import React from 'react';
import { Button } from 'components';
import InfoCircle from 'assets/images/icons/info-circle.svg';

const DeckLibraryHeader = ({
  isMobile,
  libraryTotal,
  inMissing,
  bloodTotal,
  poolTotal,
  toggleShowInfo,
  toggleShowAdd,
  hasBanned,
  isEditable,
  inReview,
}) => {
  return (
    <div
      className={
        isMobile
          ? 'flex items-center justify-between ps-2 pe-1 info-message'
          : 'flex items-center justify-between ps-2 info-message'
      }
    >
      <b>
        Library [{libraryTotal}
        {!inMissing && (libraryTotal < 60 || libraryTotal > 90) && ' of 60-90'}]
        {!inMissing && hasBanned && ' - WITH BANNED'}
      </b>
      {!inMissing && (
        <div className="flex">
          <div className="flex items-center pe-3" title="Total Blood Cost">
            <img
              className="cost-blood-image-results pb-1 pe-1"
              src={process.env.ROOT_URL + 'images/misc/bloodX.png'}
            />
            <b>{bloodTotal}</b>
          </div>
          <div className="flex items-center" title="Total Pool Cost">
            <img
              className="cost-pool-image-results py-1 pe-1"
              src={process.env.ROOT_URL + 'images/misc/poolX.png'}
            />
            <b>{poolTotal}</b>
          </div>
        </div>
      )}
      <div className="flex flex-row space-x-1">
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
  );
};

export default DeckLibraryHeader;
