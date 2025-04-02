import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router";
import SymmetryVertical from "@icons/symmetry-vertical.svg?react";
import { MenuButton, MenuItem, MenuItems } from "@/components";
import { DECKID, PDA, TWD } from "@/constants";
import { clearSearchForm, searchPdaForm, searchTwdForm, useApp } from "@/context";

const SIMILAR = "similar";

const DeckSearchSimilarButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  const handleClick = (target) => {
    clearSearchForm(target);
    const searchForm = target === PDA ? searchPdaForm : searchTwdForm;
    searchForm[SIMILAR] = deck[DECKID];
    navigate(`/${target}?q={"${SIMILAR}"%3A"${deck[DECKID]}"}`);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Menu>
      <MenuButton
        title="Search similar Decks in TWD/PDA"
        icon={<SymmetryVertical />}
        variant={isDesktop ? "secondary" : "primary"}
        text="Similar Decks"
      />
      <MenuItems>
        <MenuItem
          title="Search similar Decks in Tournament Winning Decks Archive"
          onClick={() => handleClick(TWD)}
        >
          Search in TWD
        </MenuItem>
        <MenuItem
          title="Search similar Decks in Public Decks Archive"
          onClick={() => handleClick(PDA)}
        >
          Search in PDA
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DeckSearchSimilarButton;
