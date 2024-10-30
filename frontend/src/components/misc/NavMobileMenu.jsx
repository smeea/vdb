import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import InfoCircleFill from '@/assets/images/icons/info-circle-fill.svg?react';
import List from '@/assets/images/icons/list.svg?react';
import StoplightsFill from '@/assets/images/icons/stoplights-fill.svg?react';
import { NavMobileToggle, LanguageMenu, ThemeSelect, Hr } from '@/components';
import { useApp } from '@/context';

const LinkItem = ({ target, icon, text, handleClose }) => {
  return (
    <div className="w-full">
      <NavLink
        to={target}
        onClick={handleClose}
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1.5 text-fgThird dark:text-fgPrimaryDark ${
            isActive ? 'bg-borderPrimary dark:bg-borderPrimaryDark' : ''
          }`
        }
      >
        <div className="flex min-w-[30px] justify-center">{icon}</div>
        <div>{text}</div>
      </NavLink>
    </div>
  );
};

const NavMobileMenu = ({ isLimited, setShowMenu }) => {
  const {
    limitedMode,
    inventoryMode,
    toggleLimitedMode,
    toggleInventoryMode,
    isPlaytester,
    playtestMode,
    togglePlaytestMode,
    username,
  } = useApp();

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label="Menu"
        className="flex h-full items-center px-1 text-white focus:outline-none"
      >
        <List width="30" height="30" viewBox="0 0 16 16" />
      </PopoverButton>
      <PopoverPanel anchor={{ to: 'top', gap: '9px', padding: '4px' }} className="z-50">
        {({ close }) => (
          <div className="flex flex-col rounded-lg border border-borderPrimary bg-bgPrimary text-lg text-fgPrimary dark:border-borderPrimaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark">
            <LinkItem
              target="/account"
              text={username ? 'Account' : 'Login'}
              icon={<PersonFill height="20" width="20" viewBox="0 0 16 16" />}
              handleClose={close}
            />
            {isPlaytester && (
              <LinkItem
                target="/playtest"
                text="Playtest"
                icon={<StoplightsFill height="20" width="20" viewBox="0 0 16 16" />}
                handleClose={close}
              />
            )}
            <LinkItem
              target="/"
              text="About"
              icon={<InfoCircleFill height="20" width="20" viewBox="0 0 16 16" />}
              handleClose={close}
            />
            <ThemeSelect setShowMenu={setShowMenu} />
            {username && (
              <NavMobileToggle
                isOn={inventoryMode}
                handleClick={() => {
                  toggleInventoryMode();
                  close();
                }}
              >
                Inventory Mode
              </NavMobileToggle>
            )}
            {(isLimited || limitedMode) && (
              <NavMobileToggle
                isOn={limitedMode}
                handleClick={() => {
                  toggleLimitedMode();
                  close();
                }}
              >
                Limited Mode
              </NavMobileToggle>
            )}
            {isPlaytester && (
              <NavMobileToggle
                isOn={playtestMode}
                handleClick={() => {
                  togglePlaytestMode();
                  close();
                }}
              >
                Playtest Mode
              </NavMobileToggle>
            )}
            <div className="px-3.5 pt-2.5">
              <Hr />
            </div>
            <div className="flex p-3.5">
              <LanguageMenu handleClose={close} />
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default NavMobileMenu;
