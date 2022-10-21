import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Overlay, Popover } from 'react-bootstrap';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import List from 'assets/images/icons/list.svg';
import { LanguageSelect, ThemeSelect } from 'components';
import { useApp } from 'context';

const NavMobileMenu = ({ showMenu, setShowMenu }) => {
  const { inventoryMode, toggleInventoryMode, username } = useApp();
  const menuRef = useRef(null);

  return (
    <>
      <div
        ref={menuRef}
        className="white-font ps-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List width="30" height="30" viewBox="0 0 16 16" />
      </div>
      {showMenu && (
        <Overlay
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -286],
                },
              },
            ],
          }}
          transition={false}
          placement="bottom"
          target={menuRef}
          show={showMenu}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <Popover {...props} className="nav-menu large">
              <Popover.Body className="p-2">
                <NavLink
                  to="/account"
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <PersonFill height="20" width="20" viewBox="0 0 16 16" />
                    <div className="ps-2">{username ? 'Account' : 'Login'}</div>
                  </div>
                </NavLink>
                <NavLink
                  to="/"
                  end
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <InfoCircleFill
                      height="20"
                      width="20"
                      viewBox="0 0 16 16"
                    />
                    <div className="ps-2">About</div>
                  </div>
                </NavLink>
                <ThemeSelect setShowMenu={setShowMenu} />
                <div
                  className="d-flex align-items-center px-2 py-1"
                  onClick={() => {
                    toggleInventoryMode();
                    setShowMenu(false);
                  }}
                >
                  {inventoryMode ? (
                    <ToggleOn height="20" width="20" viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff height="20" width="20" viewBox="0 0 16 16" />
                  )}
                  <div className={inventoryMode ? 'ps-2' : 'gray ps-2'}>
                    Inventory Mode
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between py-2">
                  <LanguageSelect setShowMenu={setShowMenu} />
                </div>
              </Popover.Body>
            </Popover>
          )}
        </Overlay>
      )}
    </>
  );
};

export default NavMobileMenu;
