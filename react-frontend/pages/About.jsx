import React from 'react';

function About() {
  return (

    <div className="container main-container row mx-0 py-xl-3 px-0 px-xl-2">

      <div className="col-md-12 col-lg-2 col-xl-2 left-col px-0 px-xl-2">
      </div>

      <div className="col-md-12 col-lg-8 col-xl-8 center-col px-0 px-xl-2">

        <div className="about-version">
          <h5>VERSION</h5>
          <p>Card text based on <a href="http://www.vekn.net/card-lists">vekn.net official list</a>: 2020-04-14.<br />
            Card images by Syndelson <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood">FELD images</a>: 2019-11-11 v2.72</p>
        </div>

        <h5>WHAT IS IT</h5>
        <p>Card search utility for Vampire the Eternal Struggle (VTES) collectible card game.<br />
          It is designed for mobile and desktop resolutions.<br />

        </p>
        <p>Find more about the game:
          <a href="http://www.vekn.net/">Vampire: Elder Kindred Network</a> - official players organization
          <br />
          <a href="http://www.blackchantry.com/">Black Chantry Productions</a> - game publisher
        </p>

        <h5>WHY</h5>
        <p>Because being active VTES player I want to have the tool at my disposal with clean interface and corresponding to my flow in card search.</p>
        <p>There are several great tools around, but I was not completely happy with any of it - this one is not an exception (that is why it is still evolving).</p>

        <h5>NON-OBVIOUS FEATURES</h5>
        <ul>
          <li> Hover cursor over card name to preview card image. </li>
          <li> Click on card name to open card image in separate window. </li>
          <li> Click on other card space to unfold/fold card text. </li>
          <li> Title and Group forms are logic OR, i.e. if you choose <i>Prince, Justicar, G1-G3</i> it will search all Princes and Justicars of Groups 1-3. </li>
          <li> Other search fields are logic AND, i.e. if you choose <i>aus PRE, Ventrue, Capacity less-or-equal 6</i> you will only find Beth Malcolm (6-cap aus FOR PRE Ventrue).</li>
        </ul>

        <h5>TODO</h5>
        <ul>
          <li> Sorting options: by Name, Group, descending Capacity, etc.</li>
          <li> Search parameters preservation. I know it's painful, it <i>will</i> be fixed.</li>
        </ul>

        <h5>RELATED PROJECTS</h5>
        <p><b>Secret Library</b><br />
          Now resting in peace, but probably inspired most of existing projects - this one is not an exception.</p>

        <p><a href="https://amaranth.vtes.co.nz/"><b>Amaranth</b></a><br />
          Great tool with modern design, more features like Deck Building, Card Changes History, Seat Emulator, Quickstart Decks etc. You should definetely check it out!<br />
          This project use many ideas from Amaranth.</p>

        <p><a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood"><b>FELD</b></a><br />
          Popular deck-building application for Windows. Lightspeed fast and packed with deep filtering and deck-building options!<br />
          This project use card images from FELD.</p>

        <p><a href="https://play.google.com/store/apps/details?id=name.vampidroid"><b>VampiDroid</b></a><br />
          Android client. Fast and clean, though limited in some features. Great when you play in the basement with no internet connection and want to just fast check a card on-the-fly.<br />
          Also available in F-Droid store.</p>

        <h5>LICENSE</h5>
        <p>Source code of the service is available under <a href="https://en.wikipedia.org/wiki/MIT_License">MIT license</a>.</p>
        <p>You can easily host mirror (or modified version) of the site. It is also very simple to launch local mirror serving the site only for your computer with minimal latency. Please check in <a href="https://github.com/smeea/vtes-db/blob/master/README.md">README</a>.</p>
        <p>Please note, that repository and this site contains images (cards, icons), which are copyrighted by Authors / Publishers under other licenses (i.e. not free/public).</p>
        <p>These images included into site/repository for the convenience of players and development. I assume it will not be used for anythig other than deck-building or development of deck-building software, and I hope there won't be any claims from the copyright owners.</p>

        <h5>FOR DEVELOPERS</h5>
        <p>Development happens in <a href="https://github.com/smeea/vtes-db">this Github repository</a><br />
          It is tested on Firefox (Windows/Linux/Android), but will probably work on other modern browsers/systems like Chrome/Safari/Edge as well.<br />
          You can submit bug reports in <a href="https://github.com/smeea/vtes-db/issues">Issues section</a>.</p>

        <h5>CONTACTS</h5>
        <p>
          <a href="http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78553-vtes-db-announcement">Discussion thread on vekn.net forum</a><br />
          <a href="mailto:smeea@riseup.net">My email</a><br />
        </p>

        <h5>DONATIONS</h5>
        <p>Bitcoin (BTC): 3ALLfiv3AWcm7WzgWm9gHmLAAUMRcegBtP</p>

      </div>

      <div className="col-md-12 col-lg-2 col-xl-2 right-col px-0 px-xl-2">
      </div>
    </div>

  )
}

export default About;
