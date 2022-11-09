import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Telegram from 'assets/images/icons/telegram.svg';
import Github from 'assets/images/icons/github.svg';
import Discord from 'assets/images/icons/discord.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import Globe2 from 'assets/images/icons/globe2.svg';
import ClipboardFill from 'assets/images/icons/clipboard-fill.svg';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const About = () => {
  const BTC_WALLET = 'bc1qcj6zs57xskca9cua2lj5la6l2yz368j0wxdeap';

  return (
    <Container className="search-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7} xl={6} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5 className="ul-2px">WHAT IS IT</h5>
            <p>
              VDB is online card search, TWD (tournament winning decks) browser,
              deck building and inventory (collection) management tool for
              Vampire the Eternal Struggle (VTES)
            </p>

            <div className="pt-3">
              <h5 className="ul-2px">QUICKSTART</h5>
              <ul>
                <li className="pb-1">
                  <Link to="/crypt" className="py-1">
                    Search crypt cards
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/library" className="py-1">
                    Search library cards
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/decks" className="py-1">
                    Create your decks
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/inventory" className="py-1">
                    Manage your inventory
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/twd" className="py-1">
                    Search Tournament-Winning Decks
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/pda" className="py-1">
                    Search Public Deck Archive
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/cards" className="py-1">
                    Quick search card by name
                  </Link>
                </li>
                <li className="pb-1">
                  <Link to="/documentation" className="py-1">
                    Documentation / Help
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">TROUBLESHOOTING</h5>
              <p>
                If you experience problems like white screen or strange
                behavior, reload page (Ctrl+F5 on Windows/Linux or
                Command+Shift+R on MacOS)
              </p>
              <p>If this does not help, please contact me (see below)</p>
            </div>

            <div className="py-3">
              <h5 className="ul-2px">VERSION</h5>
              <p>
                Card text based on{' '}
                <a href="https://www.vekn.net/card-lists">VEKN official list</a>
                : <span className="nowrap">2022-05-17</span>
              </p>

              <h6>Last update [{changes[0].version}]:</h6>
              <ul>
                {changes[0].changes.map((change, idx) => (
                  <li key={idx} className="pb-1">
                    {change}
                  </li>
                ))}
              </ul>
              <Link to="/changelog">&gt;&gt; Full changes history</Link>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">RELATED PROJECTS</h5>
              <p>
                <a href="https://amaranth.vtes.co.nz/">
                  <b>Amaranth</b>
                </a>
                <br />
                Online card search and deck-building tool
              </p>

              <p>
                <a href="https://vtesdecks.com/">
                  <b>VTES Decks</b>
                </a>
                <br />
                Online deck builder and TWD browser
              </p>

              <p>
                <a href="https://codex-of-the-damned.org/">
                  <b>Codex of the Damned</b>
                </a>
                <br />
                Strategy portal
              </p>

              <p>
                <a href="https://vtes-hook.com/">
                  <b>VTES Hook</b>
                </a>
                <br />
                Events portal
              </p>

              <p>
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                  <b>There are more!</b>
                </a>
                <br />
                Check{' '}
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                  VEKN forum
                </a>{' '}
                for more tools
                <br />
              </p>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">FOR DEVELOPERS</h5>
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

              <p>
                There is amazing KRCG project with useful{' '}
                <a href="https://static.krcg.org/">Static files</a> and{' '}
                <a href="https://api.krcg.org/">Online API</a> to help in
                software development for VTES
              </p>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">ACKNOWLEDGMENTS</h5>
              <ul>
                <li className="pb-1">
                  Card images by Fernando &quot;Sydnelson&quot; Cesar
                </li>
                <li className="pb-1">
                  Rulings archive by Lionel &quot;Phoenix&quot; Panhaleux from{' '}
                  <a href="https://static.krcg.org/">KRCG</a>
                </li>
                <li className="pb-1">
                  TWD archive by Vincent &quot;Ankha&quot; Ripoll
                </li>
                <li className="pb-1">
                  Cards scans from different sets by{' '}
                  <a href="http://vtes.pl/">VTES.PL</a> and{' '}
                  <a href="https://ccggamez.com">CCGAMEZ.COM</a>
                </li>
                <li className="pb-1">
                  Andrey &quot;Vaughnad&quot; Davino for multiple development
                  contributions
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">DONATIONS</h5>
              <ul className="no-bullets">
                <li className="pb-1">
                  Patreon:{' '}
                  <a href="https://www.patreon.com/smeea">
                    www.patreon.com/smeea
                  </a>
                </li>
                <li className="pb-1">
                  Bitcoin (BTC):{' '}
                  <a
                    href={`https://www.blockchain.com/btc/address/${BTC_WALLET}`}
                  >
                    <code>{BTC_WALLET}</code>
                  </a>
                  <span
                    className="d-inline ps-2 with-hover"
                    onClick={() => navigator.clipboard.writeText(BTC_WALLET)}
                  >
                    <ClipboardFill viewBox="0 0 18 18" />
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <h5 className="ul-2px">CONTACTS</h5>
              <ul className="no-bullets">
                <li className="pb-1">
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Globe2 />
                    </div>
                    <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78924-vdb-online-card-search-deck-building-tool">
                      VEKN forum
                    </a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Github />
                    </div>
                    <a href="https://github.com/smeea/vdb">
                      github.com/smeea/vdb
                    </a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <EnvelopeFill />
                    </div>
                    <a href="mailto:smeea@riseup.net">smeea@riseup.net</a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="d-flex align-items-center">
                    <div className="icon pe-2">
                      <Telegram />
                    </div>
                    <a href="https://t.me/smeea">@smeea</a>
                  </div>
                </li>
                <li className="pb-1">
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
};

export default About;
