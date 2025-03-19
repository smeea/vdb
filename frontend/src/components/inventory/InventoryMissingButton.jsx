import { useState } from 'react';
import Cart4 from '@icons/cart4.svg?react';
import { ButtonIconed, InventoryMissingModalWrapper } from '@/components';
import { useApp } from '@/context';

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
}) => {
  const { isDesktop } = useApp();
  const [showModal, setShowModal] = useState();

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={() => setShowModal(true)}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text="Missing Cards"
      />
      {showModal && (
        <InventoryMissingModalWrapper
          crypt={crypt}
          library={library}
          category={category}
          onlyNotes={onlyNotes}
          clan={clan}
          type={type}
          discipline={discipline}
          setShow={setShowModal}
        />
      )}
    </>
  );
};

export default InventoryMissingButton;
