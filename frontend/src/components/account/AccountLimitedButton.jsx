import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setMany } from 'idb-keyval';
import UiChecksGrid from '@/assets/images/icons/ui-checks-grid.svg?react';
import { AccountLimitedModal, ButtonIconed } from '@/components';
import { useApp } from '@/context';

const AccountLimitedButton = () => {
  const { setLimitedFormat } = useApp();
  const [showModal, setShowModal] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const limitedFormat = JSON.parse(query.get('format'));

  const setFormat = (format) => {
    setLimitedFormat(
      format.allowed.crypt,
      format.allowed.library,
      format.banned.crypt,
      format.banned.library,
      format.sets
    );

    setMany([
      ['limitedAllowedCrypt', format.allowed.crypt],
      ['limitedAllowedLibrary', format.allowed.library],
      ['limitedBannedCrypt', format.banned.crypt],
      ['limitedBannedLibrary', format.banned.library],
      ['limitedSets', format.sets],
    ]);
  };

  if (limitedFormat) setFormat(limitedFormat);

  return (
    <>
      <ButtonIconed
        variant="primary"
        className="w-full"
        onClick={() => setShowModal(true)}
        title="Manage Format"
        icon={<UiChecksGrid />}
        text="Manage Limited Format"
      />
      {showModal && (
        <AccountLimitedModal setShow={setShowModal} setFormat={setFormat} />
      )}
    </>
  );
};

export default AccountLimitedButton;
