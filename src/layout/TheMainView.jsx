import React from 'react';
import { Switch, Route } from 'react-router-dom';

// route views
import DeckBuilder from 'components/DeckBuilder';
import TheCardCollectionView from 'layout/TheCardCollectionView';

export default function TheMainView() {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/deckbuilder`} component={DeckBuilder} />
        <Route path={`/`} component={TheCardCollectionView} />
      </Switch>
    </React.Fragment>
  );
}
