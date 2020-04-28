import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useElementSize from 'react-element-size';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Buttons = ({
  active,
  availableCardClasses,
  selectedCardClass,
  onClick
}) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/decks/:deckId`}>
          <div className="flex">
            <button
              className={active === CARDCLASS[0] ? 'active' : ''}
              onClick={e => onClick(e)}
              value={CARDCLASS[0]}
            >
              <span>{replaceConstant(CARDCLASS[0])}</span>
            </button>
            <button
              className={active === selectedCardClass ? 'active' : ''}
              onClick={e => onClick(e)}
              value={selectedCardClass}
            >
              <span>{replaceConstant(selectedCardClass)}</span>
            </button>
          </div>
        </Route>
        <Route path={`/`}>
          <div className="flex">
            {availableCardClasses
              .map(obj => {
                const { name, value } = obj;
                return (
                  <button
                    className={active === value ? 'active' : ''}
                    key={name}
                    onClick={e => onClick(e)}
                    value={value}
                  >
                    <span>{name}</span>
                  </button>
                );
              })
              .sort((a, b) => a._order - b._order)}
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

const Selects = ({
  active,
  availableCardClasses,
  selectedCardClass,
  onClick
}) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/decks/:deckId`}>
          <select onChange={e => onClick(e)}>
            <option value={CARDCLASS[0]}>
              {replaceConstant(CARDCLASS[0])}
            </option>
            <option value={selectedCardClass}>
              {replaceConstant(selectedCardClass)}
            </option>
          </select>
        </Route>
        <Route path={`/`}>
          <select onChange={e => onClick(e)}>
            {availableCardClasses
              .map(obj => {
                const { name, value } = obj;
                return (
                  <option key={name} value={value}>
                    {name}
                  </option>
                );
              })
              .sort((a, b) => a._order - b._order)}
          </select>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default function ClassFilters({
  active,
  availableCardClasses,
  onClick
}) {
  let { deckId } = useParams();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];

  return availableCardClasses ? (
    <Component deckId={deckId}>
      {isBigScreen ? (
        <Buttons
          active={active}
          availableCardClasses={availableCardClasses}
          selectedCardClass={deck && deck.class}
          onClick={onClick}
        />
      ) : (
        <Selects
          active={active}
          availableCardClasses={availableCardClasses}
          selectedCardClass={deck && deck.class}
          onClick={onClick}
        />
      )}
    </Component>
  ) : null;
}

ClassFilters.propTypes = {
  active: PropTypes.string,
  availableCardClasses: PropTypes.array,
  onClick: PropTypes.func
};

ClassFilters.defaultTypes = {
  availableCardClasses: [],
  onClick: () => {}
};

const Component = styled.div`
  /* width: ${p => (p.deckId ? 'auto' : '100%')}; */
  /* height: 100%; */
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 10px 0 0;
  position: absolute;
  /* background: #444; */
  /* height: 40px; */
  top: -22px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* padding: 10px; */

  @media (min-width: 1920px) {
    top: -26px;
  }

  .flex {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  button {
    background: #444;
    cursor: pointer;
    font-family: 'Carter One', sans-serif;
    border: 0;
    margin: 0;
    padding: 0 10px;
    text-transform: uppercase;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    line-height: 2;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    transition: 200ms var(--animation-transition-cubic);
    color: white;
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black;

    @media (min-width: 1920px) {
      font-size: 0.825em;
    }
  }

  button span {
    position: relative;
    bottom: -0.5px;
    pointer-events: none;
  }

  button + button {
    margin-left: 8px;
  }

  button.active {
    background: #1cbae5;
  }

  button,
  button.active {
    &:active,
    &:focus {
      outline: 0;
    }
  }

  select {
    width: 100%;
  }
`;
