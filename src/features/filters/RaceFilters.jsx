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

export default function RaceFilters({ active, availableCardRaces, onClick }) {
  return availableCardRaces ? (
    <Component>
      <select onChange={e => onClick(e)}>
        {availableCardRaces
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
    </Component>
  ) : null;
}

RaceFilters.propTypes = {
  active: PropTypes.string,
  availableCardRaces: PropTypes.array,
  onClick: PropTypes.func
};

RaceFilters.defaultTypes = {
  availableCardRaces: [],
  onClick: () => {}
};

const Component = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 10px 0 0;
  height: 40px;

  select {
    width: 100%;
  }
`;
