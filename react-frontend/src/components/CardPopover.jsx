import React from 'react';
import { Popover } from 'react-bootstrap';
import { ResultCryptPopover, ResultLibraryPopover } from 'components';

const CardPopover = React.forwardRef((props, ref) => {
  const { card, ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <Popover.Body>
        {props.card.Id > 200000 ? (
          <ResultCryptPopover card={card} />
        ) : (
          <ResultLibraryPopover card={card} />
        )}
      </Popover.Body>
    </Popover>
  );
});
CardPopover.displayName = 'CardPopover';

export default CardPopover;
