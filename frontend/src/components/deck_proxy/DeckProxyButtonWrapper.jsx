import { DeckProxyButton } from '@/components';
import { useApp } from '@/context';
import { useDeckMissing } from '@/hooks';

const DeckProxyButtonWrapper = ({ deck, setShowProxySelect }) => {
  const { inventoryMode } = useApp();
  const { missingCrypt, missingLibrary } = useDeckMissing(deck, !inventoryMode);

  return (
    <DeckProxyButton
      setShowProxySelect={setShowProxySelect}
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deck}
    />
  );
};

export default DeckProxyButtonWrapper;
