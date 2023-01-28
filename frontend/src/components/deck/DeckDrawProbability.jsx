import React, { useState } from 'react';
import {
  ConditionalTooltip,
  DeckDrawProbabilityText,
  Modal
} from '@/components';
import { useApp } from '@/context';
import { drawProbability } from '@/utils';

const DeckDrawProbability = ({ cardName, n, N, k }) => {
  const { isMobile } = useApp();
  const [showModal, setShowModal] = useState();

  return (
    <>
      <ConditionalTooltip disabled={isMobile}
        overlay={<div className="p-2"><DeckDrawProbabilityText N={N} n={n} k={k} /></div>}
      >
        <div
          className="text-fgSecondary dark:text-fgSecondaryDark"
          onClick={() => isMobile && setShowModal(true)}
        >
          {`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}
        </div>
      </ConditionalTooltip>
      {showModal && (
        <Modal
          size="xs"
          dialogClassName="w-1/2 flex justify-center nested-modal"
          handleClose={() => setShowModal(false)}
          centered
          title={cardName}
        >
          <DeckDrawProbabilityText N={N} n={n} k={k} />
        </Modal>
      )}
    </>
  )
}

export default DeckDrawProbability;
