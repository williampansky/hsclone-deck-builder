import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'features/sidebar/sidebar.slice';
import { useHistory, useParams } from 'react-router-dom';
import { removeDeck } from 'features/decks/decks.slice';

export default function BackButton() {
  let history = useHistory();
  return <Component onClick={() => history.goBack()}>Go Back</Component>;
}

const Component = styled.button`
  background: white;
  cursor: pointer;
  font-family: 'Carter One', sans-serif;
  border: 0;
  margin: 0 10px 0 0;
  padding: 0 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: black;

  @media (min-width: 1920px) {
    font-size: 0.825em;
  }

  &:hover {
    background: black;
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
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;
