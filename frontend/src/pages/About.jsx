import React from 'react';
import { Link } from 'react-router-dom';
import Telegram from '@/assets/images/icons/telegram.svg';
import Github from '@/assets/images/icons/github.svg';
import Discord from '@/assets/images/icons/discord.svg';
import EnvelopeFill from '@/assets/images/icons/envelope-fill.svg';
import Globe2 from '@/assets/images/icons/globe2.svg';
import ClipboardFill from '@/assets/images/icons/clipboard-fill.svg';
import { Banner } from '@/components';
import lastChange from '@/LAST_CHANGE.json';

const Title = ({ children }) => {
  return (
    <div className="text-xl font-bold  text-fgSecondary underline dark:text-fgSecondaryDark">
      {children}
    </div>
  );
};

const About = () => {
  const BTC_WALLET = 'bc1qcj6zs57xskca9cua2lj5la6l2yz368j0wxdeap';

  return (
    <div className="about-container mx-auto">
      <div className="space-y-6">
        <Banner />
        <div className="space-y-4">
          <div>
            <Title>WHAT IS IT</Title>
            <div>
              VDB is online card search, TWD (tournament winning decks) browser,
              deck building and inventory (collection) management tool for
              Vampire the Eternal Struggle (VTES)
            </div>
          </div>

          <div>
            <Title>QUICKSTART</Title>
            <div>
              <ul className="space-y-2">
                <li>
                  <Link to="/crypt">Search crypt cards</Link>
                </li>
                <li>
                  <Link to="/library">Search library cards</Link>
                </li>
                <li>
                  <Link to="/decks">Create your decks</Link>
                </li>
                <li>
                  <Link to="/inventory">Manage your inventory</Link>
                </li>
                <li>
                  <Link to="/twd">Search Tournament-Winning Decks</Link>
                </li>
                <li>
                  <Link to="/pda">Search Public Deck Archive</Link>
                </li>
                <li>
                  <Link to="/cards">Quick search card by name</Link>
                </li>
                <li>
                  <Link to="/documentation">Documentation / Help</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-1">
            <Title>TROUBLESHOOTING</Title>
            <div>
              If you experience problems like white screen or strange behavior,
              reload page (Ctrl+F5 on Windows/Linux or Command+Shift+R on MacOS)
            </div>
            <div>If this does not help, please contact me (see below)</div>
          </div>

          <div className="space-y-1">
            <Title>VERSION</Title>
            <div>
              Card text based on{' '}
              <a href="https://www.vekn.net/card-lists">VEKN official list</a>:{' '}
              <span className="whitespace-nowrap">2022-11-14</span>
            </div>
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Last update [{lastChange.version}]:
            </div>
            <ul className="space-y-1">
              {lastChange.changes.map((change, idx) => (
                <li key={idx}>{change}</li>
              ))}
            </ul>
            <div>
              <Link to="/changelog">&gt;&gt; Full changes history</Link>
            </div>
          </div>

          <div className="space-y-2">
            <Title>RELATED PROJECTS</Title>
            <div>
              <a href="https://amaranth.vtes.co.nz/">
                <b>Amaranth</b>
              </a>
              <br />
              Online card search and deck-building tool
            </div>

            <div>
              <a href="https://vtesdecks.com/">
                <b>VTES Decks</b>
              </a>
              <br />
              Online deck builder and TWD browser
            </div>

            <div>
              <a href="https://codex-of-the-damned.org/">
                <b>Codex of the Damned</b>
              </a>
              <br />
              Strategy portal
            </div>

            <div>
              <a href="https://vtes-hook.com/">
                <b>VTES Hook</b>
              </a>
              <br />
              Events portal
            </div>

            <div>
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

          <div className="space-y-1">
            <Title>FOR DEVELOPERS</Title>
            <div>
              Development happens in{' '}
              <a href="https://github.com/smeea/vdb">this Github repository</a>
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

            <div>
              There is amazing KRCG project with useful{' '}
              <a href="https://static.krcg.org/">Static files</a> and{' '}
              <a href="https://api.krcg.org/">Online API</a> to help in software
              development for VTES
            </div>
          </div>

          <div className="space-y-1">
            <Title>ACKNOWLEDGMENTS</Title>
            <ul className="space-y-1">
              <li>Card images by Fernando &quot;Sydnelson&quot; Cesar</li>
              <li>
                Rulings archive by Lionel &quot;Phoenix&quot; Panhaleux from{' '}
                <a href="https://static.krcg.org/">KRCG</a>
              </li>
              <li>TWD archive by Vincent &quot;Ankha&quot; Ripoll</li>
              <li>
                Cards scans from different sets by{' '}
                <a href="http://vtes.pl/">VTES.PL</a> and{' '}
                <a href="https://ccggamez.com">CCGAMEZ.COM</a>
              </li>
              <li>
                Andrey &quot;Vaughnad&quot; Davino for multiple development
                contributions
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <Title>DONATIONS</Title>
            <ul className="list-none space-y-2 p-0">
              <li className="p-0">
                Patreon:{' '}
                <a href="https://www.patreon.com/smeea">
                  www.patreon.com/smeea
                </a>
              </li>
              <li className="p-0">
                Bitcoin (BTC):{' '}
                <a
                  href={`https://www.blockchain.com/btc/address/${BTC_WALLET}`}
                >
                  <div className="inline font-mono text-sm">{BTC_WALLET}</div>
                </a>
                <div
                  className="inline pl-1 text-fgSecondary hover:text-fgPrimary dark:text-fgSecondaryDark dark:hover:text-fgPrimaryDark"
                  onClick={() => navigator.clipboard.writeText(BTC_WALLET)}
                >
                  <ClipboardFill className="inline" viewBox="0 0 18 18" />
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-1">
            <Title>CONTACTS</Title>
            <ul className="list-none space-y-1 p-0">
              <li className="p-0">
                <div className="flex items-center space-x-1">
                  <div className="text-fgThird dark:text-fgThirdDark">
                    <Globe2 />
                  </div>
                  <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78924-vdb-online-card-search-deck-building-tool">
                    VEKN forum
                  </a>
                </div>
              </li>
              <li className="p-0">
                <div className="flex items-center space-x-1">
                  <div className="text-fgThird dark:text-fgThirdDark">
                    <Github />
                  </div>
                  <a href="https://github.com/smeea/vdb">
                    github.com/smeea/vdb
                  </a>
                </div>
              </li>
              <li className="p-0">
                <div className="flex items-center space-x-1">
                  <div className="text-fgThird dark:text-fgThirdDark">
                    <EnvelopeFill />
                  </div>
                  <a href="mailto:smeea@riseup.net">smeea@riseup.net</a>
                </div>
              </li>
              <li className="p-0">
                <div className="flex items-center space-x-1">
                  <div className="text-fgThird dark:text-fgThirdDark">
                    <Telegram />
                  </div>
                  <a href="https://t.me/smeea">@smeea</a>
                </div>
              </li>
              <li className="p-0">
                <div className="flex items-center space-x-1">
                  <div className="text-fgThird dark:text-fgThirdDark">
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
  );
};

export default About;
