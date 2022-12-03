import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import ClipboardFill from 'assets/images/icons/clipboard-fill.svg';
import { ButtonIconed } from 'components';
import { useApp } from 'context';

const InventoryShareModal = ({ show, setShow }) => {
  const {
    isMobile,
    isNarrow,
    setShowFloatingButtons,
    setShowMenuButtons,
    inventoryKey,
    setInventoryKey,
  } = useApp();

  const [state, setState] = useState(undefined);
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
        setState(true);
        setTimeout(() => {
          setState(false);
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
        show={show}
        onHide={handleClose}
        animation={false}
        centered={isMobile}
      >
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <div className="text-lg text-blue font-bold">Inventory Share</div>
          <Button variant="outline-secondary" onClick={handleClose}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {inventoryKey ? (
            <>
              <a href={shareUrl}>{shareUrl}</a>
              <span
                className="d-inline ps-2 pe-3 with-hover"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <ClipboardFill viewBox="0 0 18 18" />
              </span>
              <div className="pt-2">
                Only this URL will work (old become obsolete after creating new)
              </div>
            </>
          ) : (
            <div className="pt-2">
              After creating Share URL people can view (not edit!) your
              inventory by opening the link
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ButtonIconed
            variant="primary"
            onClick={createUrl}
            title="Create URL"
            icon={
              !state ? (
                <Link45Deg width="19" height="19" viewBox="0 0 14 14" />
              ) : (
                <ArrowRepeat />
              )
            }
            text="Create URL"
          />
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default InventoryShareModal;
