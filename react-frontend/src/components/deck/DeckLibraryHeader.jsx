import React from 'react';
import { Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';

const DeckLibraryHeader = (props) => {
  const {
    isMobile,
    libraryTotal,
    inMissing,
    bloodTotal,
    poolTotal,
    toogleShowInfo,
    toogleShowAdd,
    hasBanned,
    inAdvSelect,
    isAuthor,
  } = props;

  return (
    <div
      className={
        isMobile
          ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
          : 'd-flex align-items-center justify-content-between ps-2 info-message'
      }
    >
      <b>
        Library [{libraryTotal}
        {!inMissing && (libraryTotal < 60 || libraryTotal > 90) && ' of 60-90'}]
        {!inMissing && hasBanned && ' - WITH BANNED'}
      </b>
      <div className="d-flex">
        {!inMissing && (
          <>
            <div
              className="d-flex align-items-center pe-3"
              title="Total Blood Cost"
            >
              <img
                className="cost-blood-image-results pb-1 pe-1"
                src={process.env.ROOT_URL + 'images/misc/bloodX.png'}
              />
              <b>{bloodTotal}</b>
            </div>
            <div
              className="d-flex align-items-center pe-3"
              title="Total Pool Cost"
            >
              <img
                className="cost-pool-image-results py-1 pe-1"
                src={process.env.ROOT_URL + 'images/misc/poolX.png'}
              />
              <b>{poolTotal}</b>
            </div>
          </>
        )}
        {!inAdvSelect && (
          <>
            <Button
              title="Additional Info"
              variant="primary"
              onClick={() => toogleShowInfo()}
            >
              <InfoCircle />
            </Button>
            {isAuthor && !isMobile && (
              <div className="ps-1">
                <Button
                  title="Add Card"
                  variant="primary"
                  onClick={() => toogleShowAdd()}
                >
                  +
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeckLibraryHeader;
