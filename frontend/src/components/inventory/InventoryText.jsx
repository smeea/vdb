import { Textarea } from "@/components";
import { inventoryCardTextChange } from "@/context";
import ChatLeftQuoteFill from "@icons/chat-left-quote-fill.svg?react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const InventoryText = ({ card, text, inPopover, setIsHotkeysDisabled }) => {
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
    <div className="items-top flex gap-1.5">
      <div className={twMerge("opacity-40", inPopover ? "pt-1" : "pt-2")}>
        <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
      </div>
      {inPopover ? (
        <div className="text-sm">{newText}</div>
      ) : (
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
      )}
    </div>
  );
};

export default InventoryText;
