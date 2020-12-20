import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AlertMessage from './components/AlertMessage.jsx';
import TwdResult from './components/TwdResult.jsx';
import TwdSearchForm from './components/TwdSearchForm.jsx';
// import EyeFill from '../assets/images/icons/eye-fill.svg';
// import EyeSlashFill from '../assets/images/icons/eye-slash-fill.svg';

function Twd(props) {
  // const query = new URLSearchParams(useLocation().search);
  // const [sharedDeckId, setSharedDeckId] = useState(query.get('id'))

  // const getDeck = (deckid) => {
  //   const url = `${process.env.API_URL}deck/${deckid}`;
  //   const options = {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //   };

  //   fetch(url, options)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error === undefined) {
  //         props.setSharedDeck(data);
  //       } else {
  //         console.log('error: ', data.error);
  //       }
  //     });
  // };

  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col
          md={12}
          xl={9}
          className={
            !(props.isMobile && props.showSearch)
              ? 'px-0 px-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {props.results != undefined && props.results != null && (
            <TwdResult
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              decks={props.results}
              /* showSort={true} */
              /* showTotal={true} */
              /* sortMethod={sortMethod} */
              /* setSortMethod={setSortMethod} */
              isMobile={props.isMobile}
              isWide={props.isWide}
              /* addMode={props.addMode} */
            />
          )}
          {props.results === null && (
            <AlertMessage className="error-message">
              <b>NO DECKS FOUND</b>
            </AlertMessage>
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !props.isMobile || (props.isMobile && props.showSearch)
              ? 'px-0'
              : 'col-hide px-0'
          }
        >
          {props.isMobile && props.results === null && (
            <AlertMessage className="error-message">
              <b>NO DECKS FOUND</b>
            </AlertMessage>
          )}
          <TwdSearchForm
            setResults={props.setResults}
            setShowSearch={props.setShowSearch}
            formState={props.formState}
            setFormState={props.setFormState}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Twd;
