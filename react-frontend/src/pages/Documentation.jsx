import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import At from 'assets/images/icons/at.svg';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import { Banner } from 'components';

function Documentation(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={7} lg={6} xl={5} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5>HELP / DOCUMENTATION</h5>
            <p>
              Documentation below describe some logic of VDB components.
              <br />
              If something is not clear or you need additional information,
              please reach me by the contacts in the bottom of{' '}
              <Link to="/about">About page</Link>
            </p>

            <div className="pt-3">
              <h5>TABLE OF CONTENT</h5>
              <ul>
                <li>
                  <a href="#crypt">Crypt search</a>
                </li>
                <li>
                  <a href="#library">Library search</a>
                </li>
                <li>
                  <a href="#twd">TWD search</a>
                </li>
                <li>
                  <a href="#pda">PDA search</a>
                </li>
                <li>
                  <a href="#decks">Deck view</a>
                </li>
                <li>
                  <a href="#inventory">Inventory</a>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 id="crypt">CRYPT SEARCH</h5>

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

            <div className="pt-3">
              <h5 id="library">LIBRARY SEARCH</h5>

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

            <div className="pt-3">
              <h5 id="twd">TWD SEARCH</h5>

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

            <div className="pt-3">
              <h5 id="pda">PDA SEARCH</h5>
              <h6 className="red">
                PDA IS BETA FEATURE AND MAY BE UNSTABLE. PLEASE BACKUP (EXPORT)
                YOUR DECKS BEFORE USING IT.
              </h6>
              <p>
                Public Deck Archive (PDA) let you share your decks with other
                players and search other players shared decks
              </p>

              <h6>Following concepts are behind PDA:</h6>
              <ul>
                <li>
                  Public it can be searched (using similar set of filters as for
                  TWDA), viewed, copied by other players in the PDA page, and
                  can be deleted by the author (but as with any other deck,
                  author cannot delete your copy of the deck made with Copy deck
                  button)
                </li>
                <li>
                  Public Deck is created from one of your existing deck (parent)
                  in the Decks page using Public Archive button
                </li>
                <li>
                  You can switch to/from your public (child) and parent deck
                  using Public Archive button in Deck page, with Public deck
                </li>
                <li>
                  Public deck is non-editable with standard card buttons. The
                  only way to update Public Deck is to sync it with the parent
                  deck using Public Archive button in Deck page. It does not
                  automatically follows updates of the parent deck
                </li>
                <li>
                  We encourage people to mostly leave the deck unchanged after
                  publishing. For significant changes please create new deck
                  (feel free to use Description to give cross-references between
                  sister decks and/or give any explanation you want)
                </li>
                <li>
                  Author can remove the deck from PDA anytime, but each re-add
                  creates new copy of the deck and it will be listed again (not
                  available for those who add it to Favorites before deletion)
                </li>
                <li>
                  Deck author name is public author name (same you see in Deck
                  view page), it is not unique (no ownership), can be different
                  from your account name and can be changed anytime
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 id="decks">DECK BUILDING / VIEWING</h5>

              <h6>Hints</h6>
              <ul>
                <li>
                  You can change card quantity by clicking on the quantity to
                  enter number manual
                </li>
              </ul>

              <h6>URLs</h6>
              <ul>
                <li>
                  Standard URL (Copy URL button) - copy URL to the deck and
                  follow your changes.
                </li>
                <li>
                  Immutable URL - create link to unchangeable copy of the deck.
                  Good for forum/blog posts and where you want everybody to have
                  same exact deck forever (your future changes in the deck will
                  not change the deck by the link).
                </li>
                <li>
                  Deck-in-URL - copy URL containing everything about the deck.
                  Bulletproof, can be decoded even if VDB is dead. Good, but
                  long.
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
                  played cards, shuffle it and draw back to your hand size)
                </li>
                <li>
                  Draw calculation code (requires a little programming literacy
                  to read) is{' '}
                  <a href="https://github.com/smeea/vdb/blob/master/react-frontend/pages/components/drawProbability.js">
                    there
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 id="inventory">INVENTORY MANAGEMENT</h5>
              Inventory management in VDB let you browse your card collection
              with existing crypt/library search and track how collection is
              used in your existing decks
              <h6>Add cards from you collection:</h6>
              <ul>
                <li>
                  One by one using &#39;Add Card&#39; forms on top (last card
                  you add stays on top so you can change quantity without
                  scrolling down)
                </li>
                <li>
                  Add full deck from your Deck collection (be careful you can
                  add one deck multiple times doubling the quantity)
                </li>
              </ul>
              <h6>Search cards from inventory:</h6>
              <ul>
                <li>
                  Go to Crypt or Library search page (the one you use to search
                  all VTES cards)
                </li>
                <li>Activate Inventory Mode in the top-left corner</li>
                <li>
                  Now all searches you do will search in your inventory (and you
                  can swap to-from all VTES cards any time to repeat search with
                  new &#39;source&#39;)
                </li>
                <li>
                  Two columns left to capacity show: total cards you have in
                  inventory & used cards in your decks (read below about it)
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
                  your in-progress projects
                </li>
                <li>
                  <div className="d-inline px-2">
                    <Shuffle />
                  </div>
                  Flexible. These decks can share cards between them, like you
                  want for your temporary test decks or if your card pool is not
                  big (yet)
                </li>
                <li>
                  <div className="d-inline px-2">
                    <PinAngleFill />
                  </div>
                  Fixed. These decks each use unique cards like for your
                  permanent decks you dont want to disassembly between game
                  sessions
                </li>
              </ul>
              <p>
                You can change status of the deck in Deck page by clicking
                Status button next to deck select form
              </p>
              <p>
                Additionally you can set status per-card (i.e. if your deck is
                fixed except few Masters you swap between decks) clicking on the
                icon to the left of the card in the deck list. All other cards
                of the deck will continue to be of the deck status
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Documentation;
