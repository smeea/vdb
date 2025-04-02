import { PlaytestReportEntry } from "@/components";
import { CARDS, PRECONS } from "@/constants";
import { useFetch } from "@/hooks";

const PlaytestReportEntryWrapper = ({ id, isPrecon }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${isPrecon ? PRECONS : CARDS}/${id}`;
  const { value } = useFetch(url, {}, [id]);

  return <>{value && <PlaytestReportEntry value={value} />}</>;
};

export default PlaytestReportEntryWrapper;
