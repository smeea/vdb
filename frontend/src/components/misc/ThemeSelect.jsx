import { AUTO, DARK, ICON, LIGHT, NAME } from "@/constants";
import { useApp, useTheme } from "@/context";
import MoonFill from "@icons/moon-fill.svg?react";
import PcDisplay from "@icons/pc-display.svg?react";
import SunFill from "@icons/sun-fill.svg?react";

const ThemeSelect = ({ setShowMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { isNarrow } = useApp();

  const handleClick = () => {
    toggleTheme();
    isNarrow && setShowMenu(false);
  };

  const themeVisual = {
    [AUTO]: {
      [ICON]: (
        <PcDisplay
          width={isNarrow ? "20" : "16"}
          height={isNarrow ? "20" : "16"}
          viewBox="0 0 16 16"
        />
      ),
      [NAME]: "System Theme",
    },
    [DARK]: {
      [ICON]: (
        <MoonFill
          width={isNarrow ? "20" : "16"}
          height={isNarrow ? "20" : "16"}
          viewBox="0 0 16 16"
        />
      ),
      [NAME]: "Dark Theme",
    },
    [LIGHT]: {
      [ICON]: (
        <SunFill
          width={isNarrow ? "20" : "16"}
          height={isNarrow ? "20" : "16"}
          viewBox="0 0 16 16"
        />
      ),
      [NAME]: "Light Theme",
    },
  };

  return (
    <>
      {isNarrow ? (
        <div
          className="flex items-center gap-2 px-3 py-1.5 text-fgThird dark:text-fgPrimaryDark"
          onClick={handleClick}
        >
          <div className="flex min-w-[30px] justify-center">{themeVisual[theme]?.[ICON]}</div>
          <div className="whitespace-nowrap">{themeVisual[theme]?.[NAME]}</div>
        </div>
      ) : (
        <div
          className="flex h-full min-w-[40px] cursor-pointer items-center justify-center text-white dark:text-white"
          onClick={handleClick}
          title="Switch Theme"
        >
          {themeVisual[theme]?.[ICON]}
        </div>
      )}
    </>
  );
};

export default ThemeSelect;
