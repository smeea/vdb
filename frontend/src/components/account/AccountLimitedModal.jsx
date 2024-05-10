import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import Download from '@/assets/images/icons/download.svg?react';
import Upload from '@/assets/images/icons/upload.svg?react';
import {
  AccountLimitedSetSelection,
  AccountLimitedCardSelection,
  AccountLimitedUrlButton,
  Modal,
  ButtonIconed,
} from '@/components';
import { limitedFullStore } from '@/context';

const AccountLimitedModal = ({ setShow, setFormat }) => {
  const { allowed, banned, sets: limitedSets } = useSnapshot(limitedFullStore);
  const { crypt: limitedAllowedCrypt, library: limitedAllowedLibrary } = allowed;
  const { crypt: limitedBannedCrypt, library: limitedBannedLibrary } = banned;
  const fileInput = useRef();

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importFormat = (fileInput) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      const formatText = reader.result;
      setFormat(JSON.parse(formatText));
    };
  };

  const minifyFormat = () => {
    const minified = {
      sets: limitedSets,
      allowed: {
        crypt: {},
        library: {},
      },
      banned: {
        crypt: {},
        library: {},
      },
    };
    Object.keys(limitedAllowedCrypt).forEach((c) => {
      minified.allowed.crypt[c] = true;
    });
    Object.keys(limitedAllowedLibrary).forEach((c) => {
      minified.allowed.library[c] = true;
    });
    Object.keys(limitedBannedCrypt).forEach((c) => {
      minified.banned.crypt[c] = true;
    });
    Object.keys(limitedBannedLibrary).forEach((c) => {
      minified.banned.library[c] = true;
    });
    return minified;
  };

  const exportFormat = async () => {
    let { saveAs } = await import('file-saver');
    const fileName = `Limited Format [${new Date().toISOString().split('T')[0]}].txt`;
    const formatText = JSON.stringify(minifyFormat(), null, '  ');
    const file = new File([formatText], fileName, {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(file, fileName);
  };

  return (
    <Modal handleClose={() => setShow(false)} size="lg" title="Manage Limited Format">
      <div className="flex flex-col gap-5">
        <AccountLimitedSetSelection />
        <AccountLimitedCardSelection />
        <AccountLimitedCardSelection inBanned />
        <div className="flex max-sm:flex-col justify-end gap-2">
          <AccountLimitedUrlButton
            format={JSON.stringify(minifyFormat(), null, '').replace(/\n/g, '')}
          />
          <ButtonIconed
            variant="primary"
            onClick={handleFileInputClick}
            title="Import Format"
            icon={<Upload />}
            text="Import Format"
          />

          <ButtonIconed
            variant="primary"
            onClick={exportFormat}
            title="Export Format"
            icon={<Download />}
            text="Export Format"
          />
        </div>
      </div>
      <input
        ref={fileInput}
        accept=".txt"
        type="file"
        onChange={() => importFormat(fileInput)}
        style={{ display: 'none' }}
      />
    </Modal>
  );
};

export default AccountLimitedModal;
