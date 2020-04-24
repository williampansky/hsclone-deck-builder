import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DeckItem from 'components/DeckItem';
import styled from 'styled-components';
import placeholdersArray from 'placeholders-array';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import exists from 'utils/element.exists';

export default function Deck({
  board,
  cardBackSrc,
  data,
  length,
  playedCards,
  onClick
}) {
  let { deckId } = useParams();
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];
  const deckClass = deck && deck.class;

  function cardImage(id, set) {
    if (!exists(id)) return;
    if (placeholdersArray.includes(id))
      return `url(assets/images/sets/PLACEHOLDER.jpg)`;

    return `url(assets/images/sets/${set}/${id}-DECK.jpg)`;
  }

  function classBadge(string) {
    if (!exists(string)) return false;
    const str = string.replace(/(%)/g, '');
    return `assets/images/classes/${str}/BADGE.png`;
  }

  return (
    <Component>
      <Stats>
        {classBadge(deckClass) !== false ? (
          <div className="item">
            <img alt="" className="class__badge" src={classBadge(deckClass)} />
          </div>
        ) : null}
        <div className="item">
          <div className="text__label">Deck</div>
          <div className="text__value">{length}/30</div>
        </div>
      </Stats>

      {data.map((card, index) => {
        const { _amount, cost, elite, id, name, rarity, set } = card;
        return (
          <div
            className="deck__item"
            data-id={id}
            key={index}
            onClick={onClick}
          >
            <DeckItem
              amount={_amount}
              backgroundImage={cardImage(id, set)}
              cardId={id}
              cost={cost}
              elite={elite}
              name={name}
              rarity={rarity}
            />
          </div>
        );
      })}
    </Component>
  );
}

Deck.propTypes = {
  board: PropTypes.string,
  cardBackSrc: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  length: PropTypes.number,
  playedCards: PropTypes.array
};

Deck.defaultProps = {
  data: [],
  length: 0
};

const Component = styled.div`
  padding: 0 10px;
  /* height: 100%; */
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  position: relative;

  .deck__item {
    cursor: pointer;
  }

  & > div + div {
    margin-top: 2px;
  }

  & > div:last-child {
    margin-bottom: 20px;
  }
`;

const Stats = styled.div`
  color: white;
  padding: 10px 0 15px;
  user-select: none;
  cursor: default;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  .item {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    min-width: 75px;
  }

  .item__label {
    font-family: 'Verdana', monospace;
    font-size: 0.675em;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .text__value {
    font-size: 1.5em;
    margin: 4px 0 0;
  }

  .class__badge {
    width: 100px;
  }
`;
