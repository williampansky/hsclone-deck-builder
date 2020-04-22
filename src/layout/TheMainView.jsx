import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// route views
import DeckBuilder from 'components/DeckBuilder';
import TheCardCollectionView from 'layout/TheCardCollectionView';

export default function TheMainView() {
  const routes = useSelector(state => state.routes);

  return (
    <React.Fragment>
      <Helmet>
        <title>{routes.home.metaTitle}</title>
        <meta name="description" content={routes.home.metaDescription} />
      </Helmet>

      <Switch>
        {/* <Route path={`/deckbuilder`} component={DeckBuilder} /> */}
        <Route path={routes.home.path} component={TheCardCollectionView} />
      </Switch>
    </React.Fragment>
  );
}
