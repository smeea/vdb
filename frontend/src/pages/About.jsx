import React from 'react';
import { Link } from 'react-router-dom';
import Telegram from 'assets/images/icons/telegram.svg';
import Github from 'assets/images/icons/github.svg';
import Discord from 'assets/images/icons/discord.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import Globe2 from 'assets/images/icons/globe2.svg';
import ClipboardFill from 'assets/images/icons/clipboard-fill.svg';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Title = ({ children }) => {
  return (
    <div className="font-bold text-xl text-blue underline py-1">{children}</div>
  );
};

const About = () => {
  const BTC_WALLET = 'bc1qcj6zs57xskca9cua2lj5la6l2yz368j0wxdeap';

  return (
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center">
        <div className="basis-1/2 px-0">
          {/* TODO basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 */}
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <div className="pb-4">
              <Title>WHAT IS IT</Title>
              <div className="py-1">
                VDB is online card search, TWD (tournament winning decks)
                browser, deck building and inventory (collection) management
                tool for Vampire the Eternal Struggle (VTES)
              </div>
            </div>

            <div className="pb-4">
              <Title>QUICKSTART</Title>
              <div className="py-1">
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
            </div>

            <div className="pb-4">
              <Title>TROUBLESHOOTING</Title>
              <div className="py-1">
                If you experience problems like white screen or strange
                behavior, reload page (Ctrl+F5 on Windows/Linux or
                Command+Shift+R on MacOS)
              </div>
              <div className="py-1">
                If this does not help, please contact me (see below)
              </div>
            </div>

            <div className="pb-4">
              <Title>VERSION</Title>
              <div className="py-1">
                Card text based on{' '}
                <a href="https://www.vekn.net/card-lists">VEKN official list</a>
                : <span className="whitespace-nowrap">2022-11-14</span>
              </div>
              <div className="font-bold text-blue py-1">
                Last update [{changes[0].version}]:
              </div>
              <ul>
                {changes[0].changes.map((change, idx) => (
                  <li className="pb-1" key={idx}>
                    {change}
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <Link to="/changelog">&gt;&gt; Full changes history</Link>
              </div>
            </div>

            <div className="pb-4">
              <Title>RELATED PROJECTS</Title>
              <div className="py-2">
                <a href="https://amaranth.vtes.co.nz/">
                  <b>Amaranth</b>
                </a>
                <br />
                Online card search and deck-building tool
              </div>

              <div className="py-2">
                <a href="https://vtesdecks.com/">
                  <b>VTES Decks</b>
                </a>
                <br />
                Online deck builder and TWD browser
              </div>

              <div className="py-2">
                <a href="https://codex-of-the-damned.org/">
                  <b>Codex of the Damned</b>
                </a>
                <br />
                Strategy portal
              </div>

              <div className="py-2">
                <a href="https://vtes-hook.com/">
                  <b>VTES Hook</b>
                </a>
                <br />
                Events portal
              </div>

              <div className="py-2">
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
              </div>
            </div>

            <div className="pb-4">
              <Title>FOR DEVELOPERS</Title>
              <div className="py-1">
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
              </div>

              <div className="py-1">
                There is amazing KRCG project with useful{' '}
                <a href="https://static.krcg.org/">Static files</a> and{' '}
                <a href="https://api.krcg.org/">Online API</a> to help in
                software development for VTES
              </div>
            </div>

            <div className="pb-4">
              <Title>ACKNOWLEDGMENTS</Title>
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

            <div className="pb-4">
              <Title>DONATIONS</Title>
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
                    <div className="inline font-mono text-sm">
                      {BTC_WALLET}
                    </div>
                  </a>
                  <div
                    className="inline ps-2 with-hover"
                    onClick={() => navigator.clipboard.writeText(BTC_WALLET)}
                  >
                    <ClipboardFill className="inline" viewBox="0 0 18 18" />
                  </div>
                </li>
              </ul>
            </div>

            <div className="pb-4">
              <Title>CONTACTS</Title>
              <ul className="no-bullets">
                <li className="pb-1">
                  <div className="flex items-center">
                    <div className="icon pe-2">
                      <Globe2 />
                    </div>
                    <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78924-vdb-online-card-search-deck-building-tool">
                      VEKN forum
                    </a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="flex items-center">
                    <div className="icon pe-2">
                      <Github />
                    </div>
                    <a href="https://github.com/smeea/vdb">
                      github.com/smeea/vdb
                    </a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="flex items-center">
                    <div className="icon pe-2">
                      <EnvelopeFill />
                    </div>
                    <a href="mailto:smeea@riseup.net">smeea@riseup.net</a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="flex items-center">
                    <div className="icon pe-2">
                      <Telegram />
                    </div>
                    <a href="https://t.me/smeea">@smeea</a>
                  </div>
                </li>
                <li className="pb-1">
                  <div className="flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default About;
