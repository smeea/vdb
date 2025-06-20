import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button, ErrorOverlay, FlexGapped, Modal, Textarea } from "@/components";
import { BAD_CARDS, DECKID, IS_ANONYMOUS } from "@/constants";
import { deckAdd, useApp } from "@/context";
import { deckServices } from "@/services";
import { importDeck } from "@/utils";

const DeckImportText = ({ isAnonymous, setBadCards, setShow }) => {
  const {
    isPlaytester,
    isMobile,
    setShowFloatingButtons,
    setShowMenuButtons,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const navigate = useNavigate();
  const [deckText, setDeckText] = useState("");
  const [error, setError] = useState();
  const ref = useRef();

  const handleChange = (event) => {
    setError(null);
    setDeckText(event.target.value);
  };

  const handleClose = () => {
    setDeckText("");
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
    setShow(false);
  };

  const importDeckFromText = async () => {
    setError(null);
    if (!deckText) return setError("ENTER DECK LIST");

    const d = await importDeck(deckText, cryptCardBase, libraryCardBase, isPlaytester);

    deckServices
      .deckImport({ ...d, [IS_ANONYMOUS]: isAnonymous })
      .then((data) => {
        deckAdd({
          ...d,
          [DECKID]: data[DECKID],
        });
        navigate(`/decks/${data[DECKID]}`);
        setBadCards(d[BAD_CARDS]);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        setDeckText("");
        handleClose();
      })
      .catch(() => setError("ERROR DURING IMPORT"));
  };

  const placeholder = `\
Paste deck here (text from TWD, Amaranth, Lackey).

It accepts (but work without also) headers like:
Deck Name: xxxx
Author: xxxx
Description: xxxx

It accept crypt like (even lowercase):
5x Cybele	   10  ANI DAI OBF PRE SER THA	Baali:4
5x Cybele
5 Cybele

It accept library like (even lowercase):
12x Ashur Tablets
12 Ashur Tablets

It will skip other (useless) lines, you don't have to remove it yourself.
`;

  return (
    <Modal initialFocus={ref} handleClose={handleClose} title="Import from Text">
      <FlexGapped className="flex-col">
        <div className="relative">
          <Textarea
            className="w-full font-mono"
            rows={isMobile ? "20" : "25"}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            ref={ref}
          />
          {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
        </div>
        <div className="flex justify-end">
          <Button onClick={importDeckFromText}>Import</Button>
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckImportText;
