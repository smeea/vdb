import React from 'react';
import { Popover } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';
import ResultLibraryPopover from './ResultLibraryPopover.jsx';

const CardPopover = React.forwardRef((props, ref) => {
  const { card, showImage, ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <Popover.Content>
        {props.card.Id > 200000 ? (
          <ResultCryptPopover card={card} showImage={showImage} />
        ) : (
          <ResultLibraryPopover card={card} showImage={showImage} />
        )}
      </Popover.Content>
    </Popover>
  );
});
CardPopover.displayName = 'CardPopover';

export default CardPopover;
