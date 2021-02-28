import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import QuickSelect from './components/QuickSelect.jsx';
import ResultCryptLayoutText from './components/ResultCryptLayoutText.jsx';
import ResultLibraryLayoutText from './components/ResultLibraryLayoutText.jsx';
import CardCopyUrlButton from './components/CardCopyUrlButton.jsx';

function Cards(props) {
  const history = useHistory();
  const [card, setCard] = useState(undefined);

  const CardImage = () => {
    if (card) {
      const imgSrc = card > 200000 ?
            `${process.env.ROOT_URL}images/cards/${card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${card['Adv'] && 'adv'}.jpg`
            : `${process.env.ROOT_URL}images/cards/${card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`

      return(
        <img
          className='card-popover full-width'
          src={imgSrc}
          alt={card['Name']}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (props.id > 200000 && props.cryptCardBase) {
      setCard(props.cryptCardBase[props.id])
    } else if (props.id < 200000 && props.libraryCardBase) {
      setCard(props.libraryCardBase[props.id])
    }
  }, [props.id, props.cryptCardBase, props.libraryCardBase])

  return (
    <Container className="p-0">
      <>
        {props.isMobile ?
         <>
           {props.cryptCardBase && props.libraryCardBase &&
            <Row className="align-content-center justify-content-center px-2 py-2">
              <Col lg={8}>
                <QuickSelect
                  cryptCardBase={props.cryptCardBase}
                  libraryCardBase={props.libraryCardBase}
                  setCard={setCard}
                  history={history}
                />
              </Col>
            </Row>
           }
           {card &&
            <Row className="m-0 p-0">
              <Col className="m-0 p-0">
                <Tabs
                  transition={false}
                  activeKey={props.showImage ? 'image' : 'text'}
                  defaultActiveKey={props.showImage ? 'image' : 'text'}
                  onSelect={(k) => props.setShowImage(k == 'image' ? true : false)}
                >
                  <Tab eventKey="image" title="Image">
                    <CardImage />
                  </Tab>
                  <Tab eventKey="text" title="Text">
                    <div className="p-3">
                      {card && card.Id > 200000 && <ResultCryptLayoutText card={card}/>}
                      {card && card.Id < 200000 && <ResultLibraryLayoutText card={card}/>}
                    </div>
                    <div className="px-3 pb-3">
                      <CardCopyUrlButton id={card.Id} />
                    </div>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
           }
         </>
         :
         <>
           {props.cryptCardBase && props.libraryCardBase &&
            <Row className="align-content-center justify-content-center py-3">
              <Col lg={8}>
                <QuickSelect
                  cryptCardBase={props.cryptCardBase}
                  libraryCardBase={props.libraryCardBase}
                  setCard={setCard}
                  history={history}
                />
              </Col>
            </Row>
           }
           {card &&
            <Row className="align-content-center justify-content-center py-3">
              <Col lg={4}>
                <CardImage />
              </Col>
              <Col lg={4}>
                {card && card.Id > 200000 && <ResultCryptLayoutText card={card}/>}
                {card && card.Id < 200000 && <ResultLibraryLayoutText card={card}/>}
                <div className="pt-3">
                  <CardCopyUrlButton id={card.Id} />
                </div>
              </Col>
            </Row>
           }
         </>
        }
      </>
    </Container>
  );
}

export default Cards;
