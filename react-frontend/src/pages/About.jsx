import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Telegram from 'assets/images/icons/telegram.svg';
import Github from 'assets/images/icons/github.svg';
import Discord from 'assets/images/icons/discord.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import Globe2 from 'assets/images/icons/globe2.svg';
import { Banner } from 'components';

function About(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} xxl={5} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5>WHAT IS IT</h5>
            <p>
              VDB is online card search, TWD (tournament winning decks) browser,
              deck building and inventory (collection) management tool for
              Vampire the Eternal Struggle (VTES)
            </p>

            <div className="pt-3">
              <h5>QUICKSTART</h5>
              <ul>
                <li>
                  <Link to="/crypt">Search crypt cards</Link>
                </li>
                <li>
                  <Link to="/library">Search library cards</Link>
                </li>
                <li>
                  <Link to="/twd">Search tournament-winning decks</Link>
                </li>
                <li>
                  <Link to="/decks">Create decks</Link>
                </li>
                <li>
                  <Link to="/inventory">Manage inventory</Link>
                </li>
                <li>
                  <Link to="/cards">Quick search card by name</Link>
                </li>
                <li>
                  <Link to="/documentation">Documentation / Help</Link>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5>TROUBLESHOOTING</h5>
              <p>
                If you experience problems like page crashes or something start
                to behave not as expected, try to reload page with browser cache
                update (Ctrl+F5 on Windows/Linux or Command+Shift+R on MacOS)
                <br />
                If this does not help, please contact me (see below)
              </p>
            </div>

            <div className="py-3">
              <h5>VERSION</h5>
              <p>
                Card text based on{' '}
                <a href="http://www.vekn.net/card-lists">
                  vekn.net official list
                </a>
                : 2021-12-01
              </p>

              <h6>Last update [2021-12-05]:</h6>
              <ul>
                <li>
                  Fix critical bug with promo cards from HB2 (Dracon, Capucin,
                  etc)
                </li>
                <li>Rename Thaumaturgy to Blood Sorcery</li>
                <li>
                  Add library search traits &quot;reduce bleed&quot; and
                  &quot;+votes / title&quot;
                </li>
              </ul>
              <Link to="/changelog">Full changes history</Link>
            </div>

            <div className="pt-3">
              <h5>RELATED PROJECTS</h5>
              <p>
                <a href="https://amaranth.vtes.co.nz/">
                  <b>Amaranth</b>
                </a>
                <br />
                Online card search and deck-building tool. I use *many* ideas
                from Amaranth
              </p>

              <p>
                <a href="https://codex-of-the-damned.org/">
                  <b>Codex of the Damned</b>
                </a>
                <br />
                Strategy portal
              </p>

              <p>
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                  <b>There are more!</b>
                </a>
                <br />
                Check{' '}
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                  vekn forum
                </a>{' '}
                for more tools
                <br />
              </p>
            </div>

            <div className="pt-3">
              <h5>FOR DEVELOPERS</h5>
              <p>
                Development happens in{' '}
                <a href="https://github.com/smeea/vdb">
                  this Github repository
                </a>
                <br />
                Source code of the site is available under free{' '}
                <a href="https://en.wikipedia.org/wiki/MIT_License">
                  MIT license
                </a>
                <br />
                Card images & icons are copyrighted by{' '}
                <a href="https://www.paradoxinteractive.com/">
                  Paradox Interactive AB
                </a>
              </p>
            </div>

            <div className="pt-3">
              <h5>ACKNOWLEDGMENTS</h5>
              <ul>
                <li>Card images by Fernando &quot;Syndelson&quot; Cesar</li>
                <li>
                  Rulings by Lionel &quot;Phoenix&quot; Panhaleux from{' '}
                  <a href="https://static.krcg.org/">KRCG</a>
                </li>
                <li>TWD by Vincent &quot;Ankha&quot; Ripoll</li>
                <li>
                  Cards scans from different sets by{' '}
                  <a href="http://vtes.pl/">VTES.PL</a> and{' '}
                  <a href="https://ccggamez.com">CCGAMEZ.COM</a>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5>DONATIONS</h5>
              <p>
                Bitcoin (BTC): <code>3ALLfiv3AWcm7WzgWm9gHmLAAUMRcegBtP</code>
              </p>
            </div>

            <div className="pt-3">
              <h5>CONTACTS</h5>
              <ul className="no-bullets">
                <li>
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Globe2 />
                    </div>
                    <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78924-vdb-online-card-search-deck-building-tool">
                      VEKN.net forum
                    </a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Github />
                    </div>
                    <a href="https://github.com/smeea/vdb">
                      https://github.com/smeea/vdb
                    </a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <EnvelopeFill />
                    </div>
                    <a href="mailto:smeea@riseup.net">smeea@riseup.net</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Telegram />
                    </div>
                    <a href="https://t.me/smeea">@smeea</a>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Discord />
                    </div>
                    <a href="https://discord.com/users/264725500226830336">
                      Smeea#3259
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
