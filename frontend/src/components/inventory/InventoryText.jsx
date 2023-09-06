import React from 'react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg';
import { inventoryCardTextChange } from '@/context';
import { Textarea } from '@/components';

const InventoryText = ({ card, text }) => {
  const handleChange = (event) => {
    inventoryCardTextChange(card, event.target.value);
  };

  const lines = text ? text.split('\n').length : 1;

  return (
    <div className="flex items-center gap-1.5">
      <div className="opacity-40">
        <ChatLeftQuoteFill />
      </div>
      <Textarea
        className="text-sm"
        rows={lines}
        onChange={handleChange}
        value={text ?? ''}
      />
    </div>
  );
};

export default InventoryText;
