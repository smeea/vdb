import Discord from "@icons/discord.svg?react";
import EnvelopeFill from "@icons/envelope-fill.svg?react";
import Github from "@icons/github.svg?react";
import Globe2 from "@icons/globe2.svg?react";
import Telegram from "@icons/telegram.svg?react";
import { Link } from "react-router";
import { Banner, Btc, ConditionalTooltipOrModal, TextWithLinks, Title } from "@/components";
import lastChange from "@/LAST_CHANGE.json";

const ContactLi = ({ icon, children }) => {
  return (
    <li className="flex gap-2.5 px-0.5">
      <div className="flex items-center text-fgThird dark:text-fgThirdDark">{icon}</div>
      {children}
    </li>
  );
};

const About = () => {
  return (
    <div className="about-container mx-auto">
      <div className="sm:mb-6">
        <Banner />
      </div>
      <div className="flex flex-col gap-6 max-sm:p-3">
        <div className="flex flex-col gap-1.5">
          <Title>WHAT IS IT</Title>
          <div>
            VDB is online card search, TWD (tournament winning decks) browser, deck building and
            inventory (collection) management tool for Vampire the Eternal Struggle (VTES)
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>QUICKSTART</Title>
          <div>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/crypt">Search Crypt cards</Link>
              </li>
              <li>
                <Link to="/library">Search Library cards</Link>
              </li>
              <li>
                <Link to="/decks">Create Decks</Link>
              </li>
              <li>
                <Link to="/inventory">Manage Inventory</Link>
              </li>
              <li>
                <Link to="/twd">Tournament Winning Decks</Link>
              </li>
              <li>
                <Link to="/tda">Tournament Decks Archive</Link>
              </li>
              <li>
                <Link to="/pda">Public Deck Archive</Link>
              </li>
              <li>
                <Link to="/documentation#limited">Limited Formats (V5, 2-Players, Custom)</Link>
              </li>
              <li>
                <Link to="/cards">Quick search Card by name</Link>
              </li>
              <li>
                <Link to="/documentation">Documentation / Help</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>TROUBLESHOOTING</Title>
          <div>
            If you experience problems like white screen or strange behavior, reload the page
            (Ctrl+F5 on Windows/Linux, Command+Option+R on MacOS, swipe down on mobile). On mobile
            app try to delete it and reinstall from{" "}
            <a href={import.meta.env.VITE_BASE_URL}>{import.meta.env.VITE_BASE_URL}</a>
          </div>
          <div>
            VDB will not work on browsers older than: Chrome 117, Firefox 119, Safari 17.4
          </div>
          <div>If this does not help, please contact me (see below)</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>VERSION</Title>
          <div>
            Card text based on <a href="https:www.vekn.net/card-lists">VEKN official card list</a>
          </div>
          <div className="flex flex-col gap-1.5 py-2">
            <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              Last update [{lastChange.version}]:
            </div>
            <ul className="flex flex-col gap-1.5">
              {lastChange.changes.map((change, idx) => (
                <li key={idx}>
                  <TextWithLinks>{change}</TextWithLinks>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/changelog">&gt;&gt; Full changes history</Link>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>RELATED PROJECTS</Title>
          <div className="flex flex-col gap-2.5">
            <div>
              <a href="https://amaranth.vtes.co.nz/">
                <b>Amaranth</b>
              </a>
              <div>Online card search and deck-building tool</div>
            </div>

            <div>
              <a href="https://vtesdecks.com/">
                <b>VTES Decks</b>
              </a>
              <div>Online deck builder and TWD browser</div>
            </div>

            <div>
              <a href="https://codex-of-the-damned.org/">
                <b>Codex of the Damned</b>
              </a>
              <div>Strategy portal</div>
            </div>

            <div>
              <a href="https://vtes-hook.com/">
                <b>VTES Hook</b>
              </a>
              <div>Events portal</div>
            </div>

            <div>
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                <b>There are more!</b>
              </a>
              <div>
                Check{" "}
                <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs">
                  VEKN forum
                </a>{" "}
                for more tools
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>FOR DEVELOPERS</Title>
          <div>
            Development happens in <a href="https://github.com/smeea/vdb">this Github repository</a>
          </div>
          <div>
            Source code of the site is available under free{" "}
            <a href="https://en.wikipedia.org/wiki/MIT_License">MIT license</a>
          </div>
          <div>
            Card images & icons are copyrighted by{" "}
            <a href="https://www.paradoxinteractive.com/">Paradox Interactive AB</a>
          </div>
          <div>
            There is amazing KRCG project with useful{" "}
            <a href="https://static.krcg.org/">Static files</a> and{" "}
            <a href="https://api.krcg.org/">Online API</a> to help in software development for VTES
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>ACKNOWLEDGMENTS</Title>
          <div>
            This site would not be possible without community efforts of many people working on
            different stuff used in VDB:
          </div>
          <ul className="flex flex-col gap-1.5">
            <li>Pre-BCP era card image files generated by Fernando &quot;Sydnelson&quot; Cesar</li>
            <li>
              Cards scans from different sets by <a href="http://vtes.pl/">VTES.PL</a> and{" "}
              <a href="https://ccggamez.com">CCGAMEZ.COM</a>
            </li>
            <li>Legacy cards images by Thiago Sousa</li>
            <li>
              <a href="https://github.com/vtes-biased/vtes-rulings">Rulings database</a> by Lionel
              &quot;Phoenix&quot; Panhaleux
            </li>
            <li>
              <a href="http://www.vekn.fr/decks/twd.htm">TWD archive</a> by Vincent
              &quot;Ankha&quot; Ripoll
            </li>
            <li>
              <a href="https://garourimgazette.wordpress.com/vtes-discussions/vtes-tournament-archive/">
                TDA
              </a>{" "}
              by Petrus "Rune" Makkonen
            </li>
            <li>Andrey &quot;Vaughnad&quot; Davino for multiple development contributions</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>DONATIONS</Title>
          <div className="flex gap-1.5 max-sm:flex-col sm:gap-4">
            <div className="flex gap-1">
              Patreon: <a href="https://patreon.com/smeea">patreon.com/smeea</a>
            </div>
            <ConditionalTooltipOrModal
              title="MacOS/iOS warning"
              overlay={
                <div className="flex flex-col gap-1">
                  <div>
                    Starting from November 2024 Apple will charge extra 30% fee from users who
                    subsribe using Patreon app from App Store (in addition to Patreon fees!).
                  </div>
                  <div>
                    Please subscribe using patreon website in the browser (Chrome, Firefox, Safari,
                    etc) to direct most of your donation money to me.
                  </div>
                  <div>
                    Read more:{" "}
                    <a href="https://news.patreon.com/articles/understanding-apple-requirements-for-patreon">
                      https://news.patreon.com/articles/understanding-apple-requirements-for-patreon
                    </a>
                  </div>
                </div>
              }
            >
              <div className="flex gap-0.5">
                [<div className="flex text-fgThird dark:text-fgThirdDark">MacOS/iOS warning</div>]
              </div>
            </ConditionalTooltipOrModal>
          </div>

          <div className="flex gap-1 max-sm:flex-col">
            Paypal:
            <a href="https://paypal.com/paypalme/smeea">paypal.com/paypalme/smeea</a>
          </div>
          <div className="flex gap-1 max-sm:flex-col">
            Bitcoin (BTC): <Btc />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Title>CONTACTS</Title>
          <ul className="flex list-none flex-col gap-2 px-0">
            <ContactLi icon={<Globe2 />}>
              <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78924-vdb-online-card-search-deck-building-tool">
                VEKN forum
              </a>
            </ContactLi>
            <ContactLi icon={<Github />}>
              <a href="https://github.com/smeea/vdb">github.com/smeea/vdb</a>
            </ContactLi>
            <ContactLi icon={<EnvelopeFill />}>
              <a href="mailto:smeea@riseup.net">smeea@riseup.net</a>
            </ContactLi>
            <ContactLi icon={<Telegram />}>
              <a href="https://t.me/smeea">@smeea</a>
            </ContactLi>
            <ContactLi icon={<Discord />}>
              <a href="https://discord.com/users/264725500226830336">smeea</a>
            </ContactLi>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
