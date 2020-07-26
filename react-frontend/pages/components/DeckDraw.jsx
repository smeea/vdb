import React, { useState } from "react";
import CryptResults from "./CryptResults.jsx";
import LibraryResults from "./LibraryResults.jsx";

function DeckDraw(props) {

  const drawCards = (cards, quantity) => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let cards_total = 0;
    for (const i of Object.keys(cards)) {
      cards_total += cards[i].q;
    }

    if (quantity <= cards_total) {
      const cards_array = [];
      const draw_array = [];

      Object.keys(cards).map((card) => {
        let q = cards[card].q;
        while (q > 0) {
          q -= 1;
          cards_array.push(cards[card].c);
        }
      });

      while (quantity > 0) {
        let random_num = getRandomInt(cards_array.length);
        while (cards_array[random_num] === undefined ) {
          random_num = getRandomInt(cards_array.length);
        }
        draw_array.push(cards_array[random_num]);
        delete cards_array[random_num];
        quantity -= 1;
      }

      return(draw_array);
    } else {
      return(null);
    }
  };

  const [drawedCrypt, setDrawCrypt] = useState(undefined);
  const [drawedLibrary, setDrawLibrary] = useState(undefined);

  return(
    <div>
      <div>
        <button className="btn btn-outline-secondary" type="button" onClick={() => setDrawCrypt(drawCards(props.crypt, 4))}>
          DRAW CRYPT
        </button>
        <button className="btn btn-outline-secondary" type="button" onClick={() => setDrawLibrary(drawCards(props.library, 7))}>
          DRAW LIBRARY
        </button>
        <button className="btn btn-outline-secondary" type="button" onClick={() => {
          setDrawCrypt(null);
          setDrawLibrary(null);
        }}>
          DRAW CLEAR
        </button>
      </div>
      <div>
        {drawedCrypt != null &&
         <div>
           <b>Crypt Draw:</b>
           <CryptResults cards={drawedCrypt} />
           <br />
         </div >
        }
        {drawedLibrary != null &&
         <div>
           <b>Library Draw:</b>
           <LibraryResults cards={drawedLibrary} />
           <br />
         </div>
        }
      </div>
    </div>
  );
}

export default DeckDraw;
