import ChatLeftQuoteFill from "@icons/chat-left-quote-fill.svg?react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components";
import { inventoryCardTextChange } from "@/context";

const InventoryText = ({ card, text, setIsHotkeysDisabled }) => {
  const [newText, setNewText] = useState(text || "");
  const handleChange = (event) => setNewText(event.target.value);
  const lines = newText.split("\n").length;

  useEffect(() => {
    if (newText !== text) setNewText(text ?? "");
  }, [text]);

  const handleOnBlur = () => {
    if (setIsHotkeysDisabled) setIsHotkeysDisabled(false);
    if (newText !== text) inventoryCardTextChange(card, newText);
  };

  return (
    <div className="items-top flex gap-2">
      <div className="flex min-w-[16px] justify-center pt-2 opacity-40">
        <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
      </div>
      <Textarea
        className="text-sm"
        rows={lines}
        onBlur={handleOnBlur}
        onFocus={() => {
          if (setIsHotkeysDisabled) setIsHotkeysDisabled(true);
        }}
        onChange={handleChange}
        value={newText}
      />
    </div>
  );
};

export default InventoryText;
