import React, { useState } from 'react';
import PlusSlashMinus from '@/assets/images/icons/plus-slash-minus.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';
import { useDeckLibrary } from '@/hooks';
import { NAME, ADV } from '@/constants';

const ReviewCopyTextButton = ({ urlDiff }) => {
  const { cryptCardBase, libraryCardBase, isDesktop, setShowFloatingButtons, setShowMenuButtons } =
    useApp();
  const [success, setSuccess] = useState(false);

  const diffCards = urlDiff.split(';');
  const cryptDiff = [];
  const library = {};

  diffCards.map((i) => {
    const [cardid, q] = i.replace('"', '').split('=');
    const card = cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];
    if (cardid > 200000) {
      const cardDiff = `${q > 0 ? `+${q}` : q} ${card[NAME]}${card[ADV] ? ' ADV' : ''}`;
      cryptDiff.push(cardDiff);
    } else {
      library[cardid] = {
        c: card,
        q: 1, // fake
        diff: parseInt(q),
      };
    }
  });

  const { libraryByType } = useDeckLibrary(library);
  const libraryDiff = [];
  Object.values(libraryByType).forEach((cards) => {
    cards.forEach((c) => {
      const cardDiff = `${c.diff > 0 ? `+${c.diff}` : c.diff} ${c.c[NAME]}`;
      libraryDiff.push(cardDiff);
    });
  });
  const diffText = [...cryptDiff, '', ...libraryDiff].join('\n');

  const handleStandard = () => {
    navigator.clipboard.writeText(diffText);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  return (
    <ButtonIconed
      variant={success ? 'success' : isDesktop ? 'secondary' : 'primary'}
      onClick={handleStandard}
      title="Copy Text"
      icon={<PlusSlashMinus />}
      text={success ? 'Copied' : 'Copy Text'}
    />
  );
};

export default ReviewCopyTextButton;
