import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DeckCollection() {
  const decks = useSelector(state => state.decks);
  const decksArray = Object.keys(decks).map(i => decks[i]);
  return (
    <Component>
      <h2 className="text__value">Your Decks</h2>
      {decksArray.map((deck, index) => {
        index = index + 1;
        const { name } = deck;
        return (
          <Link
            className="deck__slot"
            key={index}
            to={{ pathname: `/decks/${index}` }}
          >
            <span className="text__value index">{name ? name : index}</span>
            <span className="text__value plus">
              {name ? `Edit Deck` : `New Deck`}
            </span>
          </Link>
        );
      })}
    </Component>
  );
}

const Component = styled.div`
  padding: 10px 10px 60px;
  user-select: none;

  & > h2 {
    text-align: center;
  }

  .deck__slot {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    background: rgba(255, 255, 255, 0.015);
    border: 1px dashed rgba(255, 255, 255, 0.25);
    min-height: 60px;
    margin: 0;
    padding: 0;
    font-size: 0.875em;

    &:hover {
      border: 1px dashed rgba(255, 255, 255, 0.45);
    }

    &:active,
    &:focus {
      outline: 0;
      text-decoration: none;
    }

    & + .deck__slot {
      margin-top: 20px;
    }

    .plus {
      font-size: 1.15em;
      display: none;
      text-transform: uppercase;
    }

    /* prettier-ignore */
    &:hover {
      .plus { display: block; }
      .index { display: none; }
    }
  }
`;
