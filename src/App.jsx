import React from 'react';
import { hot } from 'react-hot-loader';
import DeckBuilderWrapper from 'components/DeckBuilderWrapper';
import './index.css';
import './styles/game.scss';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('playerName'))
      this.setState({ playerName: localStorage.getItem('playerName') });
  }

  render() {
    return <DeckBuilderWrapper />;
  }
}

export default hot(module)(App);
