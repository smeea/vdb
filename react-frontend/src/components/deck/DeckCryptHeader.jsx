import React from 'react';
import { Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import { DeckCryptSortButton } from 'components';
import { useApp } from 'context';

const DeckCryptHeader = (props) => {
  const {
    cryptTotal,
    inMissing,
    cryptGroups,
    toggleShowInfo,
    toggleShowAdd,
    hasBanned,
    isAuthor,
    isPublic,
  } = props;

  const { isMobile } = useApp();

  return (
    <div
      className={
        isMobile
          ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
          : 'd-flex align-items-center justify-content-between ps-2 info-message'
      }
    >
      <b>
        Crypt [{cryptTotal}
        {!inMissing && cryptTotal < 12 && ' of 12+'}]
        {!inMissing && ` - ${cryptGroups}`}
        {!inMissing && hasBanned && ' - WITH BANNED'}
      </b>
      <div className="d-flex align-items-center justify-content-between ps-2 pe-1 pe-md-0 info-message">
        <div className="d-flex">
          <div className="pe-1">
            <DeckCryptSortButton />
          </div>
          <Button
            title="Additional Info"
            variant="primary"
            onClick={() => toggleShowInfo()}
          >
            <InfoCircle />
          </Button>
          {isAuthor && !isPublic && !isMobile && (
            <div className="ps-1">
              <Button
                title="Add Card"
                variant="primary"
                onClick={() => toggleShowAdd()}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckCryptHeader;
