import React, { useState } from 'react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import { useDebounce } from '@/hooks';
import { inventoryCardTextChange } from '@/context';
import { Textarea } from '@/components';

const InventoryText = ({ card, text, inPopover }) => {
  const [newText, setNewText] = useState(text || '');
  const handleChange = (event) => setNewText(event.target.value);
  const lines = newText.split('\n').length;

  useDebounce(
    () => {
      inventoryCardTextChange(card, newText);
    },
    300,
    [newText]
  );

  return (
    <div className="flex items-top gap-1.5">
      <div className={`opacity-40 ${inPopover ? 'pt-1' : 'pt-2'}`}>
        <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
      </div>
      {inPopover ? (
        <div className="text-sm">{newText}</div>
      ) : (
        <Textarea
          className="text-sm"
          rows={lines}
          onChange={handleChange}
          value={newText}
        />
      )}
    </div>
  );
};

export default InventoryText;
