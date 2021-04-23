import React, { useRef, useState, useContext } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import FlagEn from '../../assets/images/flags/en.svg';
import FlagEs from '../../assets/images/flags/es.svg';
import FlagFr from '../../assets/images/flags/fr.svg';
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

  const Menu = () => (
    <>
      <div className="px-2 pb-1">Card Language:</div>
      <div className="d-flex align-items-center justify-content-between">
        {options}
      </div>
      <div className="px-2 pt-2 pb-1 small">
        [*] only printed since '19
        <br /> available in non-english
      </div>
    </>
  );

  const SelectedFlag = languages[lang];

  return (
    <>
      {isMobile ? (
        <div>
          <Menu />
        </div>
      ) : (
        <>
          <div
            ref={menuRef}
            className="px-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
          </div>
          <Overlay target={menuRef} show={showMenu} placement="bottom">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <Popover {...props} className="navMenu">
                <Popover.Content>
                  <Menu />
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
