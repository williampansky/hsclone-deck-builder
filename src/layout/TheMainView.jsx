import React from 'react';
import { Switch, Route } from 'react-router-dom';

// route views
import DeckBuilder from 'components/DeckBuilder';
import Homepage from 'components/Homepage';

export default function TheMainView() {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/deckbuilder`} component={DeckBuilder} />
        <Route path={`/`} component={Homepage} />
      </Switch>
    </React.Fragment>
  );
}
