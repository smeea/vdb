import React, { useState } from 'react';
import Link45Deg from '@/assets/images/icons/link-45deg.svg';
import ClipboardFill from '@/assets/images/icons/clipboard-fill.svg';
import { Modal, Button, ButtonIconed } from '@/components';
import { useApp } from '@/context';

const InventoryShareModal = ({ setShow }) => {
  const {
    isMobile,
    setShowFloatingButtons,
    setShowMenuButtons,
    inventoryKey,
    setInventoryKey,
  } = useApp();

  const [success, setSuccess] = useState();
  const [shareUrl, setShareUrl] = useState(
    `${import.meta.env.VITE_BASE_URL}/inventory?key=${inventoryKey}`
  );

  const createUrl = () => {
    const url = `${import.meta.env.VITE_API_URL}/account`;
    const newKey = Math.random().toString(36).substring(2, 10);

    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inventoryKey: newKey }),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        setInventoryKey(newKey);
        const u = `${import.meta.env.VITE_BASE_URL}/inventory?key=${newKey}`;
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
    <Modal
      handleClose={handleClose}
      centered={isMobile}
      title="Inventory Share"
    >
      <div className="flex gap-3 flex-col sm:gap-5">
        <div>
          {inventoryKey ? (
            <>
              <a href={shareUrl}>{shareUrl}</a>
              <div
                className="inline pl-1 text-fgSecondary hover:text-fgPrimary dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark  "
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <ClipboardFill className="inline" viewBox="0 0 18 18" />
              </div>
              <div>
                Only this URL will work (old become obsolete after creating new)
              </div>
            </>
          ) : (
            <div>
              After creating Share URL people can view (not edit!) your
              inventory by opening the link
            </div>
          )}
        </div>
        <div className="flex sm:flex-row flex-col justify-end gap-2">
          <ButtonIconed
            variant={success ? 'success' : 'primary'}
            onClick={createUrl}
            title="Create URL"
            icon={<Link45Deg width="19" height="19" viewBox="0 0 14 14" />}
            text="Create URL"
          />
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryShareModal;
