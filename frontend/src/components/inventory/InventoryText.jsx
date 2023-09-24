import React from 'react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg';
import { inventoryCardTextChange } from '@/context';
import { Textarea } from '@/components';

const InventoryText = ({ card, text, inPopover }) => {
  const handleChange = (event) => {
    inventoryCardTextChange(card, event.target.value);
  };

  const lines = text ? text.split('\n').length : 1;

  return (
    <>
      {(!inPopover || text) && (
        <div className="flex items-center gap-1.5">
          <div className="opacity-40">
            <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
          </div>
          {inPopover ? (
            <>{text}</>
          ) : (
            <Textarea
              className="text-sm"
              rows={lines}
              onChange={handleChange}
              value={text ?? ''}
            />
          )}
        </div>
      )}
    </>
  );
};

export default InventoryText;
