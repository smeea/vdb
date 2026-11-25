import ky from "ky";
import { unzip, strFromU8 } from 'fflate';
import { Activity, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useSnapshot } from "valtio";
import {
  ButtonClose,
  ButtonFloatClose,
  ErrorMessage,
  FlexGapped,
  Header,
  Hr,
  TdaCharts,
  TdaInfo,
  TdaLoadPreparedButtons,
  TdaList,
  TdaResult,
  TdaSearchForm,
} from "@/components";
import {
  AUTHOR,
  CITY,
  COUNTRY,
  CRYPT,
  DATE,
  DECK,
  DECKS,
  DESCRIPTION,
  EVENT,
  GW,
  INFO,
  LIBRARY,
  NAME,
  OLD_EVENT,
  PLAYERS,
  RANK,
  RESULTS,
  ROUNDS,
  SCORE,
  TAGS,
  VP,
} from "@/constants";
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults, tdaStore, useApp } from "@/context";
import { getCountryName, parseDeck, getTags, importDeck, parseArchon } from "@/utils";
import { archiveServices } from "@/services";

const MEDIAN_RANK = "median_rank";
const MEDIAN_GW = "median_gw";
const MEDIAN_VP = "median_vp";
const TOTAL_GW = "total_gw";
const TOTAL_VP = "total_vp";

const unzipAsync = (u8) =>
  new Promise((res, rej) => unzip(u8, (err, files) => (err ? rej(err) : res(files))));

const u8ToB64 = (u8, chunk = 0x8000) => {
  let s = '';
  for (let i = 0; i < u8.length; i += chunk) {
    s += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  }
  return btoa(s);
};


const Tda = () => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const { [DECKS]: decks, [RESULTS]: results, [INFO]: info } = useSnapshot(tdaStore);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState();
  const [tempDecks, setTempDecks] = useState();
  const [tempArchon, setTempArchon] = useState();
  const [error, setError] = useState(false);

  const getDecks = (value) => {
    const d = {};

    Object.entries(value[PLAYERS]).forEach(([k, v]) => {
      if (v[DECK]) {
        const { [CRYPT]: crypt, [LIBRARY]: library } = parseDeck(cryptCardBase, libraryCardBase, v[DECK]);

        d[k] = {
          [NAME]: v[NAME],
          [AUTHOR]: v[AUTHOR],
          [DESCRIPTION]: `${v[GW]}GW ${v[VP]}VP`,
          [CRYPT]: crypt,
          [LIBRARY]: library,
          [TAGS]: getTags(crypt, library),
          [SCORE]: {
            [GW]: v[GW],
            [VP]: v[VP],
            [RANK]: Number(k) + 1,
          },
        };
      }
    })

    return d;
  };

  const getInfo = (value) => {
    // TODO add matches info
    return {
      // avgMatchGw: 0.6,
      // avgMatchVp: 4.1,
      // matches: "16",
      date: value[INFO][DATE],
      event: value[INFO][NAME],
      location: `${value[INFO][CITY]}, ${getCountryName(value[INFO][COUNTRY])}`,
      medianPlayerGw: value[INFO][MEDIAN_GW],
      medianPlayerVp: value[INFO][MEDIAN_VP],
      medianReportedRank: value[INFO][MEDIAN_RANK],
      players: value[INFO][PLAYERS],
      rounds: value[INFO][ROUNDS],
      totalGw: value[INFO][TOTAL_GW],
      totalVp: value[INFO][TOTAL_VP],
    }
  };


  const getDeckOld = async (data) => {
    const deck = await importDeck(data, cryptCardBase, libraryCardBase);
    deck[TAGS] = await getTags(deck[CRYPT], deck[LIBRARY]);
    return deck;
  };

  const loadPrepared = async (id) => {
    setError(false);
    const url = `${import.meta.env.VITE_BASE_URL}/tournaments/${id}.zip`;

    ky.get(url)
      .then((response) => {
        if (response.status === 200 || response.status === 0) return response.blob();
        throw new Error(response.statusText);
      })
      .then((blob) => blob.arrayBuffer())
      .then((buf) => unzipAsync(new Uint8Array(buf)))
      .then(async (files) => {
        const entries = Object.entries(files).filter(([name]) => !name.endsWith('/'));
        if (!entries.length) throw new Error('empty archive');

        const archon = entries.find(([name]) => name.toLowerCase().endsWith(".xlsx"));
        if (archon) setTempArchon(u8ToB64(archon[1]));

        const decks = {};
        for (const [name, u8] of entries) {
          if (name.toLowerCase().endsWith(".xlsx")) continue;
          const deck = await getDeckOld(strFromU8(u8));
          if (!deck) continue;
          decks[deck[AUTHOR]] = deck;
        }

        setTempDecks(decks);
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
  };

  useEffect(() => {
    if (tempDecks && tempArchon) {
      loadArchon(tempArchon);
    }
  }, [tempDecks, tempArchon]);

  useEffect(() => {
    if (
      (params[EVENT] || params[OLD_EVENT]) &&
      !(tdaStore[DECKS] || tdaStore[INFO]) &&
      cryptCardBase &&
      libraryCardBase
    ) {
      setError(false);

      if (params[EVENT]) {
        (async () => {
          const t = await archiveServices.getTda(params[EVENT]);
          setTdaInfo(getInfo(t));
          setTdaDecks(getDecks(t));
        })();
      } else {
        loadPrepared(params[OLD_EVENT]);
      }
    }
  }, [params[EVENT], params[OLD_EVENT], cryptCardBase, libraryCardBase]);

  return (
    <div className="twd-container mx-auto flex flex-col gap-2">
      {error && <ErrorMessage>NO DATA AVAILABLE FOR EVENT #{error}</ErrorMessage>}
      <FlexGapped className="flex-col">
        {!(info && decks) && (
          <div className="flex min-h-[70vh] flex-col place-items-center justify-center max-sm:px-2">
            <div className="flex flex-col gap-4">
              <TdaList setError={setError} />
              <Hr />
              <Header className="justify-center p-2">
                Below are manually collected events, prior Online Archon
              </Header>
              <TdaLoadPreparedButtons
                setTempDecks={setTempDecks}
                setTempArchon={setTempArchon}
                setError={setError}
              />
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
