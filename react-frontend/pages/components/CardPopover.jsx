import React from 'react';
import { Popover } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';

const CardPopover = React.forwardRef((props, ref) => {
  const { card, ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <Popover.Content>
        {props.card.Id > 200000 ? (
          <ResultCryptPopover card={card} />
        ) : (
          <ResultLibraryPopover card={card} />
        )}
      </Popover.Content>
    </Popover>
  );
});
CardPopover.displayName = 'CardPopover';

export default CardPopover;
