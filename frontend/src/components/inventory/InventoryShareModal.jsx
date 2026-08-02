import ClipboardFill from "@icons/clipboard-fill.svg?react";
import Link45Deg from "@icons/link-45deg.svg?react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { Header, Title, Button, ButtonIconed, FlexGapped, Modal } from "@/components";
import { ID, OK, ALL, SURPLUS, CRYPT, LIBRARY, INVENTORY_KEY, SURPLUS_KEY } from "@/constants";
import { inventoryStore, usedStore, useApp } from "@/context";
import { inventoryServices } from "@/services";
import { useInventoryCrypt, useInventoryLibrary } from "@/hooks";

const InventoryShareModal = ({ setShow }) => {
  const { isMobile, surplusKey, setSurplusKey, inventoryKey, setInventoryKey, setShowMenuButtons, setShowFloatingButtons } =
        useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);

  const surplus = {}

  Object.values(useInventoryCrypt(
    inventoryCrypt,
    OK,
    false,
    ALL,
    false,
  )[SURPLUS]).forEach(v => surplus[v.c[ID]] = v.q);

  Object.values(useInventoryLibrary(
    inventoryLibrary,
    OK,
    false,
    ALL,
    ALL,
    ALL,
    false,
  )[SURPLUS]).forEach(v => surplus[v.c[ID]] = v.q);

  const [successFull, setSuccessFull] = useState();
  const [successSurplus, setSuccessSurplus] = useState();
  const [successSurplusUpdate, setSuccessSurplusUpdate] = useState();

  const fullUrl = `${import.meta.env.VITE_BASE_URL}/inventory?key=${inventoryKey}`
  const surplusUrl = `${import.meta.env.VITE_BASE_URL}/inventory?key=${surplusKey}`

  const handleCreate = (target) => {
    const key = Math.random().toString(36).substring(2, 10);
    const createUrl = target == INVENTORY_KEY ? inventoryServices.shareFullInventory : inventoryServices.shareSurplusInventory

    createUrl(key, target === SURPLUS_KEY ? surplus : null)
      .then(() => {
        target === INVENTORY_KEY ? setInventoryKey(key) : setSurplusKey(key)
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/inventory?key=${key}`);
      })
      .then(() => {
        target === INVENTORY_KEY ? setSuccessFull(true) : setSuccessSurplus(true)
        setTimeout(() => {
          target === INVENTORY_KEY ? setSuccessFull(false) : setSuccessSurplus(false)
        }, 1000);
      });
  };

  const handleUpdateSurplus = () => {
    inventoryServices.shareSurplusInventory(surplusKey, surplus)
      .then(() => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/inventory?key=${surplusKey}`);
      })
      .then(() => {
        setSuccessSurplusUpdate(true)
        setTimeout(() => {
          setSuccessSurplusUpdate(false)
        }, 1000);
      });
  };

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Modal handleClose={handleClose} centered={isMobile} size="xs" title="Share Inventory">
      <FlexGapped className="flex-col">
        <div className="flex flex-col gap-0.5 border border-borderPrimary dark:border-borderSecondaryDark">
          <Header className="px-2 font-bold text-fgSecondary dark:text-fgSecondaryDark ">
            Full Inventory
          </Header>
          <div className="flex flex-col gap-2 p-2">
            {inventoryKey &&
             <div>
               <a href={fullUrl}>{fullUrl}</a>
               <div
                 className="inline pl-1 text-fgSecondary hover:text-fgPrimary dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark"
                 onClick={() => navigator.clipboard.writeText(fullUrl)}
               >
                 <ClipboardFill className="inline" viewBox="0 0 18 18" />
               </div>
             </div>
            }
            <div className="flex flex-col gap-1">
              <p>
                Shows all cards from you inventory.
              </p>
              <p>
                Will follow changes in your inventory.
              </p>
            </div>
            <ButtonIconed
              className="w-full"
              variant={successFull ? "success" : "primary"}
              onClick={() => handleCreate(INVENTORY_KEY)}
              title="Create Inventory URL"
              icon={<Link45Deg width="19" height="19" viewBox="0 0 14 14" />}
              text="Create Inventory URL"
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 border border-borderPrimary dark:border-borderSecondaryDark">
          <Header className="px-2 font-bold text-fgSecondary dark:text-fgSecondaryDark ">
            Surplus
          </Header>
          <div className="flex flex-col gap-2 p-2">
            {surplusKey &&
             <div>
               <a href={surplusUrl}>{surplusUrl}</a>
               <div
                 className="inline pl-1 text-fgSecondary hover:text-fgPrimary dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark"
                 onClick={() => navigator.clipboard.writeText(surplusUrl)}
               >
                 <ClipboardFill className="inline" viewBox="0 0 18 18" />
               </div>
             </div>
            }
            <div className="flex flex-col gap-1">
              <p>
                Shows surplus cards <b><i>as they were at the moment of URL creation</i></b>, or when you click UPDATE button.
              </p>
              <p>
                Update button will update shared surplus to current state without changing URL.
              </p>
              <p>
                Will not follow changes in your inventory.
              </p>
            </div>
            <div className="flex gap-2 max-sm:flex-col">
              <ButtonIconed
                className="w-full"
                variant={successSurplus ? "success" : "primary"}
                onClick={() => handleCreate(SURPLUS_KEY)}
                title="Create Surplus URL"
                icon={<Link45Deg width="19" height="19" viewBox="0 0 14 14" />}
                text="Create Surplus URL"
              />
              {surplusKey &&
               <ButtonIconed
                 className="w-full"
                 variant={successSurplusUpdate ? "success" : "primary"}
                 onClick={handleUpdateSurplus}
                 title="Update surplus"
                 icon={<Link45Deg width="19" height="19" viewBox="0 0 14 14" />}
                 text="Update surplus"
               />
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            People with URL can only view (not edit!) your inventory.
          </div>
          <div>Old URLs stop to work after creating new ones.</div>
        </div>
        <div className="flex justify-end gap-2 max-sm:flex-col">
          <Button onClick={handleClose}>Close</Button>
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default InventoryShareModal;
