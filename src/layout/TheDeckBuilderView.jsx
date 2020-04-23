import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

// route views
import DeckBuilder from 'components/DeckBuilderV2';
import ChooseClass from 'components/ChooseClass';
import { useSelector } from 'react-redux';

export default function TheDeckBuilderView() {
  const decks = useSelector(s => s.decks);
  let { deckId } = useParams();

  return (
    <React.Fragment>
      <Switch>
        <Route path={`/decks/:deckId`} component={DeckBuilder} />
      </Switch>
    </React.Fragment>
  );
}
