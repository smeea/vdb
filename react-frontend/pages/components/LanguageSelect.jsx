import React, { useRef, useState, useContext } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import FlagEn from '../../assets/images/misc/en.svg';
import FlagEs from '../../assets/images/misc/es.svg';
import FlagFr from '../../assets/images/misc/fr.svg';
import AppContext from '../../context/AppContext.js';

const LanguageSelect = (props) => {
  const { isMobile, lang, changeLang } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const languages = { 'en-EN': FlagEn, 'es-ES': FlagEs, 'fr-FR': FlagFr };

  const options = Object.keys(languages).map((l) => {
    const Flag = languages[l];
    return (
      <div
        key={l}
        className={lang == l ? 'flag-active mx-2' : 'mx-2'}
        onClick={() => {
          changeLang(l);
          setShowMenu(false);
        }}
      >
        <Flag width="18" height="18" viewBox="0 0 500 500" />
      </div>
    );
  });

  const Flag = languages[lang];

  return (
    <>
      {isMobile ? (
        <>{options}</>
      ) : (
        <>
          <div
            ref={menuRef}
            className="px-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Flag width="18" height="18" viewBox="0 0 500 500" />
          </div>
          <Overlay target={menuRef} show={showMenu} placement="bottom">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <Popover {...props} className="langPopover">
                <Popover.Content>
                  <div className="d-flex align-items-center justify-content-between">
                    {options}
                  </div>
                </Popover.Content>
              </Popover>
            )}
          </Overlay>
        </>
      )}
    </>
  );
};

export default LanguageSelect;
