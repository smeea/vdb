import { Activity, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSnapshot } from "valtio";
import { ButtonFloatClose, ErrorMessage, FlexGapped, TwdResult, TwdSearchForm } from "@/components";
import { TWD } from "@/constants";
import { searchResults, setTwdResults, useApp } from "@/context";

const Twd = () => {
  const { showFloatingButtons, isMobile } = useApp();
  const twdResults = useSnapshot(searchResults)[TWD];
  const [error, setError] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));
  const handleClear = () => setSearchParams();

  useEffect(() => {
    if (!query) setTwdResults();
  }, [query]);

  return (
    <div className="twd-container mx-auto">
      <FlexGapped>
        <Activity mode={!isMobile || (!error && twdResults) ? "visible" : "hidden"}>
          <div className="basis-full sm:basis-7/12 lg:basis-8/12 xl:basis-9/12">
            <Activity mode={twdResults ? "visible" : "hidden"}>
              <TwdResult results={twdResults} />
            </Activity>
            {error && <ErrorMessage sticky>{error}</ErrorMessage>}
          </div>
        </Activity>
        <Activity mode={!isMobile || !twdResults ? "visible" : "hidden"}>
          <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
            <TwdSearchForm error={error} setError={setError} />
          </div>
        </Activity>
      </FlexGapped>
      {showFloatingButtons && twdResults && (
        <ButtonFloatClose className="sm:hidden" handleClose={handleClear} />
      )}
    </div>
  );
};

export default Twd;
