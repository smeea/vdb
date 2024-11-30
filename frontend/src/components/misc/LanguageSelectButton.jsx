import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Flag, LanguageMenu } from '@/components';
import { useApp } from '@/context';

const LanguageSelectButton = () => {
  const { lang } = useApp();

  return (
    <Popover className="relative">
      <PopoverButton
        title="Language Select"
        className="flex h-full min-w-[40px] items-center justify-center focus:outline-none"
      >
        <Flag value={lang} noTitle />
      </PopoverButton>
      <PopoverPanel anchor={{ to: 'bottom', gap: '15px', padding: '4px' }} className="z-50">
        {({ close }) => (
          <div className="rounded border border-borderPrimary bg-bgPrimary p-3 dark:border-borderPrimaryDark dark:bg-bgPrimaryDark">
            <LanguageMenu handleClose={close} />
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default LanguageSelectButton;
