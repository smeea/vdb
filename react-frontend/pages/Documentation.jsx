import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import At from '../assets/images/icons/at.svg';
import Shuffle from '../assets/images/icons/shuffle.svg';
import PinAngleFill from '../assets/images/icons/pin-angle-fill.svg';
import Banner from './components/Banner.jsx';

function Documentation(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col md={12} lg={6} className="px-0">
          <Banner />
          <div className="px-2">
            <div className="pt-2">
              <h5>HELP / DOCUMENTATION</h5>
              <p>
                Documentation below describe some logic of VDB components.
                <br />
                If something is not clear or you need additional information,
                please reach me by the contacts in the bottom of{' '}
                <Link to="/about">About page</Link>.
              </p>
            </div>

            <div className="pt-2">
              <h5>
                <Link to="/crypt" className="blue">
                  CRYPT SEARCH
                </Link>
              </h5>

              <h6>Name or Text</h6>
              <ul>
                <li>
                  Match cards if name or card text includes given string (not
                  only starting at the beginning of the word)
                </li>
                <li>
                  Exact match of the word can be achieved with double-quoting
                  (e.g. &quot;controlled&quot; will not match cards with
                  uncontrolled in card text). One double-quote is also fine to
                  limit word from one side.
                </li>
                <li>Case insensitive</li>
                <li>
                  Accept latin-only and unicode letters as card name (e.g. will
                  match Lise & Lisé, Zurich & Zürich)
                </li>
                <li>
                  Accept{' '}
                  <a href="https://www.w3schools.com/python/python_regex.asp">
                    Python Regular Expressions
                  </a>
                </li>
              </ul>

              <h6>Traits</h6>
              <ul>
                <li>Must match all selected traits (logical AND)</li>
                <li>
                  Will match if vampire have stronger effect than required trait
                  (i.e. +2 strength vampire will match +1 strength trait)
                </li>
              </ul>

              <h6>Title</h6>
              <ul>
                <li>Must match any of selected titles (logical OR)</li>
              </ul>

              <h6>Group</h6>
              <ul>
                <li>Must match any of selected groups (logical OR)</li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>
                <Link to="/library" className="blue">
                  LIBRARY SEARCH
                </Link>
              </h5>

              <h6>Name or Text</h6>
              <ul>
                <li>
                  Match cards if name or card text includes given string (not
                  only starting at the beginning of the word)
                </li>
                <li>
                  Exact match of the word can be achieved with double-quoting
                  (e.g. &quot;controlled&quot; will not match cards with
                  uncontrolled in card text). One double-quote is also fine to
                  limit word from one side.
                </li>
                <li>Case insensitive</li>
                <li>
                  Accept latin-only and unicode letters as card name (e.g. will
                  match Lise & Lisé, Zurich & Zürich)
                </li>
                <li>
                  Accept{' '}
                  <a href="https://www.w3schools.com/python/python_regex.asp">
                    Python Regular Expressions
                  </a>
                </li>
              </ul>

              <h6>Traits</h6>
              <ul>
                <li>Must match all selected traits (logical AND)</li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>
                <Link to="/twd" className="blue">
                  TWD SEARCH
                </Link>
              </h5>

              <h6>Star Vampire</h6>
              <ul>
                <li>
                  Match decks with more than 38% in the crypt being any
                  particular vampire (both Base + Adv), excluding Anarch Convert
                  (does not counted at all).
                  <ul>
                    <li>
                      E.g.: 5x Arika + 7x Other is Star Deck
                      <tt>
                        <i> -&gt; 5/12 = 41%</i>
                      </tt>
                    </li>
                    <li>
                      Ex: 4x Arika + 4x AC + 4x Other is Star Deck
                      <tt>
                        <i> -&gt; 4/(4+4) = 50%</i>
                      </tt>
                    </li>
                  </ul>
                  Reason for strange percentage (38%) is to include decks with 5
                  of 13 vampires (38,4%), but exclude everything below starting
                  from decks with 3 of 8 vampires (with 4+ Anarch Converts
                  (37,5%))
                </li>
              </ul>

              <h6>Clan</h6>
              <ul>
                <li>
                  Match decks with more than 60% vampires in the crypt of the
                  given clan, excluding Anarch Convert (does not counted at all)
                  <ul>
                    <li>
                      E.g.: 5x Ventrue + 3 Anarch Convert + 3x Other is Ventrue
                      Deck
                      <tt>
                        <i> -&gt; 5/(5+3) = 62%</i>
                      </tt>
                    </li>
                  </ul>
                </li>
              </ul>

              <h6>Capacity Average</h6>
              <ul>
                <li>
                  Calculated excluding Anarch Convert (does not counted at all)
                  <ul>
                    <li>
                      E.g.: 5x 11-cap + 4x Anarch Convert + 3x 3-cap is 8 avg.
                      cap
                      <tt>
                        <i> -&gt; (5*11+3*3)/(5+3) = 8</i>
                      </tt>
                    </li>
                  </ul>
                </li>
              </ul>

              <h6>Library Disciplines</h6>
              <ul>
                <li>
                  Matches decks with library cards using all selected
                  disciplines at least once
                </li>
                <li>
                  Multi-discipline cards considered as of all given disciplines
                  <ul>
                    <li>
                      E.g.: Deck with Condemnation: Mute (chi/dai/DAI card) will
                      match Chimerstry search, even if it was never planned by
                      the deck to use it with chi.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>
                <Link to="/decks" className="blue">
                  DECK BUILDING
                </Link>
              </h5>

              <h6>Hints</h6>
              <ul>
                <li>
                  You can change card quantity by clicking on the quantity to
                  enter number manual
                </li>
              </ul>

              <h6>Draw Probability</h6>
              <ul>
                <li>
                  Draw probability in main deck window available on (i) button
                  is calculated as initial draw of 4 crypt and 7 library.
                </li>
                <li>
                  Draw probability in draw simulator available on Deck Draw
                  button is calculated as chance to initially draw cards in
                  existing hand (with respect to hand size and discarded cards).
                  It is not the chance to draw additional cards to your hand,
                  but chance to draw cards in the hand in the first place
                  (imagine you return hand to the library, excluding already
                  played cards, shuffle it and draw back to your hand size).
                </li>
                <li>
                  Draw calculation code (requires a little programming literacy
                  to read) is{' '}
                  <a href="https://github.com/smeea/vdb/blob/master/react-frontend/pages/components/drawProbability.js">
                    there
                  </a>
                  .<br />
                  Where:
                  <br />
                  <i>i</i> is copies in hand we calculate agains (e.g. i=2 to
                  draw 2 copy of the card)
                  <br />
                  <i>N</i> is total cards in deck (e.g. N=12 for crypt size of
                  12)
                  <br />
                  <i>n</i> is hand size (e.g. n=4 for initial crypt draw of 4
                  card)
                  <br />
                  <i>k</i> is copy of particular card in deck (e.g. k=5 for 5
                  copy of Arika in the deck)
                  <br />
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>
                <Link to="/inventory" className="blue">
                  INVENTORY MANAGEMENT
                </Link>
              </h5>
              Inventory management in VDB let you browse your card collection
              with existing crypt/library search and track how collection is
              used in your existing decks.
              <h6>Add cards from you collection:</h6>
              <ul>
                <li>
                  One by one using &#39;Add Card&#39; forms on top (last card
                  you add stays on top so you can change quantity without
                  scrolling down);
                </li>
                <li>
                  Add full deck from your Deck collection (be careful you can
                  add one deck multiple times doubling the quantity);
                </li>
              </ul>
              <h6>Search cards from inventory:</h6>
              <ul>
                <li>
                  Go to Crypt or Library search page (the one you use to search
                  all VTES cards)
                </li>
                <li>Activate Inventory Mode in the top-left corner;</li>
                <li>
                  Now all searches you do will search in your inventory (and you
                  can swap to-from all VTES cards any time to repeat search with
                  new &#39;source&#39;);
                </li>
                <li>
                  Two columns left to capacity show: total cards you have in
                  inventory & used cards in your decks (read below about it);
                </li>
              </ul>
              <h6>
                To track how cards are used in your decks, each deck has the one
                of the following status:
              </h6>
              <ul>
                <li>
                  <div className="d-inline px-2">
                    <At />
                  </div>
                  Virtual (default). These decks are excluded from inventory
                  management tracking, like you want for virtual Lackey decks or
                  your in-progress projects.
                </li>
                <li>
                  <div className="d-inline px-2">
                    <Shuffle />
                  </div>
                  Flexible. These decks can share cards between them, like you
                  want for your temporary test decks or if your card pool is not
                  big (yet).
                </li>
                <li>
                  <div className="d-inline px-2">
                    <PinAngleFill />
                  </div>
                  Fixed. These decks each use unique cards like for your
                  permanent decks you dont want to disassembly between game
                  sessions.
                </li>
              </ul>
              <p>
                You can change status of the deck in Deck page by clicking
                Status button next to deck select form.
              </p>
              <p>
                Additionally you can set status per-card (i.e. if your deck is
                fixed except few Masters you swap between decks) clicking on the
                icon next to the card in the deck list. All other cards of the
                deck will continue to be of the deck status.
              </p>
              <h6>And more:</h6>
              <ul>
                <li>
                  After you set status for your decks (and of course you can
                  change it any time), additional ({`'used'`}) column in Search
                  and Inventory pages will be filled with used card quantity in
                  Fixed (total of all Fixed decks, as you dont reuse these
                  cards) and maximum of Flexible in one deck (as you are ready
                  to share them between decks).
                </li>
                <li>
                  If you have less cards in inventory than you use (total fixed
                  + maximum flexible), then card quantity highlighted in red
                </li>
                <li>
                  You can hover mouse over card quantity for more details.
                </li>
                <li>
                  Cards from the decks you {`'use'`} (Fixed or Flexible) are
                  shown in Inventory even if you dont have them (with zero
                  quantity), so you will see what you miss.
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Documentation;
