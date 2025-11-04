import { DeckRecommendationModal } from "@/components";
import { CARDS, CRYPT, ID, LIBRARY } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const cards = {};
  [...Object.values(deck[CRYPT]), ...Object.values(deck[LIBRARY])].forEach((card) => {
    if (card.q) cards[card.c[ID]] = card.q;
  });

  const url = `${import.meta.env.VITE_API_URL}/deck/recommendation`;
  const { value } = useFetch(
    url,
    {
      method: "POST",
      json: { [CARDS]: cards },
    },
    [],
  );

  const crypt = value
      ? value[CRYPT].map((cardid) => {
          return cryptCardBase[cardid];
        })
      : null;

  const library = value
      ? value[LIBRARY].map((cardid) => {
          return libraryCardBase[cardid];
        })
      : null;

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  return <DeckRecommendationModal handleClose={handleCloseModal} crypt={crypt} library={library} />;
};

export default DeckRecommendation;
