import React from "react";
import DecksSelectDeck from './components/DecksSelectDeck.jsx';
import DecksShowDeck from './components/DecksShowDeck.jsx';
import DecksNewDeck from './components/DecksNewDeck.jsx';
import DecksRemoveDeck from './components/DecksRemoveDeck.jsx';

class Decks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      activedeck: undefined,
    };

    this.handleActiveDeckSelect = event => {
      const { activedeck, value } = event.target;
      this.setState({activedeck: value});
    };

    this.updateDecks = () => {
      const url = 'http://127.0.0.1:5001/api/decks';
      const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          this.setState({decks: data});
        });
    };

    this.deckCardChange = (deckid, cardid, count) => {
      const state = this.state.decks;
      if (cardid > 200000) {
        state[deckid].crypt[cardid].q = count;
      } else {
        state[deckid].library[cardid].q = count;
      }
      this.setState({decks: state});

      const url = 'http://127.0.0.1:5001/api/decks/' + deckid;
      const options = {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({update: {[cardid]: count}})
      };

      fetch(url, options);
    }

    this.deckCardAdd = (deckid, card) => {
      const url = 'http://127.0.0.1:5001/api/decks/' + deckid;
      const options = {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({update: {[card]: 1}})
      };

      fetch(url, options)
      // Replace with state.decks update without backend
        .then(this.updateDecks());
    }
  }

  componentDidMount() {
    this.updateDecks();
  }

  render() {

    return (
      <div className="container main-container py-xl-3 px-0 px-xl-2">
        <div className="row mx-0">
          <div className="col-xs-12 col-xl-1 left-col px-0 px-xl-2">
          </div>
          <div className="col-xs-12 col-xl-7 center-col px-0 px-xl-2">
            <DecksNewDeck />
            <DecksSelectDeck handleActiveDeckSelect={this.handleActiveDeckSelect} decks={this.state.decks} value={this.state.activedeck} />
            <DecksRemoveDeck activeDeck={this.state.activedeck} />
            <DecksShowDeck deckCardAdd={this.deckCardAdd} deckCardChange={this.deckCardChange} deck={this.state.decks[this.state.activedeck]} />
          </div>
          <div className="col-xs-12 col-xl-4 right-col px-0 px-xl-2">
          </div>
        </div>
      </div>
    );
  }
}

export default Decks;
