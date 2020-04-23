import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DeckItem from 'components/DeckItem';
import styled from 'styled-components';
import placeholdersArray from 'placeholders-array';

export default function Deck({
  board,
  cardBackSrc,
  data,
  length,
  playedCards,
  onClick
}) {
  function cardImage(id, set) {
    if (placeholdersArray.includes(id))
      return `url(assets/images/sets/PLACEHOLDER.jpg)`;

    return `url(assets/images/sets/${set}/${id}-DECK.jpg)`;
  }

  return (
    <Component>
      <Stats>
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
  padding: 10px 10px 60px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  z-index: 1;
  position: relative;

  .deck__item {
    cursor: pointer;
  }

  & > div + div {
    margin-top: 2px;
  }
`;

const Stats = styled.div`
  color: white;
  padding: 10px 0 15px;
  user-select: none;
  cursor: default;

  .item {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
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
`;
