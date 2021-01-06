import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';

function DeckDrawModal(props) {
  const [selectedCards, setSelectedCards] = useState({});
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    const cards = {};
    Object.keys(props.deck.crypt).map((key) => {
      cards[key] = {
        print: false,
        q: props.deck.crypt[key].q,
      };
    });
    Object.keys(props.deck.library).map((key) => {
      cards[key] = {
        print: false,
        q: props.deck.library[key].q,
      };
    });

    setSelectedCards(cards);
  }, [props.deck]);

  const handleToggleSelectButton = () => {
    const newState = selectedCards;
    if (toggleState) {
      Object.keys(newState).map((key) => {
        newState[key].print = false;
      });
    } else {
      Object.keys(newState).map((key) => {
        newState[key].print = true;
      });
    }
    setSelectedCards(newState);
    setToggleState(!toggleState);
  };

  const proxySelector = (e) => {
    const { id, name } = e.target;
    const newState = selectedCards;
    newState[id][name] = !newState[id][name];
    setSelectedCards((prevState) => ({
      ...prevState,
      [id]: newState[id],
    }));
  };

  const proxyCounter = (deckid, id, q) => {
    const newState = selectedCards;
    newState[id].q = q;
    setSelectedCards((prevState) => ({
      ...prevState,
      [id]: newState[id],
    }));
  };

  const handleGenerateButton = () => {
    const cards = {};
    Object.keys(selectedCards)
      .filter((key) => {
        return selectedCards[key].print;
      })
      .map((key) => {
        cards[key] = selectedCards[key].q;
      });
    props.proxyCards(cards);
    props.setShow(false);
    props.setShowButtons(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      animation={false}
      size="xl"
    >
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0 pt-2">
            <Col>
              <button
                type="button"
                className="close"
                onClick={() => props.setShow(false)}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
              <div className="d-flex justify-content-center">
                <h5>Create PDF with Card Proxies</h5>
              </div>
            </Col>
          </Row>
          <Row className="px-0">
            <Col md={12} lg={7} className="px-0 pl-lg-4 pr-lg-3">
              {props.deck.crypt && (
                <>
                  <DeckCrypt
                    cards={props.deck.crypt}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={false}
                    isMobile={props.isMobile}
                    isWide={props.isWide}
                    proxySelector={proxySelector}
                    proxyCounter={proxyCounter}
                    proxySelected={selectedCards}
                  />
                  {!props.isMobile && <br />}
                </>
              )}
            </Col>
            <Col md={12} lg={5} className="px-0 pl-lg-3 pr-lg-4">
              {props.deck.library && (
                <>
                  <DeckLibrary
                    cards={props.deck.library}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={false}
                    isMobile={props.isMobile}
                    isWide={props.isWide}
                    proxySelector={proxySelector}
                    proxyCounter={proxyCounter}
                    proxySelected={selectedCards}
                  />
                  {!props.isMobile && <br />}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleGenerateButton}>
          Generate
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => handleToggleSelectButton()}
        >
          Select/Deselect All
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeckDrawModal;
