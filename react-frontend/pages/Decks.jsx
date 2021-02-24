import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Shuffle from '../assets/images/icons/shuffle.svg'
import At from '../assets/images/icons/at.svg';
import PinAngleFill from '../assets/images/icons/pin-angle-fill.svg'
import InfoCircle from '../assets/images/icons/info-circle.svg';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import ArchiveFill from '../assets/images/icons/archive-fill.svg';
// import AlertMessage from './components/AlertMessage.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckSelectPrecon from './components/DeckSelectPrecon.jsx';
import DeckButtons from './components/DeckButtons.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import DeckChangeName from './components/DeckChangeName.jsx';
import DeckChangeAuthor from './components/DeckChangeAuthor.jsx';
import DeckChangeDescription from './components/DeckChangeDescription.jsx';

function Decks(props) {
  const query = new URLSearchParams(useLocation().search);
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [queryId, setQueryId] = useState(null);
  const { hash } = useLocation();
  const history = useHistory();
  const [selectFrom, setSelectFrom] = useState(props.username ? 'my' : 'precons');

  const getMissingCrypt = (deck) => {
    const crypt = {}

    Object.keys(deck.crypt).map(card => {
      let softUsedMax = 0;
      if (props.usedCards.softCrypt[card]) {
        Object.keys(props.usedCards.softCrypt[card]).map((id) => {
          if (softUsedMax < props.usedCards.softCrypt[card][id]) {
            softUsedMax = props.usedCards.softCrypt[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (props.usedCards.hardCrypt[card]) {
        Object.keys(props.usedCards.hardCrypt[card]).map((id) => {
          hardUsedTotal += props.usedCards.hardCrypt[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventory_type && deck.crypt[card].q > softUsedMax) miss += deck.crypt[card].q - softUsedMax;
      if (props.inventory.crypt[card]) miss -= props.inventory.crypt[card].q;

      if (miss > 0 ) {
        crypt[card] = {...deck.crypt[card]};
        crypt[card].q = miss > deck.crypt[card].q ? deck.crypt[card].q : miss;
      }
    });

    return(crypt);
  };

  const getMissingLibrary = (deck) => {
    const library = {}

    Object.keys(deck.library).map(card => {
      let softUsedMax = 0;
      if (props.usedCards.softLibrary[card]) {
        Object.keys(props.usedCards.softLibrary[card]).map((id) => {
          if (softUsedMax < props.usedCards.softLibrary[card][id]) {
            softUsedMax = props.usedCards.softLibrary[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (props.usedCards.hardLibrary[card]) {
        Object.keys(props.usedCards.hardLibrary[card]).map((id) => {
          hardUsedTotal += props.usedCards.hardLibrary[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventory_type && deck.library[card].q > softUsedMax) miss += deck.library[card].q - softUsedMax;
      if (props.inventory.library[card]) miss -= props.inventory.library[card].q;

      if (miss > 0 ) {
        library[card] = {...deck.library[card]};
        library[card].q = miss > deck.library[card].q ? deck.library[card].q : miss;
      }
    });

    return(library);
  };

  let missingCrypt;
  let missingLibrary;
  if (props.deckRouter(props.activeDeck)) {
    missingCrypt = getMissingCrypt(props.deckRouter(props.activeDeck));
    missingLibrary = getMissingLibrary(props.deckRouter(props.activeDeck));
  };

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          Object.keys(data).map((i) => {
            Object.keys(data[i].crypt).map((j) => {
              data[i].crypt[j].c = props.cryptCardBase[j];
            });
            Object.keys(data[i].library).map((j) => {
              data[i].library[j].c = props.libraryCardBase[j];
            });
          });
          props.setSharedDeck(data);
        }
      })
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => props.getDecks());
  };

  const toggleInventoryState = () => {
    const inventoryType = props.decks[props.activeDeck.deckid].inventory_type;
    if (!inventoryType) {
      deckUpdate(props.activeDeck.deckid, 'makeFlexible', 'all')
    } else if (inventoryType == "s") {
      deckUpdate(props.activeDeck.deckid, 'makeFixed', 'all')
    } else if (inventoryType == "h") {
      deckUpdate(props.activeDeck.deckid, 'makeClear', 'all')
    }
  }

  let isAuthor;
  if (props.deckRouter(props.activeDeck)) {
    isAuthor = (props.username == props.deckRouter(props.activeDeck).owner) && props.username;
  }

  useEffect(() => {
    if (hash && props.cryptCardBase && props.libraryCardBase) {
      const crypt = {};
      const library = {};

      hash
        .slice(1)
        .split(';')
        .map((i, index) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            crypt[j[0]] = {
              q: parseInt(j[1]),
              c: props.cryptCardBase[j[0]],
            }
          } else {
            library[j[0]] = {
              q: parseInt(j[1]),
              c: props.libraryCardBase[j[0]],
            }
          }
        });

      const deck = {
        deckid: 'deckInUrl',
        name: query.get('name') ? query.get('name') : '',
        author: query.get('author') ? query.get('author') : '',
        description: query.get('description') ? query.get('description') : '',
        crypt: crypt,
        library: library,
      }

      props.setSharedDeck({'deckInUrl': deck});
      props.setActiveDeck({src: 'shared', deckid: 'deckInUrl'});
    }
  }, [hash, props.cryptCardBase, props.libraryCardBase]);

  useEffect(() => {
    if (queryId && props.cryptCardBase && props.libraryCardBase) {
      if (queryId.length == 32) {
        props.setActiveDeck({src: 'shared', deckid: queryId})
      } else {
        props.setActiveDeck({src: 'twd', deckid: queryId})
      }
      getDeck(queryId);
    }
  }, [queryId, props.cryptCardBase, props.libraryCardBase]);

  useEffect(() => {
    if (props.activeDeck.src == 'twd' && !(props.sharedDeck && props.sharedDeck.Id == props.activeDeck.deckid)) {
      props.cryptCardBase && props.libraryCardBase && getDeck(props.activeDeck.deckid);
    }
  }, [props.activeDeck, props.cryptCardBase, props.libraryCardBase]);

  useEffect(() => {
    if (props.activeDeck && query.get('id')) {
      setQueryId(query.get('id'));
      history.push('/decks');
    }
  }, [props.activeDeck, query]);

  useEffect(() => {
    if (props.activeDeck.src == 'my' || props.activeDeck.src == 'precons') setSelectFrom(props.activeDeck.src)
  }, [props.activeDeck])

  return (
    <Container className={props.isMobile ? "deck-container" : "deck-container py-4"}>
      <Row className="mx-0">
        <Col lg={1}>
        </Col>
        <Col lg={9} className="px-0 px-lg-3">
          <Row className="pb-2 pb-lg-4">
            <Col lg={5} className="px-0 px-lg-3">
              <Row className="align-items-center justify-content-end mx-0">
                  <Col className="px-0">
                    <div className={props.inventoryMode ? "d-flex" : props.isMobile ? "d-flex justify-content-between" : "d-inline"}>
                      <div className={props.isMobile ? "w-75" : "w-100"}>
                        {selectFrom == 'my' ?
                         <DeckSelectMy
                           decks={props.decks}
                           activeDeck={props.activeDeck}
                           setActiveDeck={props.setActiveDeck}
                           inventoryMode={props.inventoryMode}
                         />
                         :
                         <DeckSelectPrecon
                           activeDeck={props.activeDeck}
                           setActiveDeck={props.setActiveDeck}
                         />
                        }
                      </div>
                      <div className="d-flex">
                        {props.inventoryMode && isAuthor && props.deckRouter(props.activeDeck) &&
                         <div className="d-flex pl-2">
                           <Button variant='outline-secondary' onClick={() => toggleInventoryState()}>
                             <div className="d-flex align-items-center">
                               {!props.deckRouter(props.activeDeck).inventory_type && <At/> }
                               {props.deckRouter(props.activeDeck).inventory_type == "s" && <Shuffle/> }
                               {props.deckRouter(props.activeDeck).inventory_type == "h" && <PinAngleFill/> }
                             </div>
                           </Button>
                         </div>
                        }
                        {props.isMobile && props.deckRouter(props.activeDeck) &&
                         <div className="d-flex pl-2">
                           <Button variant="outline-secondary" onClick={() => setShowInfo(!showInfo)}>
                             <InfoCircle />
                           </Button>
                         </div>
                        }
                      </div>
                    </div>
                    <Form className="py-1 my-0">
                      {props.username &&
                       <Form.Check
                         className="px-2"
                         checked={selectFrom == 'my'}
                         onChange={e => setSelectFrom(e.target.id)}
                         type="radio"
                         id="my"
                         label={<div className="blue"><b>My Decks</b></div>}
                         inline
                       />
                      }
                      <Form.Check
                        className="px-2"
                        checked={selectFrom == 'precons'}
                        onChange={e => setSelectFrom(e.target.id)}
                        type="radio"
                        id="precons"
                        label={<div className="blue"><b>Precon Decks</b></div>}
                        inline
                      />
                    </Form>
                  </Col>
              </Row>
            </Col>
            <Col lg={7} className="px-0 px-lg-3">
              {(showInfo || (!props.isMobile && props.deckRouter(props.activeDeck))) && (
                <>
                  <Row className={props.isMobile ? "mx-0" : "mx-0 pb-2"}>
                    <Col md={7} className={props.isMobile ? "px-0" : "pl-0 pr-1"}>
                      <DeckChangeName
                        name={props.deckRouter(props.activeDeck).name}
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                        isMobile={props.isMobile}
                      />
                    </Col>
                    <Col md={5} className={props.isMobile ? "px-0" : "pl-1 pr-0"}>
                      <DeckChangeAuthor
                        author={props.deckRouter(props.activeDeck).author}
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                        isMobile={props.isMobile}
                      />
                    </Col>
                  </Row>
                  <Row className="mx-0">
                    <Col className="px-0">
                      <DeckChangeDescription
                        description={props.deckRouter(props.activeDeck).description}
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                        isMobile={props.isMobile}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          {/* {queryId && */}
          {/*  <AlertMessage className="error-message p-2 mt-4"> */}
          {/*    <b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b> */}
          {/*  </AlertMessage> */}
          {/* } */}
          {props.deckRouter(props.activeDeck) && (
            <Row>
              <Col lg={7} className="px-0 px-lg-3">
                <DeckCrypt
                  changeTimer={props.changeTimer}
                  cardAdd={props.cardAdd}
                  cardChange={props.cardChange}
                  deckid={props.activeDeck.deckid}
                  cards={props.deckRouter(props.activeDeck).crypt}
                  showImage={props.showImage}
                  setShowImage={props.setShowImage}
                  isAuthor={isAuthor}
                  isMobile={props.isMobile}
                  isWide={props.isWide}
                  cardBase={props.cryptCardBase}
                  inventoryMode={props.inventoryMode}
                  inventoryCrypt={props.inventory.crypt}
                  decks={props.decks}
                  usedCards={{
                    soft: props.usedCards.softCrypt,
                    hard: props.usedCards.hardCrypt,
                  }}
                  deckUpdate={deckUpdate}
                />
              </Col>
              <Col lg={5} className="pt-4 pt-lg-0 px-0 px-lg-3">
                <DeckLibrary
                  cardAdd={props.cardAdd}
                  cardChange={props.cardChange}
                  deckid={props.activeDeck.deckid}
                  cards={props.deckRouter(props.activeDeck).library}
                  showImage={props.showImage}
                  setShowImage={props.setShowImage}
                  isAuthor={isAuthor}
                  isMobile={props.isMobile}
                  isWide={props.isWide}
                  cardBase={props.libraryCardBase}
                  inventoryMode={props.inventoryMode}
                  inventoryLibrary={props.inventory.library}
                  decks={props.decks}
                  usedCards={{
                    soft: props.usedCards.softLibrary,
                    hard: props.usedCards.hardLibrary,
                  }}
                  deckUpdate={deckUpdate}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!props.isMobile &&
         <Col lg={2} className="px-0 px-lg-3">
           <DeckButtons
             isMobile={props.isMobile}
             isAuthor={isAuthor}
             isWide={props.isWide}
             inventoryMode={props.inventoryMode}
             username={props.username}
             deck={props.deckRouter(props.activeDeck)}
             getDecks={props.getDecks}
             activeDeck={props.activeDeck}
             setActiveDeck={props.setActiveDeck}
             showImage={props.showImage}
             setShowImage={props.setShowImage}
             setShowInfo={setShowInfo}
             setShowButtons={setShowButtons}
             missingCrypt={missingCrypt}
             missingLibrary={missingLibrary}
           />
         </Col>
        }
      </Row>
      {props.isMobile && (
        <>
          <div
            onClick={() => setShowButtons(!showButtons)}
            className="float-right-bottom menu"
          >
            <div className="pt-2 float-menu">
              <List viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
      {showButtons && (
        <Modal
          show={showButtons}
          onHide={() => setShowButtons(false)}
          animation={false}
          centered={true}
        >
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <Row className="px-0 pb-2">
                <Col>
                  <button
                    type="button"
                    className="close m-1"
                    onClick={() => setShowButtons(false)}
                  >
                    <X width="32" height="32" viewBox="0 0 16 16" />
                  </button>
                </Col>
              </Row>
              <DeckButtons
                isMobile={props.isMobile}
                isAuthor={isAuthor}
                isWide={props.isWide}
                username={props.username}
                deck={props.deckRouter(props.activeDeck)}
                getDecks={props.getDecks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                setShowInfo={setShowInfo}
                setShowButtons={setShowButtons}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </Container>
          </Modal.Body>
        </Modal>
      )}
      {props.isMobile &&
       <>
         {props.inventoryMode ? (
           <div
             onClick={() => props.setInventoryMode(!props.inventoryMode)}
             className="float-left-bottom inventory-on"
           >
             <div className="pt-2 float-inventory">
               <ArchiveFill viewBox="0 0 16 16" />
             </div>
           </div>
         ) : (
           <div
             onClick={() => props.setInventoryMode(!props.inventoryMode)}
             className="float-left-bottom inventory-off"
           >
             <div className="pt-2 float-inventory">
               <ArchiveFill viewBox="0 0 16 16" />
             </div>
           </div>
         )}
       </>
      }
    </Container>
  );
}

export default Decks;
