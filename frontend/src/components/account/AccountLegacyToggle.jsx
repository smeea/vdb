import React from 'react';
import { Toggle, ConditionalTooltipOrModal } from '@/components';
import { useApp } from '@/context';
import legacyImagesClans from '@/assets/data/legacyImagesClansList.json';

const TooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>
        Contains only images of {legacyImagesClans.join(', ')}. More will come in the future.
      </div>
      <div>Uses modern card text.</div>
      <div>
        Will overwrite card text language settings (legacy images only available in English).
      </div>
      <div>Not all images are available, will fallback to standard image.</div>
      <div className="text-fgRed dark:text-fgRedDark">
        Proxies from those images DO NOT fulfill VEKN requirements of a Proxy for proxy-allowed
        tournaments (must be copy of a card as it was released).
      </div>
    </div>
  );
};

const AccountLegacyToggle = () => {
  const { showLegacyImage, toggleShowLegacyImage } = useApp();

  return (
    <Toggle isOn={showLegacyImage} handleClick={toggleShowLegacyImage}>
      <div className="flex items-center gap-2">
        <div>Legacy Crypt Images [BETA, limited]</div>
        <ConditionalTooltipOrModal title="Legacy Images" overlay={<TooltipText />}>
          <div className="font-bold text-fgThird dark:text-fgThirdDark">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
    </Toggle>
  );
};

export default AccountLegacyToggle;
