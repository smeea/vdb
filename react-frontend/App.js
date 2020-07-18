import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-select.min.css';
// import './assets/css/style.css';
import './assets/css/style.styl';
import Navigation from './pages/Navigation.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Deck from './pages/Deck.jsx';
import Crypt from './pages/Crypt.jsx';
import Library from './pages/Library.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
    };
  }

  render() {

    const updateUsername = (username) => {
      this.setState({username: username});
    };

    const whoAmI= () => {
      const url = 'http://127.0.0.1:5001/api/login';
      const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then(result => result.json())
        .then(username => {
          console.log('logged as: ', username.username);
          updateUsername(username.username);
        });

    };

    return (
      <div className="App">
        <Router>
          <Navigation username={this.state.username} />
          <Switch>
            <Route path="/" exact component={() => <About />} />
            <Route path="/account" exact component={() => <Account username={this.state.username} updateUsername={updateUsername} whoAmI={whoAmI} />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/deck" exact component={() => <Deck />} />
            <Route path="/crypt" exact component={() => <Crypt />} />
            <Route path="/library" exact component={() => <Library />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
