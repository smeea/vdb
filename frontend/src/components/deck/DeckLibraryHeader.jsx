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
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      <div className="space-x-2 px-2 py-1 font-bold">
        <div className="inline">
          Library [{libraryTotal}
          {!inMissing &&
            (libraryTotal < 60 || libraryTotal > 90) &&
            ' of 60-90'}
          ]
        </div>
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
      {!inMissing && (
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1" title="Total Blood Cost">
            <img
              className="optimize-contrast h-[31px] pb-1"
              src={`${process.env.ROOT_URL}images/misc/bloodX.png`}
            />
            <b>{bloodTotal}</b>
          </div>
          <div className="flex items-center space-x-1" title="Total Pool Cost">
            <img
              className="optimize-contrast h-[30px]"
              src={`${process.env.ROOT_URL}images/misc/poolX.png`}
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
