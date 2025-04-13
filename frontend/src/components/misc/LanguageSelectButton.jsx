import { Flag, LanguageMenu } from "@/components";
import { useApp } from "@/context";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const LanguageSelectButton = () => {
  const { lang } = useApp();

  return (
    <Popover className="relative">
      <PopoverButton
        title="Language Select"
        className="flex h-full min-w-[40px] cursor-pointer items-center justify-center focus:outline-hidden"
      >
        <Flag value={lang} noTitle />
      </PopoverButton>
      <PopoverPanel anchor={{ to: "bottom", gap: "15px", padding: "4px" }} className="z-50">
        {({ close }) => (
          <div className="rounded-sm border border-borderPrimary bg-bgPrimary p-3 dark:border-borderPrimaryDark dark:bg-bgPrimaryDark">
            <LanguageMenu handleClose={close} />
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default LanguageSelectButton;
