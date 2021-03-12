import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import At from '../../assets/images/icons/at.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import X from '../../assets/images/icons/x.svg';
import QuestionCircleFill from '../../assets/images/icons/question-circle-fill.svg';

function InventoryHelp(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)} block>
        <div className="d-flex justify-content-center align-items-center">
          <div className="pr-2">
            <QuestionCircleFill />
          </div>
          Tutorial
        </div>
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        size="lg"
      >
        <Modal.Body>
          <button
            type="button"
            className="close m-1"
            onClick={() => setShow(false)}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </button>
          <h5>Inventory Management</h5>
          <p>
            Inventory management in VDB let you browse your card collection with
            existing crypt/library search and track how collection is used in
            your existing decks.
          </p>
          <b>Add cards from you collection:</b>
          <ul>
            <li>
              One by one using 'Add Card' forms on top (last card you add
              stays on top so you can change quantity without scrolling down);
            </li>
            <li>
              Add full deck from your Deck collection (be careful you can add
              one deck multiple times doubling the quantity);
            </li>
          </ul>
          <b>Search cards from inventory:</b>
          <ul>
            <li>
              Go to Crypt or Library search page (the one you use to search
              all VTES cards)
            </li>
            <li>Activate Inventory Mode in the top-left corner;</li>
            <li>
              Now all searches you do will search in your inventory (and you
              can swap to-from all VTES cards any time to repeat search with
              new 'source');
            </li>
            <li>
              Two columns left to capacity show: total cards you have in
              inventory & used cards in your decks (read below about it);
            </li>
          </ul>
          <b>
            To track how cards are used in your decks, each deck has the one
            of the following status:
          </b>
          <ul>
            <li>
              <div className="d-inline px-2">
                <At />
              </div>
              Virtual (default). These decks are excluded from inventory
              management tracking, like you want for virtual Lackey decks or
              your in-progress projects.
            </li>
            <li>
              <div className="d-inline px-2">
                <Shuffle />
              </div>
              Flexible. These decks can share cards between them, like you
              want for your temporary test decks or if your card pool is not
              big (yet).
            </li>
            <li>
              <div className="d-inline px-2">
                <PinAngleFill />
              </div>
              Fixed. These decks each use unique cards like for your permanent
              decks you dont want to disassembly between game sessions.
            </li>
          </ul>
          <p>
            You can change status of the deck in Deck page by clicking Status
            button next to deck select form.
          </p>
          <p>
            Additionally you can set status per-card (i.e. if your deck is fixed
            except few Masters you swap between decks) clicking on the icon next
            to the card in the deck list. All other cards of the deck will
            continue to be of the deck status.
          </p>
          <b>Oversee!</b>
          <ul>
            <li>
              After you set status for your decks (and of course you can
              change it any time), additional ({`'used'`}) column in Search
              and Inventory pages will be filled with used card quantity in
              Fixed (total of all Fixed decks, as you dont reuse these cards)
              and maximum of Flexible in one deck (as you are ready to share
              them between decks).
            </li>
            <li>
              If you have less cards in inventory than you use (total fixed +
              maximum flexible), then card quantity highlighted in red
            </li>
            <li>You can hover mouse over card quantity for more details.</li>
            <li>
              Cards from the decks you {`'use'`} (Fixed or Flexible) are shown
              in Inventory even if you dont have them (with zero quantity), so
              you will see what you miss.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InventoryHelp;
