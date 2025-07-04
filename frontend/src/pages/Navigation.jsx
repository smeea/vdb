import LightningFill from "@icons/lightning-fill.svg?react";
import PersonFill from "@icons/person-fill.svg?react";
import { NavLink, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  LanguageSelectButton,
  LimitedSelect,
  NavMobileMenu,
  ThemeSelect,
  Toggle,
} from "@/components";
import cryptDefaults from "@/components/search_forms/forms_data/defaultsCryptForm.json";
import libraryDefaults from "@/components/search_forms/forms_data/defaultsLibraryForm.json";
import pdaDefaults from "@/components/search_forms/forms_data/defaultsPdaForm.json";
import twdDefaults from "@/components/search_forms/forms_data/defaultsTwdForm.json";
import { CRYPT, DECK, DECKID, ID, LIBRARY, PDA, TWD } from "@/constants";
import {
  deckStore,
  searchCryptForm,
  searchLibraryForm,
  searchPdaForm,
  searchResults,
  searchTwdForm,
  useApp,
} from "@/context";
import { sanitizeFormState } from "@/utils";

const Link = ({ to, end, icon, text, title, className }) => {
  return (
    <NavLink
      to={to}
      end={end}
      title={title}
      className={({ isActive }) =>
        twMerge(
          "flex h-full w-full items-center justify-center no-underline outline-hidden",
          icon ? "md:px-3" : "pb-[2px] md:px-2",
          isActive
            ? "bg-borderNestModal text-white dark:bg-borderNestModalDark dark:text-whiteDark"
            : "text-lightGray dark:text-lightGrayDark",
          className,
        )
      }
    >
      {icon ?? text}
    </NavLink>
  );
};

const Navigation = () => {
  const {
    inventoryMode,
    toggleInventoryMode,
    limitedMode,
    toggleLimitedMode,
    isMobile,
    username,
    isPlaytester,
    playtestMode,
    togglePlaytestMode,
    limitedPreset,
  } = useApp();

  const location = useLocation();
  const deck = useSnapshot(deckStore)[DECK];
  const quickCard = useSnapshot(searchResults).quickCard;
  const cryptFormState = useSnapshot(searchCryptForm);
  const libraryFormState = useSnapshot(searchLibraryForm);
  const twdFormState = useSnapshot(searchTwdForm);
  const pdaFormState = useSnapshot(searchPdaForm);

  const pdaUrl =
    JSON.stringify(pdaFormState) === JSON.stringify(pdaDefaults)
      ? "/pda"
      : `/pda?q=${encodeURIComponent(JSON.stringify(sanitizeFormState(PDA, pdaFormState)))}`;

  const twdUrl =
    JSON.stringify(twdFormState) === JSON.stringify(twdDefaults)
      ? "/twd"
      : `/twd?q=${encodeURIComponent(JSON.stringify(sanitizeFormState(TWD, twdFormState)))}`;

  const cryptUrl =
    JSON.stringify(cryptFormState) === JSON.stringify(cryptDefaults)
      ? "/crypt"
      : `/crypt?q=${encodeURIComponent(JSON.stringify(sanitizeFormState(CRYPT, cryptFormState)))}`;

  const libraryUrl =
    JSON.stringify(libraryFormState) === JSON.stringify(libraryDefaults)
      ? "/library"
      : `/library?q=${encodeURIComponent(JSON.stringify(sanitizeFormState(LIBRARY, libraryFormState)))}`;

  const decksUrl = `/decks${deck?.[DECKID] ? `/${deck[DECKID]}` : ""}`;
  const cardsUrl = `/cards${quickCard ? `/${quickCard[ID]}` : ""}`;

  return (
    <nav className="z-50 bg-bgNav max-md:fixed max-md:bottom-0 max-md:w-full md:sticky md:top-0 dark:bg-bgNavDark print:hidden">
      <div className="navbar-container mx-auto flex h-10 justify-between md:gap-3">
        <div className="flex items-center gap-6 max-md:hidden">
          <LanguageSelectButton />
          <ThemeSelect />
          {username && (
            <Toggle
              isOn={inventoryMode}
              handleClick={toggleInventoryMode}
              disabled={location.pathname === "/inventory"}
              variant="secondary"
            >
              Inventory
            </Toggle>
          )}
          {(limitedPreset || limitedMode) && (
            <div className="flex items-center gap-1">
              <Toggle isOn={limitedMode} handleClick={toggleLimitedMode} variant="secondary">
                Limited
              </Toggle>
              <LimitedSelect withoutDisabled />
            </div>
          )}
          {isPlaytester && (
            <Toggle isOn={playtestMode} handleClick={togglePlaytestMode} variant="secondary">
              Playtest
            </Toggle>
          )}
        </div>
        <div className="flex items-center justify-end max-md:w-full">
          <div className="flex h-full w-full items-center justify-between">
            <div className="md:hidden">
              <NavMobileMenu />
            </div>
            <Link
              className="max-md:hidden"
              to="/account"
              icon={username ? <PersonFill width="21" height="21" viewBox="0 1 16 16" /> : null}
              text={username ? null : "Login"}
              title={username ? "Account" : "Login"}
            />
            {isPlaytester && <Link className="max-md:hidden" to="/playtest" text="Playtest" />}
            <Link className="max-md:hidden" to="/" text="About" end />
            <Link to={pdaUrl} text="PDA" />
            <Link to="/tda" text="TDA" />
            <Link to={twdUrl} text="TWD" />
            <Link to="/inventory" text={isMobile ? "INV" : "Inventory"} />
            <Link to={decksUrl} text={isMobile ? "DKS" : "Decks"} />
            <Link to={cryptUrl} text={isMobile ? "CRY" : "Crypt"} />
            <Link to={libraryUrl} text={isMobile ? "LIB" : "Library"} />
          </div>
          <NavLink
            to={cardsUrl}
            title="Quick Card Search"
            className={({ isActive }) =>
              twMerge(
                "flex h-full items-center justify-center px-2 outline-hidden hover:no-underline md:px-3",
                isActive
                  ? "bg-borderNestModal text-white dark:bg-borderNestModalDark dark:text-whiteDark"
                  : "text-lightGray dark:text-lightGrayDark",
              )
            }
          >
            <LightningFill width="19" height="19" viewBox="0 0 16 16" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
