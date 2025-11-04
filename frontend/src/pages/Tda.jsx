import ky from "ky";
import { Activity, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useSnapshot } from "valtio";
import {
  ButtonClose,
  ButtonFloatClose,
  ErrorMessage,
  FlexGapped,
  Header,
  TdaCharts,
  TdaInfo,
  TdaLoadCustomButtons,
  TdaLoadPreparedButtons,
  TdaResult,
  TdaSearchForm,
} from "@/components";
import { AUTHOR, CRYPT, DECKS, EVENT, INFO, LIBRARY, NAME, RESULTS, TAGS } from "@/constants";
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults, tdaStore, useApp } from "@/context";
import { getTags, importDeck, parseArchon } from "@/utils";

const TESTERS = ["1", "crauseon"];

const Tda = () => {
  const { username, cryptCardBase, libraryCardBase, isMobile } = useApp();
  const { [DECKS]: decks, [RESULTS]: results, [INFO]: info } = useSnapshot(tdaStore);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState();
  const [tempDecks, setTempDecks] = useState();
  const [tempArchon, setTempArchon] = useState();
  const [error, setError] = useState(false);

  const getDeck = async (data) => {
    const deck = await importDeck(data, cryptCardBase, libraryCardBase);
    deck[TAGS] = await getTags(deck[CRYPT], deck[LIBRARY]);
    return deck;
  };

  const loadPrepared = async (id) => {
    const { default: JSZip } = await import("jszip");
    setError(false);

    const url = `${import.meta.env.VITE_BASE_URL}/tournaments/${id}.zip`;

    ky.get(url)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        }
        return Promise.reject(new Error(response.statusText));
      })
      .then(JSZip.loadAsync)
      .then((zip) => {
        Object.values(zip.files).forEach(async (f) => {
          if (f[NAME].includes(".xlsx")) {
            const archon = await f.async("base64");
            setTempArchon(archon);
          }
        });

        const fetchedDecks = Object.values(zip.files)
          .filter((f) => !f[NAME].includes(".xlsx"))
          .map(async (f) => {
            const d = await f.async("string");
            return getDeck(d);
          });

        Promise.all(fetchedDecks).then((v) => {
          const d = {};
          v.forEach((i) => {
            d[i[AUTHOR]] = i;
          });

          setTempDecks(d);
        });
      })
      .catch(() => setError(id));
  };

  const loadArchon = async (file) => {
    const { info, tdaDecks } = await parseArchon(file, tempDecks);

    setTdaInfo(info);
    setTdaDecks(tdaDecks);
  };

  const handleCloseEvent = () => {
    clearTdaForm();
    setShowForm();
    setError(false);
    setTempArchon();
    setTempDecks();
    setTdaInfo();
    setTdaDecks();
    setTdaResults();
    navigate("/tda");
  };

  const handleClear = () => {
    setSearchParams();
    setShowForm(true);
  }

  useEffect(() => {
    if (tempDecks && tempArchon) {
      loadArchon(tempArchon);
    }
  }, [tempDecks, tempArchon]);

  useEffect(() => {
    if (params[EVENT] && !(tdaStore[DECKS] || tdaStore[INFO]) && cryptCardBase && libraryCardBase) {
      loadPrepared(params[EVENT]);
    }
  }, [params[EVENT], cryptCardBase, libraryCardBase]);

  return (
    <div className="twd-container mx-auto flex flex-col gap-2">
      <Activity mode={!(info && decks) ? "visible" : "hidden"}>
        <Header>
          <div className="flex w-full flex-col p-2 text-lg max-sm:gap-2">
            <div className="flex sm:justify-center">
              Want more Tournaments here? Help your organizer to collect the data!
            </div>
            <div className="flex gap-1.5 sm:justify-center">
              More details:
              <a
                target="_blank"
                rel="noreferrer"
                className="underline"
                href="https://garourimgazette.wordpress.com/vtes-discussions/vtes-tournament-archive/"
              >
                TOURNAMENTS DECKS ARCHIVE
              </a>
            </div>
          </div>
        </Header>
      </Activity>
      {error && <ErrorMessage>NO DATA AVAILABLE FOR EVENT #{error}</ErrorMessage>}
      <FlexGapped className="flex-col">
        {!(info && decks) && (
          <div className="flex min-h-[70vh] flex-col place-items-center justify-center max-sm:px-2">
            <div className="flex flex-col gap-2">
              <TdaLoadPreparedButtons
                setTempDecks={setTempDecks}
                setTempArchon={setTempArchon}
                setError={setError}
              />
              {TESTERS.includes(username) && (
                <TdaLoadCustomButtons
                  tempDecks={tempDecks}
                  setTempDecks={setTempDecks}
                  setTempArchon={setTempArchon}
                  getDeck={getDeck}
                  setError={setError}
                />
              )}
            </div>{" "}
            {decks && info && (
              <FlexGapped className="basis-3/12 flex-col max-sm:p-2">
                <ButtonClose handleClick={handleCloseEvent} text="Close Event" />
                <TdaInfo info={info} decks={decks} />
              </FlexGapped>
            )}
          </div>
        )}
        <Activity mode={!showForm || !isMobile ? "visible" : "hidden"}>
          <FlexGapped className="max-sm:flex-col">
            <div className="flex basis-9/12 justify-center max-sm:order-last">
              {decks && info && (
                <TdaCharts info={info} decks={decks} searchResults={results ?? {}} />
              )}
            </div>
            {decks && info && (
              <FlexGapped className="basis-3/12 flex-col max-sm:p-2">
                <ButtonClose handleClick={handleCloseEvent} text="Close Event" />
                <TdaInfo info={info} decks={decks} />
              </FlexGapped>
            )}
          </FlexGapped>
        </Activity>
        <Activity mode={decks && info ? "visible" : "hidden"}>
          <FlexGapped>
            <Activity mode={!showForm || !isMobile ? "visible" : "hidden"}>
              <div className="flex basis-full flex-col gap-4 sm:basis-7/12 lg:basis-8/12 xl:basis-9/12">
                <TdaResult decks={results ?? Object.values(decks ?? {})} />
              </div>
            </Activity>
            <Activity mode={(showForm && !query) || !isMobile ? "visible" : "hidden"}>
              <div className="flex basis-full flex-col gap-2 max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
                {isMobile && <ButtonClose handleClick={handleCloseEvent} text="Close Event" />}
                <TdaSearchForm setShowForm={setShowForm} />
              </div>
            </Activity>
          </FlexGapped>
        </Activity>
      </FlexGapped>
      {!showForm && decks && info && (
        <ButtonFloatClose className="sm:hidden" handleClose={handleClear} />
      )}
    </div>
  );
};

export default Tda;
