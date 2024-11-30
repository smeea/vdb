import React, { useState } from 'react';
import Link45Deg from '@icons/link-45deg.svg?react';
import ClipboardFill from '@icons/clipboard-fill.svg?react';
import { FlexGapped, Modal, Button, ButtonIconed } from '@/components';
import { useApp } from '@/context';
import { inventoryServices } from '@/services';

const InventoryShareModal = ({ setShow }) => {
  const { isMobile, setShowFloatingButtons, setShowMenuButtons, inventoryKey, setInventoryKey } =
    useApp();

  const [success, setSuccess] = useState();
  const [shareUrl, setShareUrl] = useState(
    `${import.meta.env.VITE_BASE_URL}/inventory?key=${inventoryKey}`,
  );

  const handleClick = () => {
    const key = Math.random().toString(36).substring(2, 10);

    inventoryServices
      .createSharedInventory(key)
      .then(() => {
        setInventoryKey(key);
        const u = `${import.meta.env.VITE_BASE_URL}/inventory?key=${key}`;
        setShareUrl(u);
        navigator.clipboard.writeText(u);
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        }, 1000);
      });
  };

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Modal handleClose={handleClose} centered={isMobile} title="Inventory Share">
      <FlexGapped className="flex-col">
        <div>
          {inventoryKey ? (
            <>
              <a href={shareUrl}>{shareUrl}</a>
              <div
                className="inline pl-1 text-fgSecondary hover:text-fgPrimary dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <ClipboardFill className="inline" viewBox="0 0 18 18" />
              </div>
              <div>Only this URL will work (old become obsolete after creating new)</div>
            </>
          ) : (
            <div>
              After creating Share URL people can view (not edit!) your inventory by opening the
              link
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 max-sm:flex-col">
          <ButtonIconed
            variant={success ? 'success' : 'primary'}
            onClick={handleClick}
            title="Create URL"
            icon={<Link45Deg width="19" height="19" viewBox="0 0 14 14" />}
            text="Create URL"
          />
          <Button onClick={handleClose}>Close</Button>
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default InventoryShareModal;
