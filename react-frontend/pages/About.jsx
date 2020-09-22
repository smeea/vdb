import React from 'react';

function About(props) {
  return (
    <div className='container px-0 py-xl-3 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-2 col-xl-2 left-col px-0 px-xl-2'>
        </div>
        <div className='col-md-12 col-lg-8 col-xl-8 center-col px-1 px-xl-2'>
          <div className='about-version'>
            <h5>
              VERSION
            </h5>
            <p>
              Card text based on{' '}
              <a href='http://www.vekn.net/card-lists'>
                vekn.net official list
              </a>
              : 2020-06-23.
              <br />
              Card images by Syndelson{' '}
              <a href='http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood'>
                FELD images
              </a>
              : 2019-11-11 v2.72
            </p>
          </div>

          <h5>
            WHAT IS IT
          </h5>
          <p>
            VDB is card search and deck building tool for Vampire the Eternal Struggle (VTES).
          </p>
          <h5>RELATED PROJECTS</h5>
          <p>
            <a href='https://amaranth.vtes.co.nz/'>
              <b>
                Amaranth
              </b>
            </a>
            <br />
            Online card search and deck-building tool. We use many ideas from Amaranth.
          </p>
          <p>
            <a href='http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78088-feld-update-2-71-with-first-blood'>
              <b>
                FELD
              </b>
            </a>
            <br />
            Deck-building application for Windows.
            <br />
          </p>

          <p>
            <a href='https://play.google.com/store/apps/details?id=name.vampidroid'>
              <b>
                VampiDroid
              </b>
            </a>
            <br />
            Android card search application.
            <br />
          </p>

          <p>
            <a href='https://codex-of-the-damned.org/'>
              <b>
                Codex of the Damned
              </b>
            </a>
            <br />
            Strategy portal.
          </p>

          <p>
            <a href='#'>
              <b>
                Secret Library
              </b>
            </a>
            <br />
            Now resting in peace, but probably inspired most of existing projects including this one.
          </p>

          <p>
            <a href='http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs'>
              <b>
                There are more!
              </b>
            </a>
            <br />
            Check{' '}
            <a href='http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs'>
              vekn forum
            </a>
            {' '}for more tools!
            <br />
          </p>

          <h5>
            FOR DEVELOPERS
          </h5>
          <p>
            Development happens in{' '}
            <a href='https://github.com/smeea/vdb'>
              this Github repository.
            </a>
            <br />
            Source code of the site is available under{' '}
            <a href='https://en.wikipedia.org/wiki/MIT_License'>
              MIT license.
            </a>
            <br />
            Card images & icons are copyrighted by Authors / Publishers.
          </p>

          <h5>
            PRIVACY
          </h5>
          <p>
            We respect privacy and promise to not give access to your data (email, decks, etc) to anybody.
          </p>

          <h5>
            DONATIONS
          </h5>
          <p>
            Bitcoin (BTC): 3ALLfiv3AWcm7WzgWm9gHmLAAUMRcegBtP
          </p>

          <h5>
            CONTACTS
          </h5>
          <p>
            <a href='http://www.vekn.net/forum/v-tes-inventory-deckbuilding-programs/78553-vtes-db-announcement'>
              Discussion thread on vekn.net forum.
            </a>
            <br />
            Please send proposals, bug reports and other feedback via{' '}
            <a href='https://github.com/smeea/vdb'>
              Github
            </a>
            {' '}or{' '}
            <a href='mailto:smeea@riseup.net'>
              email.
            </a>
            <br />
          </p>

        </div>
        <div className='col-md-12 col-lg-2 col-xl-2 right-col px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default About;
