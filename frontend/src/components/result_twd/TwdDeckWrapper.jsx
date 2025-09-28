import { TwdDeck } from "@/components";
import { useFetch } from "@/hooks";

const TwdDeckWrapper = ({ deckid, inPda }) => {
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? "pda" : "twd"}/${deckid}`;
  const { value } = useFetch(url, {}, []);

  if (value) return <TwdDeck deck={value} inPda={inPda} />;
};

export default TwdDeckWrapper;
