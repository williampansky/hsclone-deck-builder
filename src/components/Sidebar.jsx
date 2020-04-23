import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CARD_DATABASE from 'lib/utils/card-databse';
import CARDCLASS from 'enums/cardClass.enums';
import CardGrid from 'components/CardGrid';
import CardModal from 'components/CardModal';
import DeckCollection from 'components/DeckCollection';
import DeckSidebar from 'components/DeckSidebar';
import Deck from 'components/Deck';
import exists from 'utils/element.exists';
import PlayerEnergy from 'features/filters/EnergyFilters';
import replaceConstant from 'utils/replace-constants';
import replaceDynamicText from 'utils/replace-dynamic-text';

export default function Sidebar({ active, selectedCardClass }) {
  function calculateDeckLength(array) {
    let amount = 0;
    array.forEach(obj => {
      amount = Math.abs(amount + obj._amount);
    });
    return amount;
  }

  return (
    <Component active={active}>
      <Switch>
        <Route path={`/decks/:deckId`} component={DeckSidebar} />
        <Route path={`/`} component={DeckCollection} />
      </Switch>
      {/* <Deck
            data={selectedCards}
            length={calculateDeckLength(selectedCards)}
            onClick={event => removeSelectedCardsCallback(event)}
          /> */}
      {/* <img
        alt=""
        className="background"
        src="assets/images/ui/UI_Sidebar.png"
      /> */}
    </Component>
  );
}

Sidebar.propTypes = {
  active: PropTypes.bool,
  selectedCardClass: PropTypes.string
};

const Component = styled.aside`
  background: #1e1e1e;
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 3;
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 150ms var(--animation-transition-cubic);

  .background {
    height: 100%;
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
  }
`;
