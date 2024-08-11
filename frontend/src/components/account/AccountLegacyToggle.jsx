import React from 'react';
import { Toggle, ConditionalTooltipOrModal } from '@/components';
import { useApp } from '@/context';

const TooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-fgRed dark:text-fgRedDark">
        Contains only images of Abomination, Ahrimanes, Baali and Tzimisce. More will come in the
        future (target is to have all crypt images).
      </div>
      <div>Uses modern card text.</div>
      <div>
        Will overwrite card text language settings (legacy images only available in English).
      </div>
      <div>Not all images are available, will fallback to standard image.</div>
    </div>
  );
};

const AccountLegacyToggle = () => {
  const { showLegacyImage, toggleShowLegacyImage, isMobile } = useApp();

  return (
    <Toggle isOn={showLegacyImage} toggle={toggleShowLegacyImage}>
      <div className="flex items-center gap-2">
        <div>Legacy Crypt Images [BETA, limited]</div>
        <ConditionalTooltipOrModal title="Public name" isModal={isMobile} overlay={<TooltipText />}>
          <div className="font-bold text-fgThird dark:text-fgThirdDark">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
    </Toggle>
  );
};

export default AccountLegacyToggle;
