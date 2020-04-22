import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function ClassFilters({
  active,
  availableCardClasses,
  onClick
}) {
  return availableCardClasses ? (
    <Component>
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
              {name}
            </button>
          );
        })
        .sort((a, b) => a._order - b._order)}
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
  button {
    cursor: pointer;
    font-family: 'Carter One', sans-serif;
    border: 0;
    margin: 0;
    padding: 0 10px;
    text-transform: uppercase;

    @media (min-width: 1800px) {
      font-size: 1em;
    }
  }

  button + button {
    margin-left: 10px;
  }

  button.active {
    background: #1cbae5;
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

  button,
  button.active {
    &:active,
    &:focus {
      outline: 0;
    }
  }
`;
