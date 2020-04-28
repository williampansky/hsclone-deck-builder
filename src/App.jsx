import React from 'react';
import { hot } from 'react-hot-loader';
import TheMainView from 'layout/TheMainView';
import './index.css';
import '../node_modules/magic.css/dist/magic.min.css';
import './styles/game.scss';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('playerName'))
      this.setState({ playerName: localStorage.getItem('playerName') });
  }

  render() {
    return <TheMainView />;
  }
}

export default hot(module)(App);
