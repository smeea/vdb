import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Telegram from '../assets/images/icons/telegram.svg';
import Github from '../assets/images/icons/github.svg';
import Discord from '../assets/images/icons/discord.svg';
import EnvelopeFill from '../assets/images/icons/envelope-fill.svg';
import Globe2 from '../assets/images/icons/globe2.svg';
import Banner from './components/Banner.jsx';

function About(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={5} className="px-0">
          <Banner />
          <div className="px-2">
            <div className="pt-2">
              <h5>WHAT IS IT</h5>
              <p>
                VDB is online card search, deck building and inventory
                (collection) management tool for Vampire the Eternal Struggle
                (VTES).
              </p>
            </div>

            <div className="pt-2">
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
                  <Link to="/decks">Create your decks</Link>
                </li>
                <li>
                  <Link to="/inventory">Manage your inventory</Link>
                </li>
                <li>
                  <Link to="/cards">Quick view card by the name</Link>
                </li>
                <li>
                  <Link to="/documentation">Documentation / Help</Link>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>FEATURES</h5>
              <ul>
                <li>
                  Combined deck building & search interface - browse & add cards
                  to your decks on-the-fly
                </li>
                <li>
                  Wide search options for cards and Tournament-Winning Decks
                  (TWD)
                </li>
                <li>Mobile-friendly (best on screens &gt;6&quot;)</li>
                <li>
                  Import/export your decks to popular formats (Amaranth, Lackey,
                  Excel)
                </li>
                <li>
                  Manage your card collection (inventory) with full search power
                </li>
                <li>Create printable PDF with proxy cards</li>
                <li>Open source, ad-free & privacy-respecting</li>
                <li>Once familiar with, you will love it!</li>
              </ul>
            </div>

            <div className="pt-2">
              <h5>VERSION</h5>
              <p>
                Card text based on{' '}
                <a href="http://www.vekn.net/card-lists">
                  vekn.net official list
                </a>
                : 2021-08-04
              </p>
            </div>

            <div className="pt-2">
              <h5>RELATED PROJECTS</h5>
              <p>
                <a href="https://amaranth.vtes.co.nz/">
                  <b>Amaranth</b>
                </a>
                <br />
                Online card search and deck-building tool. I use *many* ideas
                from Amaranth.
              </p>

              <p>
                <a href="https://codex-of-the-damned.org/">
                  <b>Codex of the Damned</b>
                </a>
                <br />
                Strategy portal.
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
                for more tools!
                <br />
              </p>
            </div>

            <div className="pt-2">
              <h5>PRIVACY</h5>
              <p>
                We respect privacy and promise not to use/share your data
                (email, decks, etc), and not to track your activity.
              </p>
            </div>

            <div className="pt-2">
              <h5>FOR DEVELOPERS</h5>
              <p>
                Development happens in{' '}
                <a href="https://github.com/smeea/vdb">
                  this Github repository.
                </a>
                <br />
                Source code of the site is available under free{' '}
                <a href="https://en.wikipedia.org/wiki/MIT_License">
                  MIT license.
                </a>
                <br />
                Card images & icons are copyrighted by Paradox Interactive AB.
              </p>
            </div>

            <div className="pt-2">
              <h5>ACKNOWLEDGMENTS</h5>
              <p>
                Card images by Fernando &quot;Syndelson&quot; Cesar from{' '}
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood">
                  FELD
                </a>
                <br />
                TWD and rulings by Lionel &quot;Phoenix&quot; Panhaleux from{' '}
                <a href="https://static.krcg.org/">KRCG</a>
                <br />
                Cards scans from different sets by{' '}
                <a href="http://vtes.pl/">VTES.PL</a> and{' '}
                <a href="https://sutekh.vtes.za.net">Sutekh</a>
              </p>
            </div>

            <div className="pt-2">
              <h5>DONATIONS</h5>
              <p>
                Bitcoin (BTC): <code>3ALLfiv3AWcm7WzgWm9gHmLAAUMRcegBtP</code>
              </p>
            </div>

            <div className="pt-2">
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
