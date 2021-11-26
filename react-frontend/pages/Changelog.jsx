import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Banner from './components/Banner.jsx';

function Changelog(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={5} className="px-0">
          <Banner />
          <div className="px-2 pt-2">
            <h5>CHANGELOG</h5>

            <h6>2021-11-23</h6>
            <ul>
              <li>Added &quot;Or Older&quot; filter option for Set search</li>
              <li>
                Fixed Import/Export for new multigroup vampires (Victoria Ash,
                etc). Will append &quot;(GX)&quot; after name, confirmed to be
                implemented same way in Lackey
              </li>
              <li>Many other small fixes (mainly UI)</li>
            </ul>

            <h6>2021-11-13</h6>
            <ul>
              <li>
                Reworked Inventory page with significant performance improvement
                (most noticeable on BIG inventories) for both rendering and
                Import
              </li>
              <li>Small other fixes/improvements</li>
            </ul>

            <h6>2021-11-06</h6>
            <ul>
              <li>
                Update card base to 2021-10-27 (no new precons yet, just Promos
                and Ravnos/Chimersty POD reprints). New crypt
                &quot;revival&quot; cards with different groups are not yet
                working correctly with import/export, it will be fixed later Add
                &quot;negative&quot; option to some crypt/library filters (logic
                options are OR &quot;//&quot;, AND &quot;&&quot; and NOT
                &quot;!&quot; or just OR/NOT depending on filter). THIS IS
                BREAKING CHANGE FOR OLD SEARCH URLs working with this filters,
                please update them if you shared it publicly and expect to
                continue to work. I dont like to break things, but sometimes
                it&apos;s necessary
              </li>
              <li>Make &quot;See ADV/Base&quot; clickable in card popup</li>
              <li>Fix library search sort by discipline</li>
              <li>
                Fix library search cards with &le;0 pool or blood cost not
                showing no-cost cards
              </li>
              <li>
                Fix removing cards from TWD search by cards Fix Inventory-Mode
                for Deck Compare
              </li>
            </ul>

            <h6>2021-10-29</h6>
            <ul>
              Add buttons to Deck Compare page: Show missing cards in popup
              window Proxy missing cards Back to Decks Copy URL to compare
              (simple way to share your ideas of how to improve friend&apos;s
              deck: clone his deck into your account, change it as you like,
              compare both and share compare url with friend).
              <li>
                Added &le; (less-or-equal) and = (equal) options for TWD search
                by Crypt and Library cards
              </li>
              <li>Add inventory import from FELDB (.csv format).</li>
            </ul>

            <h6>2021-10-26</h6>
            <ul>
              <li>
                Add Deck Compare feature (can choose from your decks, precons or
                any other shared or TWD deck by URL or ID)
              </li>
              <li>Show banned year</li>
              <li> Small fixes</li>
            </ul>

            <h6>2021-10-20</h6>
            <ul>
              <li>
                Added Hide deck option (&quot;bulb&quot; button in advanced deck
                selection, the &quot;binoculars&quot; button) which hides the
                deck from main deck selector. Can be useful to
                &quot;archive&quot; the decks and simplify navigation between
                active decks.
              </li>
              <li>Added By-Group and By-Name sorting for crypt in Deck</li>
              <li>
                Added multi-set and multi-setprecon search in Crypt and Library
              </li>
              <li>
                Added By-Clan stats in library summary info for Deck ( (i)
                button), added none-discipline/clan category and calculation of
                % are done now agains library total excluding masters
              </li>
              <li>
                Search TWD by In-Inventory match supplied with additional option
                of rescale to 75 cards
              </li>
              <li>Rulings opens in separate browser tab on click by default</li>
              <li>Many small UI improvements and fixes</li>
            </ul>

            <h6>2021-10-12</h6>
            <ul>
              <li>Updated TWDA</li>
              <li>
                Fixed sorting of multi-types and multi-disciplines to alphabet
                order (e.g. it is always Action/Combat and not Combat/Action and
                same for disciplines, regardless of Basic/Superior)
              </li>
              <li>
                Account names are now case-insensitive (both for new and old
                accounts)
              </li>
              <li>Small other UI fixes</li>
            </ul>

            <h6>2021-10-09</h6>
            <ul>
              <li>Add set selection for Proxy (with original scans)</li>
              <li>
                Add card scans (Kickstarter Unleashed, KoT and HttB reprints)
              </li>
              <li>Fix tag remove in advanced deck selection window</li>
              <li>
                Fix deck author in exported decks. Thanks to Karl Schaefer
              </li>
              <li>Many small UI fixes</li>
            </ul>

            <h6>2021-10-05</h6>
            <ul>
              <li>
                Nothing &quot;new&quot;, just many tiny UI improvements (under
                the hood they are not that small, so please report
                problems/glitches/etc they are expected) and some bugfixes (also
                rulings update)
              </li>
            </ul>

            <h6>2021-09-23</h6>
            <ul>
              <li>
                Add clan filter for Deck Selection window (&quot;goggles&quot;
                icon)
              </li>
              <li>Add draw chances in open hand for card-types in library</li>
              <li>Add &quot;Missing Cards&quot; window for Inventory</li>
              <li>
                Add import from Lackey .dek format (I don&apos;t use Lackey so
                cannot extensively test it, please report bugs if you find it)
              </li>
              <li>Moved Navigation bar to bottom on mobile</li>
              <li>
                Move inventory-mode switch to burger menu in Navigation bar on
                mobile
              </li>
            </ul>

            <h6>2021-09-21</h6>
            <ul>
              <li>
                Improved Inventory quantity calculation (shows Total+Unique and
                Missing+Unique) consistently regardless of chosen filter (All /
                Owned / Problem).
              </li>
              <li>
                Add Discipline summary in Deck library info. Thanks to Igor
                Beslin for proposal!
              </li>
              <li>
                Improved internal URL-ing between tabs, going back-forward with
                browser methods will be better (still not perfect, though).
              </li>
              <li>
                Crypt search for Title trait will show vampires with relevant
                title while merged. For other traits no changes (title is
                visible in result line and other traits requires reading card,
                so will be too confusing to clarify who have trait in-built and
                who needs merge). Thanks to Hobbesgoblin for proposal!
              </li>
              <li>Small other fixes</li>
            </ul>

            <h6>2021-09-16</h6>
            <ul>
              <li>
                Add tags info into main deck window long-awaited necessary
                feature, I apologize for delaying with it
              </li>
              <li>Add deck/intentory export to Excel format (.xslx)</li>
              <li>
                Export to CSV format changed into &quot;Quantity,Card ID&quot;
                (ID&apos;s according to VEKN CSV cardbase) will be more
                convenient for any kind of automation (Card ID is much more
                reliable than name), and end-users with spreadsheets should be
                satisfied with Excel
              </li>
              <li>
                Export All decks now returns zip-archive with all files to
                simplify saving (also with timestamp, so your &quot;MY BEST
                DECKS FOR PROGENY&quot; folder is now easier to manage). Now
                only for text formats (lackey, twd, etc), but will also support
                CSV, Excel in the future
              </li>
              <li>Small other fixes</li>
            </ul>

            <h6>2021-09-14</h6>
            <ul>
              <li>
                Add chance calculation of drawing X unique crypt cards (click
                (i) button). Was not easy to do it, but totally worth it.
              </li>
              <li>Add banned card indication for TWD and user deck</li>
              <li>
                Improved many popoup (modal) windows on mobile (like advanced
                deck select, import from precon/deck to inventory, etc). They
                are not as detailed as wide desktop windows, but at least
                usable.
              </li>
              <li>Some other fixes (incl. last report by Hobbesgoblin)</li>
            </ul>

            <h6>2021-09-12</h6>
            <ul>
              <li>
                Add Unleased Kickstarter as a Set/Precons (it&apos;s not an
                &quot;official&quot; set, but should be more useful like this)
              </li>
              <li>
                Fix deck crypt discipline layout for decks with many different
                disciplines in crypt (as in bundles or in some decks like
                &quot;Girls will find...&quot;)
              </li>
              <li>Small other fixes</li>
            </ul>

            <h6>2021-09-10</h6>
            <ul>
              <li>Add images of banned reprints (Ashlesha, etc)</li>
              <li>Add clan images to precon filter in crypt/library search</li>
              <li>Save crypt/library sorting to browser local storage</li>
              <li>
                Decrease discipline/clan icons sizes (most notable on mobile)
              </li>
              <li>
                Improved crypt discipline alignment on mobile (should be better
                on wider resultions, but may cause problems on narrower- will
                try to fix it in the future, idk how though)
              </li>
              <li>Other small fixes & improvements</li>
            </ul>

            <h6>2021-09-08</h6>
            <ul>
              <li>
                Add &quot;Advancement&quot; trait for Crypt search, showing all
                Advanced vampires and their Base versions
              </li>
              <li>
                Add reference to/from Base/Adv vampires in detailed card view
                (hover over to see another version)
              </li>
              <li>Save &quot;Add Mode&quot; state to browser local storage</li>
              <li>
                Copy URL buttons grouped in menu and &quot;Immutable URL&quot;
                renamed to &quot;Snapshot URL&quot;
              </li>
              <li>
                Fix draw chances to exclude already &quot;played&quot; cards
                from calculation
              </li>
              <li>Fix &quot;None&quot; Discipline search in Library</li>
              <li>
                Fix removing additional filters of Discipline/Type in Library.
                Thanks to inm8
              </li>
              <li>Many other small fixes & improvements</li>
            </ul>

            <h6>2021-08-30</h6>
            <ul>
              <li>
                Changed colors in light theme. I know theming it&apos;s very
                subjective topic, but I hope you will soon get used to it and
                like it
              </li>
              <li>
                Added AND/OR switch for Type and Discipline search in Library
                when searching with multiple filters. Newly added filter form
                opens by default after you click [+] button.
              </li>
              <li>
                Disciplines in crypt draw are now aligned same as in deck view.
              </li>
              <li>
                Added &apos;Immutable URL&apos; which will gives permanent URL
                for freezed current deck state, which is good when you want to
                freeze the deck and share it, while continue to edit in your
                deck archive (e.g. blog posts, etc). Same purpose as
                Deck-in-URL, but instead of storing everything about the deck in
                URL it just store non-editable deck copy on the server
                (Deck-in-URL is longer, but bulletproof can be
                &quot;decoded&quot; even if VDB is dead, and can be
                &quot;generated&quot; with 3rd-party tools).
              </li>
            </ul>

            <h6>2021-08-21</h6>
            <ul>
              <li>
                Some elements will &quot;stick&quot; during scrolling (like
                crypt in /Deck, library info line in /Deck, side buttons in
                /Crypt and /Inventory, deck change menu in /Crypt and /Library)
              </li>
              <li>
                Add inventory-mode highlight in pdf proxy selection it will show
                RED untill you select quantity required to resolve all inventory
                problems (can require even more copies than in this decks if you
                dont have enough even for other decks).
              </li>
              <li>
                Add button &quot;Add missing in Inventory&quot; to pdf proxy
                selection it will check & set minumum quantity to resolve
                inventory problems for this deck (opposite to color-highlight as
                said above which shows problems for entire deck collection, this
                button will not set quantity for more than required for this
                deck)
              </li>
              <li>Fixed blury capacity/blood/pool cost icons in Chrome</li>
              <li>Another small fixes and improvements</li>
            </ul>

            <h6>2021-08-15</h6>
            <ul>
              <li>Fix inventory used card calculation for fixed decks.</li>
              <li>
                Add deck export to JOL format (deckserver.net/jol/) Add
                deck/inventory export to CSV format (MS Excel, etc)
              </li>
              <li>Add total controlled capacity for crypt in deck draw</li>
              <li>
                Add initial transfers in deck draw (valid for 5 players with
                double chance of having 4 transfers)
              </li>
              <li>Add deck crypt sort by capacity</li>
              <li>
                Add button to add cards to active deck from quick card search
                (&quot;lightning&quot; icon /cards),
              </li>
              <li>Small other fixes</li>
            </ul>

            <h6>2021-08-12</h6>
            <ul>
              <li>Fix deck and inventory export</li>
              <li>
                Fix library search sect filter Fix crash in deck draw after
                burning card when library is empty Update cards to 2021-08-04
                and rulings to 2021-07-22
              </li>
            </ul>

            <h6>2021-07-21</h6>
            <ul>
              <li>Updated card base to 2020-07-19 (kickstarted update)</li>
              <li>
                Updated TWD base to 2021-05-16 (last TWD in the archive at the
                moment) Added clear button for Player and Location in TWD
              </li>
              <li>
                Added Capacity filter to Library search. It only refer to
                requirement of who can play card (written in bold on top), not
                restriction of target. Added &quot;Or newer&quot; checkbox for
                Set search in Crypt/Library (will show all cards in this Set or
                Newer, excluding Promo/Print-on-Demand)
              </li>
              <li>
                Added &quot;No requirements&quot; trait to Library, which will
                show cards with no requirements (sect / clan / title / capacity
                / black hand / seraph etc). Please not that &quot;require a
                vampire&quot; is requirement
              </li>
              <li>
                Fixed inventory card quantity not in-sync between main list and
                add-one-card &quot;list&quot;
              </li>
              <li>
                Fixed Crypt/Library &quot;Search in Inventory&quot; to correctly
                count total for Inventory cards and not require to click &quot;V
                FOUND XX&quot; if your Inventory results are smaller than
                standards results threshold (300 pcs) regardless of overall
                results (from all cards)
              </li>
              <li>
                Limited width of card popup in text layout (were too wide
                sometimes) Added saving of inventory-mode and image/text popup
                to browser storage (will not be lost after reloading)
              </li>
              <li>
                Added auto-search when opening url with search query in TWD
              </li>
              <li>
                Fixed auto-search when opening url with search query on mobile
                in Library
              </li>
              <li>
                Fixed deck name taking too much width of advanced deck select
                window (&quot;binoculars&quot; button)
              </li>
              <li>
                Fixed empty image when switching between cards with selected old
                (scanned) image in detailed card view with arrows ({'< & >'})
              </li>
              <li>Fixed several crashes</li>
            </ul>

            <h6>2021-07-17</h6>
            <ul>
              <li>Add reduce hand size button to Deck Draw</li>
              <li>
                Auto-open results on Mobile if you open url with search query
                (previously it just sets filters and you need to manually click
                &quot;V&quot; button)
              </li>
              <li>
                Advanced deck select window Name filter will ignore accents
                (will return decks with &quot;á&quot; if you type &quot;a&quot;)
              </li>
              <li>
                Advanced deck select window Name filter now also looks for card
                names in decks (e.g. &quot;arika&quot; will return both decks
                with &quot;arika&quot; in name, and decks containing
                &quot;arika&quot; in card name)
              </li>
              <li>
                Fix bug with some inventory-mode icons being almost invisible
                due to too low opacity
              </li>
              <li>
                Fix Hide Missing in Inventory checkbox not working
                (crypt/library search through inventory works again!)
              </li>
            </ul>

            <h6>2021-07-09</h6>
            <ul>
              <li>Show blood/pool cost of ash heap in draw</li>
              <li>Add1 hand size for crypt/library in draw</li>
              <li>Autoswitch to newly imported deck</li>
              <li>
                After opening TWD deck deck selection category to be defaulted
                as &quot;my&quot; instead of &quot;precons&quot;
              </li>
              <li>
                Mobile burger menu (top-left corner) to hide after any option
                selected
              </li>
            </ul>

            <h6>2021-07-05</h6>
            <ul>
              <li>
                Add multiple selections for clan, sect, types, title filters in
                Crypt and Library. Now work as &quot;OR&quot;, maybe one day
                will be OR/AND toggle
              </li>
              <li>Add not-in-twd filter for Crypt and Library</li>
              <li>
                Add &quot;show random card&quot; buttons to Cards (quick card
                ⚡)
              </li>
              <li>
                Add titled and non-titled options for title filter in Library
              </li>
              <li>Small fixes</li>
            </ul>

            <h6>2021-06-20</h6>
            <ul>
              <li>Added inventory import from preconstructed decks</li>
              <li>
                Inventory import from deck/precon buttons now show if it&apos;s
                already in inventory (and delete button disabled if you
                don&apos;t have it). Keep in mind you can still add deck/precon
                two+ times, which will double+ quantity.
              </li>
              <li>
                Added twd search by exclusions of crypt/library cards (set
                quantity to 0 and it will only look for decks without this card)
              </li>
              <li>
                Fixed promo dates for cards being promo for more than 1 time
                (previously only recent promo date was shown)
              </li>
              <li>
                Fixed important bug with revisions which resulted in decks being
                broken for some users. It should be fixed now with everything
                restored, but if you lost something important let me know and
                I&apos;ll try to help.
              </li>
              <li>Other small fixes</li>
            </ul>

            <h6>2021-06-12</h6>
            <ul>
              <li>
                Restyled deck preview in advanced deck select window (popup deck
                is downscaled, don&apos;t show buttons, triggered by hover on
                smaller icon)
              </li>
              <li>
                Default deck revision is updated to last edited revision
                Improved add deck to inventory window (in the spirit of advanced
                deck select). In the future it will be even better, I know there
                are many things to improve
              </li>
              <li>
                Fix add new card to inventory to show card quantity (was broken
                in one of recent updates)
              </li>
              <li>
                Fix add card to deck which is in side-crypt/library to actually
                add it with quantity to 1 (instead of not doing anything)
              </li>
              <li>Some other fixes</li>
            </ul>

            <h6>2021-06-06</h6>
            <ul>
              <li>Added library pool/blood cost. Thanks to Karl Schaefer</li>
              <li>
                Added inventory-type icons (clickable to change inventroy type)
                for decks in advanced deck select window
              </li>
              <li>
                Add &quot;non-titled&quot; title checkbox to crypt search form
                (basically works same as &quot;votes: none&quot; form, but
                should improve usability). Keep in mind that title checkboxes
                are cummulative (different from &quot;traits&quot; checkboxes it
                will match if any title from checkbox matches)
              </li>
              <li>Fix inventory mode for crypt/library search</li>
              <li>Some other interface fixes</li>
            </ul>

            <h6>2021-05-29</h6>
            <ul>
              <li>
                Added advanced deck selection window (click binoculars icon near
                deck select form)
              </li>
              <li>
                Added deck tags feature (for now available only in advanced deck
                selection window, will be add somewhere in main deck window
                later). To add new tag click on an empty area between decks &
                buttons (not really obvious, but will keep interface clean).
              </li>
              <li>
                Added traits to search: Wake/Unlock, Burn Improved proxy pdf
                layout (smaller gap between cards, gap is filled with gray
                please let me know if it&apos;s too dark and not visible on
                paper)
              </li>
              <li>Bug fixes</li>
            </ul>

            <h6>2021-05-16</h6>
            <ul>
              <li>
                References to other cards in card text and rulings (see Lost in
                Crowds, Mata Hari) now show card popup on mouse hover
              </li>
              <li>
                Added pdf sets (Danse Macabre, etc) card images. For those who
                missed this feature: click on Set name in card window change
                image to card scan for this set, with old text/image.
              </li>
              <li>
                Changed some trait search to show more cards (some cards will be
                not really what you are looking for but false positives are
                probably better than excluded good card). See Igor Beslin
                comment below.
              </li>
              <li>
                In card window you can use left/right arrows (on keyboard) and
                left/right swipes (on mobile) to switch cards. And for those who
                missed: you can click on card image (both on desktop/mobile) to
                close card window (no need to click outside of popup window).
              </li>
              <li>
                Slightly updated dark color scheme (main change: disciplines now
                have small border to improve visibility).
              </li>
              <li>Other bug fixes</li>
            </ul>

            <h6>2021-05-12</h6>
            <ul>
              <li>
                Improved screen resolution responsiveness (should be much better
                on smaller resolutions like tablets)
              </li>
              <li>
                Increased search result treshold to 300 cards to auto-show
                (without click on &quot;Found XXX&quot; button)
              </li>
              <li>
                Vampire title is shown on card line. Thanks to Beslin Igor for
                suggestion
              </li>
              <li>
                Removed &apos;used in...&apos; column in Inventory Mode from
                crypt/library results. Inventory quantity is still shown and you
                can hover on it to see details (also available in card window)
              </li>
              <li>Slightly updated color theme</li>
              <li>
                Slightly increased performance of switching between pages
                (Crypt/Library/etc) with active results
              </li>
              <li>
                Text search (card name/text) now is not lost during page
                switching
              </li>
              <li>
                &quot;Played/Burned&quot; cards in Deck Draw now clickable to
                open standard card window (click action on cards in hand is
                still replaced with &quot;play&quot; action)
              </li>
            </ul>

            <h6>2021-04-23</h6>
            <ul>
              <li>
                Added card localization (you can switch prefered card language
                and it change card text/name if translation exists). Now it only
                contains Spanish and French official localization (i.e. cards
                published since 2019) and some images are missing. Search for
                card text/name is still looks for English name/text (it will be
                so until all cards are translated for a given localization).
              </li>
              <li>
                Performance improvement for Inventory (it&apos;s still not
                perfect with hundreds of unique though)
              </li>
              <li>Other tiny changes</li>
            </ul>

            <h6>2021-04-16</h6>
            <ul>
              <li>Dark theme, finally! (switch is in top-left corner)</li>
              <li>
                Detailed Set/Precon information in Card window (hover mouse over
                set/precon info)
              </li>
              <li>
                Improved Set/Precon search with &apos;First Print&apos; and
                &apos;Only In&apos; options (previously was inaccurate with
                KoT/HttB Reprints)
              </li>
              <li>Fixed card quantity in several precons</li>
            </ul>

            <h6>2021-04-09</h6>
            <ul>
              <li>
                Added TWD search for decks matching your Inventory. Thanks to
                Vincent Ripoll for proposal! Please note you must first turn on
                inventory-mode then do the searches switch will not affect
                already shown decks yet. The &apos;scale to 60 cards&apos;
                checkbox will add to result decks your inventory is enough for
                after trimming library proportionally to 60 cards
              </li>
              <li>Added Inventory import</li>
              <li>
                Improved Inventory/Deck export performance and quanlity (also
                some export bugs fixed) Added inventory-mode in TWD (highlight
                cards you don&apos;t have, etc same as in Decks/Crypt/Library)
              </li>
              <li>Fixed inventory-mode in Decks on Mobile</li>
              <li>
                Significantly improved TWD search for Monoclan and Star decks
              </li>
              <li>Other minor fixes / improvements</li>
            </ul>

            <h6>2021-04-04</h6>
            <ul>
              <li>
                Added buttons to next/previous cards in card preview window (now
                it&apos;s only goes through crypt or library, will be improved
                later for transition after last crypt card to library)
              </li>
              <li>
                Improved TWD discipline search to respect crypt disciplines (now
                it does not include multi-disciplined cards disciplines if no
                crypt vampire can play it; it may misbehave with decks purely
                relying on master:disciplines or other non-standard ways of
                playing discipline cards, but this is too corner case compared
                to multi-disciplined cards)
              </li>
              <li>
                Added all cards draw chances for starting hand click on (i)
                button on top of crypt/library Added exact word search option to
                Crypt/Library search with double-quotes (e.g. search for
                &quot;controlled&quot; will not match cards with uncontrolled in
                text)
              </li>
              <li>
                Add-card-to-deck button in Crypt/Library search allows
                multiclicks now to increase quantity
              </li>
              Other small fixes/improvements
            </ul>

            <h6>2021-03-28</h6>
            <ul>
              <li>
                URL now store search query for Crypt/Library/TWD searches and
                you can easily share it
              </li>
              <li>
                Added /documentation section (link in About) with some
                description. Please, let me know if something is not clear or
                missing and I will update
              </li>
              <li>Updated card text to latest 2021-03-24</li>
              <li>Updated twds</li>
              <li>Other small fixes / improvements</li>
            </ul>

            <h6>2021-03-20</h6>
            <ul>
              <li>
                Deck-ID now attaches to url in url bar (same url as you got
                after clicking &apos;Copy URL&apos; button, so all old links
                must continue to work and existing url in url bar is shareable
                now)
              </li>
              <li>
                Card scans from different sets done by vtes.pl team. Click on
                the Set name in card detailed popup window (yeah, I know
                it&apos;s barely discoverable, so consider it hidden feature for
                now, later I&apos;ll improve it)
              </li>
              <li>Added clan icons for Precon deck selector</li>
              <li>
                Deck select (for My and Precon decks) now support live text
                filter (same as for Clan in Crypt/Library search)
              </li>
              <li>Revision name now attaches to Deck name for Export</li>
              <li>
                Fixed Crypt/Library search not showing cards matching text after
                toggling off other filters
              </li>
              <li>
                Fixed Deck Draw bug (incorrect message preventing from redraw)
              </li>
              <li>Other minor fixes/improvements I forgot about? Who knows.</li>
            </ul>

            <h6>2021-03-14</h6>
            <ul>
              <li>
                Deck draw now let &apos;play&apos; cards by clicking on them
                (instead of card view)
              </li>
              <li>Much faster TWD clan search</li>
              <li>
                Forms in Add New Card (/decks) and Quick card search (/cards)
                now also search by initials i.e. new words can start from part
                of given string. Thanks to Vincent Ripoll. Examples: Following
                searches will match &apos;Govern the Unaligned&apos;: gtu gtuna
                theunal Following searches will not match &apos;Govern the
                Unaligned&apos;: gtd galigned thealigned
              </li>
              <li>
                Add-Mode switch removed from Navbar, but instead Add-Mode follow
                show/hide deck in Crypt and Library search (eye-icon next to
                deck name)
              </li>
              <li>Improvements in floating buttons on mobile</li>
              <li>
                Fixed Lackey export bug for cards with &apos;-&apos; in name
                (AK-47, Hell-for-Leather, etc)
              </li>
              <li>Fixed exports for Deck-In-Url</li>
              <li>Other tiny fixes</li>
            </ul>

            <h6>2021-03-06</h6>
            <ul>
              <li>Added new feature deck revisions</li>
              <li>
                Added rulings from krcg (many more rulings with links to
                origin). Many thanks to Lionel Panhaleux who is doing great job
                maintaining rulings archive
              </li>
              <li>Card text updated to 2021-03-06</li>
              <li>TWD decks updated</li>
              <li>Many bug fixes</li>
            </ul>

            <h6>2021-02-28</h6>
            <ul>
              <li>
                Added quick card view page (vdb.smeea.casa/cards) where you can
                quick check the card by it&apos;s name.
              </li>
              <li>
                Show all search results in Crypt/Library in Inventory-mode, but
                added option to hide results not in inventory
              </li>
              <li>
                Improved search by Precons (there is still some issues with
                First Print / Only In searches for reprinted bundles (HttB, KoT
                and Anthlogy))
              </li>
              <li>
                Improved TWD Capacity search speed and it uses 4 brackets (like
                for Groups). Anarch Convert is excluded from Capacity
                calculation.
              </li>
              <li>Fixed Inventory &apos;Show only problem cards&apos; bug</li>
              <li>Fixed Lackey export</li>
              <li>Small other barely noticable fixes/improvements</li>
            </ul>

            <h6>2021-02-23</h6>
            <ul>
              <li>Added TWD search by library size</li>
              <li>
                Updated TWD search by-card-type forms (added &apos;none&apos;,
                slightly changed ranges) Greatly increased TWD by-card-type
                search speed (finally, it is usable lol)
              </li>
              <li>Fix library cards clan search for double-clan</li>
            </ul>

            <h6>2021-02-22</h6>
            <ul>
              <li>
                Updated Deck page layout (more vertical space for Crypt/Library)
              </li>
              <li>
                Updated TWD search results to show capacity/clan for crypt and
                discipline/clan for library cards
              </li>
              <li>Added Preconstructed decks to Deck page to choose from</li>
              <li>
                Inventory mode for not-your-decks opened in Deck page (i.e. for
                TWD / shared by URL / Preconstructed): Highlights in red cards
                you don&apos;t have enough in Inventory; Highlights in yellow
                cards you have in total, but it will require to take it from one
                of &apos;fixed&apos; decks; No highlight if you have it
                available
              </li>
              <li>
                Button to show missing in inventory cards for the deck in Deck
                page. It respects deck/card inventory status (Flexible or Fixed)
                and for Virtual (@) decks and any not-yours (twd / precon /
                shared by url) it calculate as it&apos;s Flexible (i.e. allowing
                to re-use cards from other Flexible decks but NOT from Fixed)
              </li>
              <li>
                Proxy button allow to print only missing cards (same with
                inventory status as above)
              </li>
              <li>
                Card quantity manual enter (click on card quantity) in addition
                to [+]/[-] buttons
              </li>
              <li>
                Inventory page option to choose what to show: All (cards you
                have + cards you need) Only owned cards Only cards you have
                problem with (first column is still quantity you have, not
                &apos;required&apos;)
              </li>
              <li>
                Additional &apos;Copy Deck-In-URL&apos; button which
                &apos;encode&apos; the deck to url. Why? Because standard Copy
                URL works as a &apos;pointer&apos; to the deck in the
                author&apos;s deck archive it follows the changes (and
                deletion!) and even though it&apos;s OK most of the time (and
                maybe even desired), you may want to &apos;freeze&apos; it to be
                sure the one following the link will ALWAYS see the deck in the
                state it was during URL creation. Technical details: this link
                contain all VDB need to render the deck (in the format
                ...?name=NAME&author=AUTHOR&description=DESCRIPTION#ID=QUANTITY;ID2=...
                where ID is card ID from official VEKN card list). So this
                &apos;deck-in-urls&apos; does not exist (and does not require to
                ever be created) on the VDB server and may be easily generated
                by anyone (e.g. by third-party software as quick way to show the
                deck using VDB rendering) as well as decoded even when VDB will
                stop to work it will be easy to restore the deck from the url
              </li>
              <li>
                Crypt searches shows avg. capacity for each group in Total line
              </li>
              <li>Card text updated to VEKN changes dated 21-01-2021</li>
              <li>
                Added Maleficia, Striga and Flight to discipline filter in
                Library search Crypt/Library search page is more centered now
                for unlogged users; Fixed bug with non-ASCII letters for card
                search and export to Lackey
              </li>
              <li>Fixed bug with Advanced vampire proxy generation</li>
              <li>
                Fixed bug with Amaranth deck import by URL Fixed bug with card
                modal preview in Decks/Crypt/Library with inventory-mode
              </li>
            </ul>

            <h6>2021-02-13</h6>
            <ul>
              <li>Added Inventory Mode</li>
            </ul>

            <h6>2021-01-24</h6>
            <ul>
              <li>Added card preview on card click</li>
              <li>Added probability calculations in Deck Draw</li>
            </ul>

            <h6>2020-12-25</h6>
            <ul>
              <li>Added TWD browser</li>
            </ul>

            <h6>2020-12-03</h6>
            <ul>
              <li>First release</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Changelog;
