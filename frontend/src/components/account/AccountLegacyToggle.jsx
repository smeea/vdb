import { ConditionalTooltipOrModal, Toggle } from '@/components';
import { useApp } from '@/context';

const TooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>Uses modern card text.</div>
      <div>
        Will overwrite card text language settings (legacy images only available in English).
      </div>
      <div>Hecata legacy images are not available.</div>
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
        <div>Legacy Crypt Images</div>
        <ConditionalTooltipOrModal title="Legacy Images" overlay={<TooltipText />}>
          <div className="text-fgThird dark:text-fgThirdDark font-bold">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
    </Toggle>
  );
};

export default AccountLegacyToggle;
