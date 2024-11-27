import React, { useState } from 'react';
import { useSearchParams } from 'react-router';
import { setMany } from 'idb-keyval';
import UiChecksGrid from '@/assets/images/icons/ui-checks-grid.svg?react';
import { AccountLimitedModal, ButtonIconed } from '@/components';
import { useApp } from '@/context';
import {
  ALLOWED,
  BANNED,
  CRYPT,
  LIBRARY,
  LIMITED_ALLOWED_CRYPT,
  LIMITED_ALLOWED_LIBRARY,
  LIMITED_BANNED_CRYPT,
  LIMITED_BANNED_LIBRARY,
  LIMITED_SETS,
  SETS,
  FORMAT,
} from '@/constants';

const AccountLimitedButton = () => {
  const { setLimitedFormat } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
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

  if (limitedFormat) setFormat(limitedFormat);

  return (
    <>
      <ButtonIconed
        className="w-full"
        onClick={() => setShowModal(true)}
        title="Manage Format"
        icon={<UiChecksGrid />}
        text="Manage Limited Format"
      />
      {showModal && <AccountLimitedModal setShow={setShowModal} setFormat={setFormat} />}
    </>
  );
};

export default AccountLimitedButton;
