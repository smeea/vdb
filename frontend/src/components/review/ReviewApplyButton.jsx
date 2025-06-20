import Check2All from "@icons/check2-all.svg?react";
import { useState } from "react";
import { ButtonIconed } from "@/components";
import { CARDS, CRYPT, LIBRARY } from "@/constants";
import { deckUpdate, useApp } from "@/context";

const ReviewApplyButton = ({ deck, parentId }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    const response = await deckUpdate(parentId, CARDS, {
      [CRYPT]: deck[CRYPT],
      [LIBRARY]: deck[LIBRARY],
    });
    if (response?.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <ButtonIconed
      variant={success ? "success" : error ? "danger" : isDesktop ? "secondary" : "primary"}
      onClick={handleClick}
      title="Apply Changes"
      icon={<Check2All width="20" height="20" viewBox="0 0 16 16" />}
      text={success ? "Applied" : error ? "Error" : "Apply Changes"}
    />
  );
};

export default ReviewApplyButton;
