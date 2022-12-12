import React from 'react';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import Exclamation from 'assets/images/icons/exclamation-triangle.svg';
import { Button } from 'components';

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
    <div className="info-message flex items-center justify-between">
      <div className="font-bold space-x-2 px-2 py-1">
        <div className="inline">
          Library [{libraryTotal}
          {!inMissing &&
            (libraryTotal < 60 || libraryTotal > 90) &&
            ' of 60-90'}
          ]
        </div>
        {!inMissing && hasBanned && (
          <div className="inline items-center text-red-600">
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
      {!inMissing && (
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1" title="Total Blood Cost">
            <img
              className="cost-blood-image-results max-h-[29px] pb-1"
              src={process.env.ROOT_URL + 'images/misc/bloodX.png'}
            />
            <b>{bloodTotal}</b>
          </div>
          <div className="flex items-center space-x-1" title="Total Pool Cost">
            <img
              className="cost-pool-image-results max-h-[27px]"
              src={process.env.ROOT_URL + 'images/misc/poolX.png'}
            />
            <b>{poolTotal}</b>
          </div>
        </div>
      )}
      <div className="flex space-x-1">
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

export default DeckLibraryHeader;
