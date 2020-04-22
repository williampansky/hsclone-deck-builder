import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SizeMe } from 'react-sizeme';
import useElementSize from 'react-element-size';

const Buttons = ({ active, availableCardClasses, onClick }) => {
  return (
    <React.Fragment>
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
                {name}
              </button>
            );
          })
          .sort((a, b) => a._order - b._order)}
      </div>
    </React.Fragment>
  );
};

const Selects = ({ active, availableCardClasses, onClick }) => {
  return (
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
  );
};

export default function ClassFilters({
  active,
  availableCardClasses,
  onClick
}) {
  const box = useElementSize();

  return availableCardClasses ? (
    <Component ref={box.setRef}>
      {box.size.width >= 768 ? (
        <Buttons
          active={active}
          availableCardClasses={availableCardClasses}
          onClick={onClick}
        />
      ) : (
        <Selects
          active={active}
          availableCardClasses={availableCardClasses}
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
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  .flex {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  button {
    cursor: pointer;
    font-family: 'Carter One', sans-serif;
    border: 0;
    margin: 0;
    padding: 0 10px;
    text-transform: uppercase;

    @media (min-width: 1920px) {
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
