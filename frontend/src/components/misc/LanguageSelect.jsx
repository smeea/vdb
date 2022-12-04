import React, { useRef } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { useApp } from 'context';

const LanguageSelect = ({ showMenu, setShowMenu }) => {
  const { isMobile, lang, changeLang } = useApp();
  const menuRef = useRef(null);

  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };

  const options = Object.keys(languages).map((l) => {
    const Flag = languages[l];
    return (
      <div
        key={l}
        className={`${lang == l ? 'flag-active mx-2' : 'mx-2'}`}
        onClick={() => {
          changeLang(l);
          setShowMenu(false);
        }}
      >
        <Flag width="22" height="22" viewBox="0 0 500 500" />
      </div>
    );
  });

  const Menu = () => (
    <div className="py-1">
      <div className="px-2 pb-2">Card Language:</div>
      <div className="flex items-center justify-between">{options}</div>
    </div>
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
            className="flex items-center px-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
          </div>
          <Overlay
            popperConfig={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 15],
                  },
                },
              ],
            }}
            transition={false}
            placement="bottom"
            target={menuRef}
            show={showMenu}
          >
            {({
              placement,
              popperConfig,
              arrowProps,
              show: _show,
              popper,
              ...props
            }) => (
              <Popover {...props} className="nav-menu">
                <Popover.Body className="p-2">
                  <Menu />
                </Popover.Body>
              </Popover>
            )}
          </Overlay>
        </>
      )}
    </>
  );
};

export default LanguageSelect;
