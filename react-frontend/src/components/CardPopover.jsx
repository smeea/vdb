import React from 'react';
import { Popover } from 'react-bootstrap';
import { ResultCryptPopover, ResultLibraryPopover } from 'components';
import { useApp } from 'context';

const CardPopover = React.forwardRef((props, ref) => {
  const { showImage } = useApp();

  const { card, ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <Popover.Body className={showImage ? 'p-1' : 'p-3'}>
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
