import React from 'react';
import { Popover } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';

const UsedPopover = React.forwardRef(( props, ref) => {
  const { softUsedMax, hardUsedTotal, SoftUsedDescription, HardUsedDescription, inInventory, ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <Popover.Content>
        <>
          {softUsedMax == 0 && hardUsedTotal == 0 ? (
            <div className="py-1">Not used in inventory decks</div>
          ) : (
            <>
              {softUsedMax > 0 && <>{SoftUsedDescription}</>}
              {hardUsedTotal > 0 && <>{HardUsedDescription}</>}
            </>
          )}
          <hr />
          <div className="d-flex align-items-center">
            <div className="opacity-035">
              <CalculatorFill />
            </div>
            <div className="px-1">
              <b>{softUsedMax + hardUsedTotal}</b>
            </div>
            - Total Used
          </div>
          <div className="d-flex align-items-center">
            <div className="opacity-035">
              <ArchiveFill />
            </div>
            <div className="px-1">
              <b>{inInventory}</b>
            </div>
            - In Inventory
          </div>
        </>
      </Popover.Content>
    </Popover>
  );
});
UsedPopover.displayName = 'UsedPopover';

export default UsedPopover;
