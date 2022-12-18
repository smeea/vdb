import React, { useState } from 'react';
import X from 'assets/images/icons/x.svg';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import ClipboardFill from 'assets/images/icons/clipboard-fill.svg';
import { ButtonFloat, Modal, Button, ButtonIconed } from 'components';
import { useApp } from 'context';

const InventoryShareModal = ({ setShow }) => {
  const {
    isMobile,
    isNarrow,
    setShowFloatingButtons,
    setShowMenuButtons,
    inventoryKey,
    setInventoryKey,
  } = useApp();

  const [success, setSuccess] = useState();
  const [shareUrl, setShareUrl] = useState(
    `${process.env.ROOT_URL}inventory?key=${inventoryKey}`
  );

  const createUrl = () => {
    const url = `${process.env.API_URL}account`;
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
        return response.json();
      })
      .then(() => {
        setInventoryKey(newKey);
        const u = `${process.env.ROOT_URL}inventory?key=${newKey}`;
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
    <>
      <Modal
        handleClose={handleClose}
        centered={isMobile}
        title="Inventory Share"
      >
        <div>
          {inventoryKey ? (
            <>
              <a href={shareUrl}>{shareUrl}</a>
              <span
                className="with-hover inline  "
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <ClipboardFill viewBox="0 0 18 18" />
              </span>
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
        <div>
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
      </Modal>
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="float-clear">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default InventoryShareModal;
