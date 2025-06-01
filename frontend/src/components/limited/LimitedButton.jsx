import { ButtonIconed, LimitedModal } from "@/components";
import {
  ALLOWED,
  BANNED,
  CRYPT,
  FORMAT,
  LIBRARY,
  LIMITED_ALLOWED_CRYPT,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_SETS,
  SETS,
} from "@/constants";
import { useApp } from "@/context";
import UiChecksGrid from "@icons/ui-checks-grid.svg?react";
import { setMany } from "idb-keyval";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const LimitedButton = () => {
  const { setLimitedFormat } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const limitedFormat = JSON.parse(searchParams.get(FORMAT));

  const setFormat = (format) => {
    setLimitedFormat(
      format[ALLOWED][CRYPT],
      format[ALLOWED][LIBRARY],
      format[BANNED][CRYPT],
      format[BANNED][LIBRARY],
      format[SETS],
    );

    setMany([
      [LIMITED_ALLOWED_CRYPT, format[ALLOWED][CRYPT]],
      [LIMITED_ALLOWED_LIBRARY, format[ALLOWED][LIBRARY]],
      [LIMITED_BANNED_CRYPT, format[BANNED][CRYPT]],
      [LIMITED_BANNED_LIBRARY, format[BANNED][LIBRARY]],
      [LIMITED_SETS, format[SETS]],
    ]);
  };

  useEffect(() => {
    if (limitedFormat) {
      setFormat(limitedFormat);
      setSearchParams();
    }
  }, [limitedFormat]);

  return (
    <>
      <ButtonIconed
        className="w-full"
        onClick={() => setShowModal(true)}
        title="Manage Format"
        icon={<UiChecksGrid />}
        text="Configure Format"
      />
      {showModal && <LimitedModal setShow={setShowModal} setFormat={setFormat} />}
    </>
  );
};

export default LimitedButton;
